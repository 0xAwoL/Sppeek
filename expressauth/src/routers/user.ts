import {Router, Response, Request} from 'express';
import {validationResult, matchedData} from 'express-validator';
import {fileURLToPath} from 'url';
import path from 'path';
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import {asyncHandler} from '../middleware/asyncHandler.js';
import {loginValidator, newPasswordValidator, emailValidator, changepasswordPage, registerValidator} from '../middleware/validators.js';
import Pool from '../db/connect.js';
import {sendForgotEmail, sendRegisterEmail} from '../mail/mail.js';
import * as dotenv from "dotenv";
const DEBUG = process.env.DEBUG === 'true';

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const router = Router()
const client = await Pool.connect()


router.post('/login', loginValidator, asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req)
    const dateTime = new Date().toLocaleString();

    // check if data provided by user is valid 
    if (!errors.isEmpty()) {
        const errorMessage = `Failed login of user - ${req.body.username}`
        console.log(errorMessage, errors.array(), dateTime)
        return res.status(400).send()
    }

    const {username, password} = matchedData(req)
    try {

        const selectText = "SELECT hash, verified from users WHERE username=$1"
        const selectValues = [username]
        const user = await client.query(selectText, selectValues)

        const hash = user.rows[0].hash
        const verified = user.rows[0].verified

        // check if hash corresponds to password
        if (!(await bcrypt.compare(password, hash))) {
            throw new Error('wrong password')
        }

        // check if user verified email address
        if (!verified) {
            throw new Error('verify user')
        }

        // sign new jwt token with secret
        const token: string = jwt.sign(
            {username: username},
            process.env.SECRET!,
            {
                expiresIn: "2h",
            }
        )

        // update session
        const updateText = "UPDATE users SET session=$1 WHERE username=$2"
        const updateValues = [token, username]
        await client.query(updateText, updateValues)

        // return jwt to client
        res.send(token)
        console.log(`username ${username} logged in ${dateTime} `)
    } catch (e) {
        console.log(`username ${username}, error -> (${e.message}) ${dateTime} `)
        res.status(400).send(e.message)
    }
}))

router.post('/register', registerValidator, asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req)
    const dateTime = new Date().toLocaleString();

    // check if data provided by user is valid 

    const {email, username, password, passwordRepeat} = matchedData(req)
    try {
        if (!errors.isEmpty()) {
            throw new Error(errors.array()[0]["msg"])
        }
        // validate user input

        if (passwordRepeat !== password) {
            throw new Error("Password don't match")
        }

        const createDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/')

        // create hash from passord
        const hash = bcrypt.hashSync(password, 10)

        // generating verifyTokens and resetTokens
        const verifyToken = crypto.randomBytes(20).toString('hex');
        const resetToken = crypto.randomBytes(20).toString('hex')
        const verified = false
        const link = DEBUG ? `http://localhost:3000/verify/${verifyToken}` : `https://www.sppeek.online:3000/verify/${verifyToken}`

        // creating new user
        const text = "INSERT INTO users( username, hash, verifyHash, resetToken, verified, email, created_on) VALUES($1, $2, $3, $4, $5, $6, $7)"
        const values = [username, hash, verifyToken, resetToken, verified, email, createDate]
        await client.query(text, values)

        // sending verification email
        sendRegisterEmail(email, link, username)

        res.send("created new user!")
        console.log(`Create new user ${username} ${dateTime}`)
    } catch (e) {
        let msg;
        if (e.message.includes('duplicate key')) {
            msg = 'email or username in use'
        }
        console.log(`username ${username}, register error -> (${msg}) ${dateTime} `)
        res.status(400).send(msg)
    }
}))

router.get('/verify/:verifyHash', async (req: Request, res: Response) => {
    const url = DEBUG ? 'http://localhost:8080/?verified=' : 'https://www.sppeek.online/?verified='
    try {
        const verifyHash = req.params.verifyHash
        const text = 'UPDATE users SET verified = $1, verifyHash = $2 WHERE verifyHash=$3'

        // clear verifyHash
        const values = [true, " ", verifyHash]
        await client.query(text, values)

        // redirect, show verified popup.
        res.status(301).redirect(`${url}true`)
    } catch (e) {
        res.status(301).redirect(`${url}false`)
        console.log(e)
    }
})

router.post('/forgotpassword', emailValidator, async (req: Request, res: Response) => {
    // matched data here 
    const errors = validationResult(req)

    // check if data provided by user is valid 
    if (!errors.isEmpty()) {
        console.log(errors.array())
        return res.status(400).send(errors)
    }

    const {email} = matchedData(req)
    try {
        const selectText = "SELECT resettoken, username from users WHERE email=$1"
        const selectValues = [email]
        const user = await client.query(selectText, selectValues)
        const resetToken = user.rows[0].resettoken
        const username = user.rows[0].username

        // link to server-side rendering API changepassword page.
        const link = DEBUG ? `http://localhost:3000/changepassword/${resetToken}` : `https://sppeek.online:3000/changepassword/${resetToken}`
        sendForgotEmail(email, link, username)
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
})

router.get('/changepassword/:resetToken', changepasswordPage, async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            console.log(errors.array())
            return res.status(400).send(errors.array())
        }

        const {resetToken} = matchedData(req)
        console.log(resetToken)

        const selectText = "SELECT count(1) > 0 FROM users WHERE resettoken=$1"
        const selectValues = [resetToken]
        const q = await client.query(selectText, selectValues)

        res.sendFile(path.join(__dirname, '..', 'page', 'form', 'index.html'))
    } catch (e) {
        const redirectURL = DEBUG ? 'http://localhost:8080' : 'https://www.sppeek.online'
        res.status(301).redirect(redirectURL)
        console.log(e)
    }

})

router.post('/changepassword/:resetToken', newPasswordValidator, async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        console.log(errors.array())
        return res.status(400).send(errors.array()[0]["msg"])
    }

    const {password, resetToken} = matchedData(req)
    const hash = bcrypt.hashSync(password, 10)
    try {
        const selectText = "UPDATE users SET hash=$1 WHERE resettoken=$2;"
        const selectValues = [hash, resetToken]
        const user = await client.query(selectText, selectValues)

        if (user.rowCount == 0) {
            throw new Error('wrong resetToken')
        }

        res.send('changed password for user')
    } catch (e) {
        console.log(e)
        res.status(400)
    }
})

router.get('/health', (req: Request, res: Response) => {
    res.sendStatus(200)
})

export default router
