import { useContext } from 'react'
import styles from '../chat.module.scss'
import { childrenProps } from '../interfaces/interfaces'
import { usersProps } from '../interfaces/interfaces'
import { AuthContext } from '../../../utils/AuthContext'
import { userFromJWT } from '../../../utils/userFromJWT'
import { getCookie } from '../../../utils/getCookie'
import LogoSvg from '../../../../../assets/logout.svg'
import rotateSvg from '../../../../../assets/rotate-phone.svg'

const LeftDiv: React.FC<childrenProps> = ({ children }) => {
    return (
        <div className={styles.leftParent}>{children}</div>
    )
}

const RightDiv: React.FC<childrenProps> = ({ children }) => {
    return (
        <div className={styles.rightParent}>{children}</div>
    )
}

const Users: React.FC<usersProps> = ({ users }) => {
    const { username } = useContext(AuthContext);
    const jwt = getCookie('token')
    const userFromJwt = userFromJWT(jwt)

    // Filter the current user out of the users list.
    const otherUsers = users.filter((user) => user !== (username || userFromJwt));

    return (
        <>
            <div className={styles.usersHeader}>
                Users Online
            </div>
            <div className={styles.users}>
                {otherUsers.length ? (
                    otherUsers.map((user) => <p key={user}>{user}</p>)
                ) : (
                    <p>Sorry, no one else is here. :c</p>
                )}
            </div>
        </>
    )
}

const CurrentUser = () => {
    const { username } = useContext(AuthContext);
    const jwt = getCookie('token')
    const userFromJwt = userFromJWT(jwt)
    return (
        <div className={styles.currentUser}><p>Logged in as {username || userFromJwt }</p></div>
    )
}


const Options = () => {
    return (
        <div className={styles.options}>
            <CurrentUser />
            <Logout />
        </div>
    )
}

const Logout = () => {
    const auth = useContext(AuthContext)
    return (
        <img title='Logout'
            className={styles.logout}
            onClick={auth.signout}
            src={LogoSvg}
        />
    )
}

const ChangeScreenOrientation = () => {
    return (
        <div className={styles.changeScreenOrientationPage}>
            <div className={styles.changeScreenOrientation}>
                <p>Please rotate your screen</p>
                <img className={styles.rotateSvg} src={rotateSvg} ></img>
                <p>We support only landscape mode on mobile devices</p>
            </div>
        </div>
    )
}

export { LeftDiv, RightDiv, Users, Options, CurrentUser, ChangeScreenOrientation }