import styles from './forgotpassword.module.scss'
import axios from 'axios';
import { Link } from "react-router-dom"
import { AnimatedBackground } from '../../../universalComponents/MovingBackground';
import { LogoAuth } from '../../../universalComponents/Logo';
import { Devider } from '../../../universalComponents/Devider';
import { useState } from 'react';
import { Popup } from '../../../universalComponents/Popup';
const PROD = import.meta.env.PROD;

const ForgotPassowrd: React.FC = () => {
    const [successPopupTrigger, setSuccessPopupTrigger] = useState<boolean>(false)
    const [errorPopupTrigger, setErrorPopupTrigger] = useState<boolean>(false);

    const handleForm = (e: React.FormEvent) => {
        e.preventDefault()
        const url = PROD ? "https://www.sppeek.online:3000/forgotpassword" : "http://localhost:3000/forgotpassword"

        const data = e.target as typeof e.target & {
            email: { value: string };
        };

        const email = data.email.value

        axios.post(url, {
            email: email
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(() => {
            setErrorPopupTrigger(false)
            setSuccessPopupTrigger(true)
            const form = document.getElementById('forgotpasswordForm') as HTMLFormElement
            form.reset()

        }).catch(() => {
            console.log('error')
            setSuccessPopupTrigger(false)
            setErrorPopupTrigger(true)
        })
    }

    return (
        <AnimatedBackground>
            <Popup trigger={successPopupTrigger} setTrigger={setSuccessPopupTrigger} type="ChangePasswordEmail" />
            <Popup trigger={errorPopupTrigger} setTrigger={setErrorPopupTrigger} type="InvalidEmail" />
            <div className={styles.loginPage}>
                <LogoAuth />
                <div className={styles.mainDiv}>
                    <div className={styles.formDiv}>
                        <form className={styles.form} onSubmit={handleForm} id="forgotpasswordForm">
                            <h1 className={styles.mainText}>Enter your email to reset password</h1>
                            <Devider />
                            <input type="email" placeholder="Email" name="email" id="forgotPasswordEmail" className={styles.emailInput} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"></input>
                            <Devider />
                            <input type='submit' value='Reset password' className={styles.loginButton} />
                            <Devider />
                            <Link to="/" className={styles.link}>-goback</Link>
                        </form>
                    </div>
                </div>
            </div>
        </AnimatedBackground>
    )
}
export { ForgotPassowrd }