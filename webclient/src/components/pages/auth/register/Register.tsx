import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom";
import { Devider } from "../../../universalComponents/Devider";
import { Popup } from "../../../universalComponents/Popup";
import { AnimatedBackground } from "../../../universalComponents/MovingBackground";
import { animateCSS } from "../../../utils/animate";
import styles from './register.module.scss'
import { LogoAuth } from "../../../universalComponents/Logo";
const PROD = import.meta.env.PROD;

const Register = () => {
    const [successPopupTrigger, setSuccessPopupTrigger] = useState<boolean>(false)
    const [errorPopupTrigger, setErrorPopupTrigger] = useState<boolean>(false);
    const [invalidEmailPopupTrigger, setInvalidEmailPopupTrigger] = useState<boolean>(false)
    const [passwordRequirementsPopupTrigger, setPasswordRequirementsPopupTrigger] = useState<boolean>(false)
    const [infoInUsePopupTrigger, setInfoInUsePopupTrigger] = useState<boolean>(false)

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const expressServerURL = PROD ? "https://www.sppeek.online:3000/register" : "http://localhost:3000/register/"

        const formData = e.target as typeof e.target & {
            username: { value: string };
            password: { value: string };
            passwordRepeat: { value: string };
            email: { value: string }
        };

        const userValue = formData.username.value
        const passValue = formData.password.value
        const passRepeatValue = formData.passwordRepeat.value
        const emailValue = formData.email.value

        axios.post(expressServerURL, {
            username: userValue,
            password: passValue,
            passwordRepeat: passRepeatValue,
            email: emailValue
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(() => {
            setSuccessPopupTrigger(true)
            const form = document.getElementById('registerForm') as HTMLFormElement
            form.reset()
        }).catch((e) => {
            const shake = () => {
                animateCSS('#registerUsernameInput', 'shakeX');
                animateCSS('#registerEmailInput', 'shakeX');
                animateCSS('#registerPasswordInput', 'shakeX');
                animateCSS('#registerPasswordRepeatInput', 'shakeX');
            }
            if (e.response.data == "email or username in use") {
                setErrorPopupTrigger(false)
                setInfoInUsePopupTrigger(true)
                setInvalidEmailPopupTrigger(false)
                setPasswordRequirementsPopupTrigger(false)
                shake()
            } else if (e.response.data == "Invalid email") {
                setErrorPopupTrigger(false)
                setInfoInUsePopupTrigger(false)
                setInvalidEmailPopupTrigger(true)
                setPasswordRequirementsPopupTrigger(false)
                shake()
            } else if (e.response.data == "The minimum password length is 6 characters") {
                setErrorPopupTrigger(false)
                setInfoInUsePopupTrigger(false)
                setInvalidEmailPopupTrigger(false)
                setPasswordRequirementsPopupTrigger(true)
                shake()
            } else {
                setErrorPopupTrigger(true)
                setInfoInUsePopupTrigger(false)
                setInvalidEmailPopupTrigger(false)
                setPasswordRequirementsPopupTrigger(false)
                shake()
            }
        })
    }
    // prevent keyboard scroll -> IOS
    // const inputIDs = ['registerUsernameInput', 'registerEmailInput', 'registerPasswordInput', 'registerPasswordRepeatInput']

    return (
        <AnimatedBackground>
            <Popup trigger={successPopupTrigger} setTrigger={setSuccessPopupTrigger} type="CreateAccountSuccess" />
            <Popup trigger={errorPopupTrigger} setTrigger={setErrorPopupTrigger} type="CreateAccountError" />
            <Popup trigger={invalidEmailPopupTrigger} setTrigger={setInvalidEmailPopupTrigger} type="InvalidEmail" />
            <Popup trigger={passwordRequirementsPopupTrigger} setTrigger={setPasswordRequirementsPopupTrigger} type="PasswordsLength" />
            <Popup trigger={infoInUsePopupTrigger} setTrigger={setInfoInUsePopupTrigger} type="InfoInUse" />
            <div className={styles.loginPage}>
                <LogoAuth />
                <div className={styles.mainDiv}>
                    <div className={styles.formDiv}>
                        <form onSubmit={handleSubmit} className={styles.form} id="registerForm">
                            <h1 className={styles.mainText}>Sign up for <span className={styles.sppeek}>Sppeek</span></h1>
                            <Devider />
                            <input type="text" placeholder="username" id="registerUsernameInput" autoComplete='off' name="username" className={styles.usernameInput} required ></input>
                            <Devider />
                            <input type="email" placeholder="email" id="registerEmailInput" autoComplete='off' name="email" className={styles.usernameInput} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"></input>
                            <Devider />
                            <input type="text" placeholder="password min. 6 characters" id="registerPasswordInput" autoComplete='off' name="password" className={styles.usernameInput} required></input>
                            <Devider />
                            <input type="text" placeholder="repeat password" id="registerPasswordRepeatInput" autoComplete='off' name="passwordRepeat" className={styles.usernameInput} required></input>
                            <Devider />
                            <input type='submit' value='Sign Up' className={styles.loginButton} />
                            <Devider />
                            <Link to="/" className={styles.goback}>-goback</Link>
                        </form>
                    </div>
                </div>
            </div>
        </AnimatedBackground>
    )
}
export { Register } 