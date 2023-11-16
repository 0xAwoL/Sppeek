import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import 'animate.css';
import { Popup } from '../../../universalComponents/Popup';
import { Devider } from '../../../universalComponents/Devider'
import { AuthContext } from "../../../utils/AuthContext";
import { AnimatedBackground } from '../../../universalComponents/MovingBackground';
import styles from './login.module.scss'
import { LogoAuth } from "../../../universalComponents/Logo";

const Login: React.FC = () => {
    const [successPopupTrigger, setSuccessPopupTrigger] = useState<boolean>(false);
    const [errorPopupTrigger, setErrorPopupTrigger] = useState<boolean>(false);
    const [successVerifyPopupTrigger, setSuccesVerifyPopupTrigger] = useState<boolean>(false);
    const [errorVerifyPopupTrigger, setErrorVerifyPopupTrigger] = useState<boolean>(false);
    const [sameAccountPopupTrigger, setSameErrorAccountPopupTrigger] = useState<boolean>(false);
    const [verified] = useSearchParams()
    const { signin } = useContext(AuthContext)
    const verifiedUrl = verified.get("verified")
    const sameAccountUrl = verified.get("sameAccount")

    useEffect(() => {
        if (verifiedUrl !== null) {
            const token = String(verifiedUrl) == "true"
            token ? setSuccesVerifyPopupTrigger(true) : setErrorVerifyPopupTrigger(true)
        }

    }, [verifiedUrl])

    useEffect(() => {
        if (sameAccountUrl !== null) {
            const token = String(sameAccountUrl) == "true"
            token ? setSameErrorAccountPopupTrigger(true) : ""
        }
    }, [sameAccountUrl])


    // prevent keyboard scroll -> IOS
    // const inputIDs = ['registerUsernameInput', 'registerPasswordInput']

    return (
        <AnimatedBackground>
            <Popup trigger={successPopupTrigger} setTrigger={setSuccessPopupTrigger} type="LoginSuccess" />
            <Popup trigger={errorPopupTrigger} setTrigger={setErrorPopupTrigger} type="LoginError" />
            <Popup trigger={successVerifyPopupTrigger} setTrigger={setSuccesVerifyPopupTrigger} type="VerifySuccess" />
            <Popup trigger={errorVerifyPopupTrigger} setTrigger={setErrorVerifyPopupTrigger} type="VerifyError" />
            <Popup trigger={sameAccountPopupTrigger} setTrigger={setSameErrorAccountPopupTrigger} type="SameAccount" />
            <div className={styles.loginPage}>
                <LogoAuth />
                <div className={styles.mainDiv}>
                    <div className={styles.formDiv}>
                        <form className={styles.form} id="loginForm" onSubmit={(e) => { signin(e, setSuccessPopupTrigger, setErrorPopupTrigger) }}>
                                <h1 className={styles.mainText}>Sign in to <span className={styles.sppeek}>Sppeek</span></h1>
                                <Devider />
                                <input type="text" placeholder="username" id="registerUsernameInput" autoComplete='off' name="username" className={styles.usernameInput} required></input>
                                <Devider />
                                <input type="password" placeholder="password" id="registerPasswordInput" autoComplete='off' name="password" className={styles.usernameInput} required></input>
                                <Devider />
                                <input type='submit' value='Log in' className={styles.loginButton} />
                                <Devider />
                                <Link to="/register" className={styles.link}>-register</Link>
                                <Link to="/forgotpassword" className={styles.link}>-forgotpassword</Link>
                        </form>
                    </div>
                </div>
            </div>
        </AnimatedBackground>
    )
}
export { Login }