import {useContext, useEffect, useRef} from "react";
import {Message} from "./Message";
import {chatLogProps} from "../interfaces/interfaces";
import styles from '../chat.module.scss';
import {AuthContext} from "../../../utils/AuthContext";
import {userFromJWT} from "../../../utils/userFromJWT";
import {getCookie} from "../../../utils/getCookie";

const ChatLog: React.FC<chatLogProps> = ({messages}) => {
    const ref = useRef<HTMLDivElement>(null)
    const {username} = useContext(AuthContext);
    const jwt = getCookie('token')
    const userFromJwt = userFromJWT(jwt) 

    useEffect(() => {
        ref.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        })
    }, [messages.length])

    return (
        <div id="chatlog" className={styles.chatLog}>
            {messages.map((mess) => {
                const isOurMessage = () => {
                    if (mess.username === (username || userFromJwt)) {
                        return true
                    } else {
                        return false
                    }
                }
                return <Message key={mess.time} text={mess.msg} time={mess.time} username={mess.username} isOurMessage={isOurMessage()}></Message>
            })}
            <div ref={ref} />
        </div>
    )
}
export {ChatLog}
