import { memo } from 'react'
import styles from '../chat.module.scss';
import { messageProps } from '../interfaces/interfaces';

const Message: React.FC<messageProps> = memo(({ text, username, isOurMessage }) => {
    const time = new Date().toLocaleString();
    const OurMessage = () => {
        return (
            <div className={styles.myMessage} >
                <div className={styles.leftSide}>
                    <div className={styles.messageText}>{text}</div>
                    <p className={styles.username}>{username}</p>
                </div>
                <div className={styles.rightSide}>
                    <p className={styles.timestamp}>{time}</p>
                </div>
            </div>
        )
    }
    const ForeignMessage = () => {
        return (
            <div className={styles.message}>
                <div className={styles.leftSide}>
                    <p className={styles.timestamp}>{time}</p>
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.messageText}>{text}</div>
                    <p className={styles.username}>{username}</p>
                </div>
            </div>
        )
    }
    return (
        <>
            {isOurMessage ? <OurMessage /> : <ForeignMessage />}
        </>
    )

})

export { Message }