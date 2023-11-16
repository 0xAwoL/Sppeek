import { useEffect, useState, useCallback} from "react"
import { useNavigate } from "react-router-dom";
import { getCookie } from '../../utils/getCookie'
import { socket } from '../../utils/socket/socket.ts';
import { ChatForm } from './components/ChatForm.tsx'
import { ChangeScreenOrientation } from "./components/SmallDivs.tsx";
import { msg } from './interfaces/interfaces';

const Chat = (): JSX.Element => {
    const [isConnected, setIsConnected] = useState(false)
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    const [messages, setMessages] = useState<msg[]>([])
    const navigate = useNavigate()

    const handleWindowResize = useCallback(() => {
        setWindowSize(window.innerWidth)
    }, [])

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [handleWindowResize])

    // initialize connection to socket.io server with user jwt.
    useEffect(() => {
        const jwt = getCookie('token')
        socket.auth = { token: jwt }
        socket.connect()

        return () => {
            socket.disconnect()
        }
    }, [])

    // handle different socket routes
    useEffect(() => {
        const onConnect = () => {
            setIsConnected(true);
        }
        const connect_error = (e:any) => {
            // console.log(e)
            if (e.message == 'duplicate user') {
                navigate("/?sameAccount=true")
            }  else {
                navigate("/")
            }
            setIsConnected(false)
        }
        const onDisconnect = () => {
            navigate("/")
            setIsConnected(false)
        }
        socket.on('connect', onConnect)
        socket.on('connect_error', connect_error)
        socket.on('disconnect', onDisconnect)
        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
            socket.off('connect_error', connect_error)
        };
    }, []);

    // check if portrait browser is in portrait mode, if so render changeOrientation component.
    const changeorientation = window.matchMedia("(orientation: portrait)").matches && windowSize < 550
    return (
        // check if user is connected, if so render chat else navigate to login screen
        <>
            {changeorientation ? <ChangeScreenOrientation /> : isConnected ? <ChatForm messages={messages} setMessages={setMessages} /> : navigate("/")}
        </>
    )
}
export { Chat } 
