import { socket } from '../../../utils/socket/socket';
import styles from '../chat.module.scss';

const TextInput = () => {
    const handleForm = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const data = e.target as typeof e.target & {
            message: { value: string }
        }
        const message = data.message.value

        if (message !== '') {
            socket.emit('msg', { message });
            const form = document.getElementById('chatForm') as HTMLFormElement;
            form.reset();
        }
    }

    // const inputIDs = ['chatMessageInput']

    return (
        <div className={styles.inputBar}>
            <form onSubmit={handleForm} id="chatForm" className={styles.chatForm}>
                <input type="text" name="message" autoComplete='off' id="chatMessageInput" className={styles.messageInput} />
            </form>
        </div>
    )
}
export { TextInput }