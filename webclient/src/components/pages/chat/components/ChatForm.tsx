import styles from '../chat.module.scss';
import { socket } from '../../../utils/socket/socket'
import { useEffect, useState } from 'react';
import { TextInput } from './TextInput';
import { msg, chatFormProps } from '../interfaces/interfaces';
import { LeftDiv, RightDiv, Users, Options } from './SmallDivs';
import { ChatLog } from './ChatLog';
import { LogoChat } from '../../../universalComponents/Logo';

const ChatForm: React.FC<chatFormProps> = ({ messages, setMessages}) => {
    const [users, setUsers] = useState<string[]>([])

    // listen for incoming messages 
    useEffect(() => {
        socket.on('msg', (message: msg) => {
            const { time, username, msg } = message
            const newMsg: msg = {
                time: time,
                username: username,
                msg: msg
            }
            setMessages([...messages, newMsg])
        })
        return () => {
            socket.off('msg')
        }
    }, [socket, messages])

    // initial request for all users + previous messages in current session.
    useEffect(() => {
        socket.emit('users')
        socket.emit('allMessages')
    }, [])

    // listen for users online
    useEffect(() => {
        socket.on('users', (newUsers: string[]) => {
            setUsers(newUsers)
        })
        return () => {
            socket.off('users')
        }
    }, [socket, users])

    // listen for previous messages
    useEffect(() => {
        socket.on('allMessages', (msgs: msg[]) => {
            setMessages(msgs)
        })
        return () => {
            socket.off('allMessages')
        }
    }, [socket, messages])

    return (
        <>
            <LogoChat/>
            <div className={styles.chatPage}>
                <div className={styles.mainPage}>
                    <LeftDiv>
                        <ChatLog messages={messages}/>
                        <TextInput />
                    </LeftDiv>
                    <RightDiv>
                        <Users users={users} />
                        <Options />
                    </RightDiv>
                </div>
            </div>
        </>
    )
}

export { ChatForm }