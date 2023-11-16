import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import jwt from 'jsonwebtoken'
import * as dotenv from "dotenv";
import { msg } from './interfaces/interfaces.js';

dotenv.config();

// initialize server with port and originURL
const port = 1337
const originUrl = process.env.DEBUG ? ['http://localhost:5173','http://localhost:8080'] : ['https://www.sppeek.online', 'https://sppeek.online'];
const httpServer = createServer()
const io = new Server(httpServer, {
    connectionStateRecovery: {
        maxDisconnectionDuration: 2 * 60 * 1000,
        skipMiddlewares: true,
    },
    cors: {
        origin: originUrl,
        methods: ["GET", "POST"],
        credentials: true
    }
});

// logging online Users -> socket.id
const socketsOnline = new Map<string, Socket["id"]>();
// logging messages
const allMessages: msg[] = [];

// verify JWT middleware
io.use((socket, next) => {
    try {
        const secret: jwt.Secret = process.env.SECRET!
        const token: string = socket.handshake.auth.token;
        const validToken = jwt.verify(token, secret) as jwt.JwtPayload
        const username: string = validToken.username

        if (socketsOnline.has(username)) {
            console.log("User is already logged in! ")
            throw new Error("duplicate user");
        }

        socketsOnline.set(username, socket.id)
        next()
    } catch (e) {
        next(e)
        console.log(e)
    }
});

io.on('connection', (socket) => {
    try {
        const secret: jwt.Secret = process.env.SECRET!
        const token: string = socket.handshake.auth.token;
        const validToken = jwt.verify(token, secret) as jwt.JwtPayload
        const username: string = validToken.username
        const onlineUsers = [...socketsOnline.keys()]

        // listen for different sockets
        socket.on('users', () => {
            io.emit('users', onlineUsers)
        })

        socket.on('allMessages', () => {
            io.emit('allMessages', allMessages)
        })

        socket.on('msg', (msg) => {
            // validate msg
            const dateTime = new Date().toLocaleString();
            const message: msg = {
                msg: msg.message,
                username: username,
                time: dateTime
            }
            console.log(message)
            io.emit('msg', message)
            allMessages.push(message)
        });

        socket.on("disconnect", () => {
            socketsOnline.delete(username)
            const onlineUsers = [...socketsOnline.keys()]
            console.log(onlineUsers)
            io.emit('users', onlineUsers)

        });
    } catch (e) {
        console.log(e)
        socket.emit('connection_error', () => {})
    }
})

httpServer.listen(port)
console.log(`listening on ${port}`)
