import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AnimatedBackground } from '../../../universalComponents/MovingBackground';
import { Devider } from '../../../universalComponents/Devider';
import { Popup } from '../../../universalComponents/Popup';
import { LogoAuth } from '../../../universalComponents/Logo';
import styles from './resetPassword.module.scss'
import 'animate.css';
const PROD = import.meta.env.PROD;

const ResetPassword: React.FC = () => {
    const [successPopupTrigger, setSuccessPopupTrigger] = useState<boolean>(false)
    const [errorPopupTrigger, setErrorPopupTrigger] = useState<boolean>(false);
    const [passwordLengthPopupTrigger, setPasswordLengthRequirementsPopupTrigger] = useState<boolean>(false)
    const [passwordsDoNotMatchPopupTrigger, setPasswordsDoNotMatchPopupTrigger] = useState<boolean>(false)
    const { resettoken } = useParams()
    const redirectURL = PROD ? 'https://www.sppeek.online' : 'http://localhost:8080'
    console.log(resettoken)

    const redirect = () => {
        const timeout = setTimeout(() => {
            window.location.replace(redirectURL)
        }, 3000)
        return () => clearTimeout(timeout)
    }

    const handleForm = (e: React.SyntheticEvent) => {
        e.preventDefault()

        const expressServerURL = PROD ? `https://www.sppeek.online:3000/changepassword/${resettoken}` : `http://localhost:3000/changepassword/${resettoken}`
        const formData = e.target as typeof e.target & {
            password: { value: string };
            passwordDuplicate: { value: string };
        };

        const passwordValue = formData.password.value
        const passwordDuplicateValue = formData.passwordDuplicate.value

        axios.post(expressServerURL, {
            passwordDuplicate: passwordDuplicateValue,
            password: passwordValue
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(() => {
            setSuccessPopupTrigger(true)
            setPasswordLengthRequirementsPopupTrigger(false)
            setPasswordsDoNotMatchPopupTrigger(false)
            setErrorPopupTrigger(false)
            redirect()
        }).catch((e) => {
            if (e.response.data == "Passwords do not match") {
                // passwords do not match
                setSuccessPopupTrigger(false)
                setPasswordLengthRequirementsPopupTrigger(false)
                setPasswordsDoNotMatchPopupTrigger(true)
                setErrorPopupTrigger(false)

            } else if (e.response.data == "The minimum password length is 6 characters") {
                //min length
                setSuccessPopupTrigger(true)
                setPasswordLengthRequirementsPopupTrigger(true)
                setPasswordsDoNotMatchPopupTrigger(false)
                setErrorPopupTrigger(false)

            } else {
                setSuccessPopupTrigger(false)
                setPasswordLengthRequirementsPopupTrigger(false)
                setPasswordsDoNotMatchPopupTrigger(false)
                setErrorPopupTrigger(true)
                // sorry we couldn't change your passowrd 
            }
        })
    }


    return (
        <AnimatedBackground>
            <Popup trigger={successPopupTrigger} setTrigger={setSuccessPopupTrigger} type="ChangePasswordSuccess" />
            <Popup trigger={passwordLengthPopupTrigger} setTrigger={setPasswordLengthRequirementsPopupTrigger} type="PasswordsLength" />
            <Popup trigger={passwordsDoNotMatchPopupTrigger} setTrigger={setPasswordsDoNotMatchPopupTrigger} type="PasswordsDoNotMatch" />
            <Popup trigger={errorPopupTrigger} setTrigger={setErrorPopupTrigger} type="ResetPasswordError" />
            <div className={styles.loginPage}>
                <LogoAuth />
                <div className={styles.mainDiv}>
                    <div className={styles.formDiv}>
                        <form className={styles.form} onSubmit={handleForm}>
                            <h1 className={styles.mainText}>Create new password</h1>
                            <Devider />
                            <input type="password" name="password" placeholder="new password" id="resetPasswordPassword" className={styles.usernameInput} required></input>
                            <Devider />
                            <input type="password" name="passwordDuplicate" placeholder="confrm new password" id="resetPasswordPasswordDuplicate" className={styles.usernameInput} required></input>
                            <Devider />
                            <input type='submit' value='reset' className={styles.loginButton} />
                            <Devider />
                        </form>
                    </div>
                </div>
            </div>
        </AnimatedBackground>
    )
}
export { ResetPassword }