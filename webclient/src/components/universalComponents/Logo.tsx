// import styles from '../pages/auth/login/login.module.scss'
import styles from './universalStyles.module.scss'
import logoauth from '../../../assets/sppeek-high-resolution-logo-white-on-transparent-background.svg'
import logochat from '../../../assets/logo-no-background.svg'

const LogoAuth = () => {
    return(
        <div className={styles.logoDiv}>
            <a href="/">
                <img src={logoauth} className={styles.sppeekLogo}></img>
            </a>
        </div>
    )
}
const LogoChat = () => {
    return(
        <div className={styles.logoDivChat}>
            <a href="/">
                <img src={logochat} className={styles.sppeekLogoChat}></img>
            </a>
        </div>
    )
}

export {LogoAuth, LogoChat}