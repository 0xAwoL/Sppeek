import styles from './universalStyles.module.scss';
import { animateCSS } from '../utils/animate';
import successSvg from '../../../assets/success.svg'
import errorSvg from '../../../assets/error.svg'

interface PopupProps {
    setTrigger: (props: boolean) => void;
    trigger: boolean;
    type: "CreateAccountSuccess" | "CreateAccountError" | "LoginSuccess" | "LoginError" | "ChangePasswordSuccess" | "ChangePasswordError" | "VerifySuccess" | "VerifyError" | "SameAccount"| "InvalidEmail" | "ChangePasswordEmail" | "InfoInUse" | "PasswordsLength" | "PasswordsDoNotMatch" | "ResetPasswordError";
}

const Popup: React.FC<PopupProps> = ({ trigger, setTrigger, type }) => {
    const cleanPopup = (name: string) => {
        setTimeout(() => {
            animateCSS(`#${name}`, 'fadeOutUp')
            setTimeout(() => {
                setTrigger(false)
            }, 1000)
        }, 5000)
    }
    const CreateAccountError = () => {
        cleanPopup('createAccountError')
        return (
            <div id="createAccountError" className={`${styles.errorAlert} + animate__animated + animate__fadeInLeft`}>
                <span><img className={styles.successSvg} src={errorSvg}></img></span>
                <div className={styles.text}>
                    <h1>Error occured</h1>
                    <p>Sorry we couldn't create account</p>
                </div>
                <button onClick={() => (setTimeout(() => setTrigger(false), 750), animateCSS('#createAccountError', 'fadeOutUp'))} className={styles.exitButton}>X</button>
            </div>
        )
    }
    const CreateAccountSuccess = () => {
        cleanPopup('createAccountSuccess')
        return (
            <div id="createAccountSuccess" className={`${styles.successAlert} + animate__animated + animate__fadeInLeft`}>
                <span><img className={styles.successSvg} src={successSvg}></img></span>
                <div className={styles.text}>
                    <h1>Success!</h1>
                    <p>We've created your account for you.</p>
                </div>
                <button onClick={() => (setTimeout(() => setTrigger(false), 750), animateCSS('#createAccountSuccess', 'fadeOutUp'))} className={styles.exitButton}>X</button>
            </div>
        )
    }
    const LoginSuccess = () => {
        cleanPopup('loginSuccess')
        return (
            <div id="loginSuccess" className={`${styles.successAlert} + animate__animated + animate__fadeInLeft`}>
                <span><img className={styles.successSvg} src={successSvg}></img></span>
                <div className={styles.text}>
                    <h1>Success!</h1>
                    <p>Welcome to sppek chat app </p>
                </div>
                <button onClick={() => (setTimeout(() => setTrigger(false), 750), animateCSS('#loginSuccess', 'fadeOutUp'))} className={styles.exitButton}>X</button>
            </div>
        )
    }
    const LoginError = () => {
        cleanPopup('loginError')
        return (
            <div id="loginError" className={`${styles.errorAlert} + animate__animated + animate__fadeInLeft`}>
                <span><img className={styles.successSvg} src={errorSvg}></img></span>
                <div className={styles.text}>
                    <h1>Error occured</h1>
                    <p>Sorry we couldn't login in</p>
                </div>
                <button onClick={() => (setTimeout(() => setTrigger(false), 750), animateCSS('#loginError', 'fadeOutUp'))} className={styles.exitButton}>X</button>
            </div>
        )
    }
    const ChangePasswordSuccess = () => {
        cleanPopup('changepassworderror')
        return (
            <div id="changepasswordsuccess" className={`${styles.successAlert} + animate__animated + animate__fadeInLeft`}>
                <span><img className={styles.successSvg} src={successSvg}></img></span>
                <div className={styles.text}>
                    <h1>Success!</h1>
                    <p>Successfully changed password</p>
                </div>
                <button onClick={() => (setTimeout(() => setTrigger(false), 750), animateCSS('#changepasswordsuccess', 'fadeOutUp'))} className={styles.exitButton}>X</button>
            </div>
        )
    }
    const ChangePasswordError = () => {
        cleanPopup('changepasswordsuccess')
        return (
            <div id="changepassworderror" className={`${styles.errorAlert} + animate__animated + animate__fadeInLeft`}>
                <span><img className={styles.successSvg} src={errorSvg}></img></span>
                <div className={styles.text}>
                    <h1>Error occured</h1>
                    <p>Sorry we couldn't change password </p>
                </div>
                <button onClick={() => (setTimeout(() => setTrigger(false), 750), animateCSS('#changepassworderror', 'fadeOutUp'))} className={styles.exitButton}>X</button>
            </div>
        )
    }
    const VerifySuccess = () => {
        cleanPopup('verifysuccess')
        return (
            <div id="verifysuccess" className={`${styles.successAlert} + animate__animated + animate__fadeInLeft`}>
                <span><img className={styles.successSvg} src={successSvg}></img></span>
                <div className={styles.text}>
                    <h1>Success!</h1>
                    <p>User verified</p>
                </div>
                <button onClick={() => (setTimeout(() => setTrigger(false), 750), animateCSS('#verifysuccess', 'fadeOutUp'))} className={styles.exitButton}>X</button>
            </div>
        )
    }
    const VerifyError = () => {
        cleanPopup('verifyerror')
        return (
            <div id="verifyerror" className={`${styles.errorAlert} + animate__animated + animate__fadeInLeft`}>
                <span><img className={styles.successSvg} src={errorSvg}></img></span>
                <div className={styles.text}>
                    <h1>Error occured</h1>
                    <p>Sorry we couldn't verify user, check your email address.</p>
                </div>
                <button onClick={() => (setTimeout(() => setTrigger(false), 2000), animateCSS('#verifyerror', 'fadeOutUp'))} className={styles.exitButton}>X</button>
            </div>
        )
    }
    const SameAccount = () => {
        cleanPopup('sameaccount')
        return (
            <div id="sameaccount" className={`${styles.errorAlert} + animate__animated + animate__fadeInLeft`}>
                <span><img className={styles.successSvg} src={errorSvg}></img></span>
                <div className={styles.text}>
                    <h1>Error occured</h1>
                    <p>Sorry, someone is already logged in with this account!</p>
                </div>
                <button onClick={() => (setTimeout(() => setTrigger(false), 750), animateCSS('#sameaccount', 'fadeOutUp'))} className={styles.exitButton}>X</button>
            </div>
        )
    }

    const PasswordLength = () => {
        cleanPopup('passwordreqirements')
        return (
            <div id="passwordrequirements" className={`${styles.errorAlert} + animate__animated + animate__fadeInLeft`}>
                <span><img className={styles.successSvg} src={errorSvg}></img></span>
                <div className={styles.text}>
                    <h1>Error occured</h1>
                    <p>Password has to be min. 6 characters long!</p>
                </div>
                <button onClick={() => (setTimeout(() => setTrigger(false), 750), animateCSS('#sameaccount', 'fadeOutUp'))} className={styles.exitButton}>X</button>
            </div>
        )
    }
    const PasswordsDoNotMatch = () => {
        cleanPopup('passwordsdonotmatch')
        return (
            <div id="passwordsdonotmatch" className={`${styles.errorAlert} + animate__animated + animate__fadeInLeft`}>
                <span><img className={styles.successSvg} src={errorSvg}></img></span>
                <div className={styles.text}>
                    <h1>Error occured</h1>
                    <p>Passwords do not match </p>
                </div>
                <button onClick={() => (setTimeout(() => setTrigger(false), 750), animateCSS('#sameaccount', 'fadeOutUp'))} className={styles.exitButton}>X</button>
            </div>
        )
    }
    const ResetPasswordError = () => {
        cleanPopup('passwordsdonotmatch')
        return (
            <div id="passwordsdonotmatch" className={`${styles.errorAlert} + animate__animated + animate__fadeInLeft`}>
                <span><img className={styles.successSvg} src={errorSvg}></img></span>
                <div className={styles.text}>
                    <h1>Error occured</h1>
                    <p>We couldn't change your password</p>
                </div>
                <button onClick={() => (setTimeout(() => setTrigger(false), 750), animateCSS('#sameaccount', 'fadeOutUp'))} className={styles.exitButton}>X</button>
            </div>
        )
    }
     const InfoInUse = () => {
        cleanPopup('infoinuse')
        return (
            <div id="infoinuse" className={`${styles.errorAlert} + animate__animated + animate__fadeInLeft`}>
                <span><img className={styles.successSvg} src={errorSvg}></img></span>
                <div className={styles.text}>
                    <h1>Error occured</h1>
                    <p>Provided email address or username is in use.</p>
                </div>
                <button onClick={() => (setTimeout(() => setTrigger(false), 750), animateCSS('#sameaccount', 'fadeOutUp'))} className={styles.exitButton}>X</button>
            </div>
        )
    }
    const InvalidEmail = () => {
        cleanPopup('invalidemail')
        return (
            <div id="invalidemail" className={`${styles.errorAlert} + animate__animated + animate__fadeInLeft`}>
                <span><img className={styles.successSvg} src={errorSvg}></img></span>
                <div className={styles.text}>
                    <h1>Error occured</h1>
                    <p>Invalid email address!</p>
                </div>
                <button onClick={() => (setTimeout(() => setTrigger(false), 750), animateCSS('#sameaccount', 'fadeOutUp'))} className={styles.exitButton}>X</button>
            </div>
        )
    }
    const ChangePasswordEmail = () => {
        cleanPopup('changepasswordemail')
        return (
            <div id="changepasswordemail" className={`${styles.successAlert} + animate__animated + animate__fadeInLeft`}>
                <span><img className={styles.successSvg} src={successSvg}></img></span>
                <div className={styles.text}>
                    <h1>Success</h1>
                    <p>Check your email inbox!</p>
                </div>
                <button onClick={() => (setTimeout(() => setTrigger(false), 750), animateCSS('#sameaccount', 'fadeOutUp'))} className={styles.exitButton}>X</button>
            </div>
        )
    }

    const popups = {
        "ResetPasswordError" : <ResetPasswordError/>,
        "ChangePasswordEmail": <ChangePasswordEmail/>,
        "PasswordsLength": <PasswordLength/>,
        "PasswordsDoNotMatch": <PasswordsDoNotMatch/>,
        "InfoInUse": <InfoInUse/>,
        "InvalidEmail": <InvalidEmail/>,
        "SameAccount": <SameAccount />,
        "CreateAccountSuccess": <CreateAccountSuccess />,
        "CreateAccountError": <CreateAccountError />,
        "LoginSuccess": <LoginSuccess />,
        "LoginError": <LoginError />,
        "ChangePasswordSuccess": <ChangePasswordSuccess />,
        "ChangePasswordError": <ChangePasswordError />,
        "VerifySuccess": <VerifySuccess />,
        "VerifyError": <VerifyError />
    }
    return (trigger) ? (
        popups[type]
    ) : ""
}

export { Popup }  