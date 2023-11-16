import { Route, Routes, useLocation, Navigate, useNavigate } from "react-router-dom"
import axios from "axios"
import { ForgotPassowrd } from "./auth/forgotpassword/ForgotPassword"
import { Login } from './auth/login/Login'
import { Register } from "./auth/register/Register"
import { Chat } from "./chat/Chat"
import { useContext, useState } from "react"
import { AuthContext } from "../utils/AuthContext"
import { animateCSS } from "../utils/animate"
import { getCookie } from "../utils/getCookie"
import { userFromJWT } from "../utils/userFromJWT"
const PROD = import.meta.env.PROD;

const MainRouter = () => {
    const AuthProvider = ({ children }: { children: React.ReactNode }) => {
        const [username, setUsername] = useState<string | null>(null);
        const navigate = useNavigate();

        const signin = (e: React.SyntheticEvent, successPopup: any, failPopup: any) => {
            e.preventDefault()
            const expressServerURL = PROD ? "https://www.sppeek.online:3000/login" : "http://localhost:3000/login/"
            const formData = e.target as typeof e.target & {
                username: { value: string };
                password: { value: string };
            };
            const usernameValue = formData.username.value
            const passwordValue = formData.password.value

            axios.post(expressServerURL, {
                username: usernameValue,
                password: passwordValue
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((req) => {
                // set session token.
                const jwt = req.data as string
                const usernameFromJwt = userFromJWT(jwt)

                setUsername(usernameFromJwt)
                window.sessionStorage.setItem('token', jwt)

                // clean form, show success popup, route to chat.
                const form = document.getElementById('loginForm') as HTMLFormElement
                form.reset()
                successPopup(true)
                failPopup(false)
                setTimeout(() => {
                    navigate("/chat")
                }, 1500)
            }).catch((e) => {
                if (e.response.data == "verify user") {
                    console.log('here')
                    navigate("/?verified=false")
                } else {
                    animateCSS('#registerUsernameInput', 'shakeX');
                    animateCSS('#registerPasswordInput', 'shakeX');
                    successPopup(false)
                    failPopup(true)
                }
            })
        };

        const signout = () => {
            sessionStorage.clear()
            setUsername(null);
            navigate("/")
        };

        const value = { username, signin, signout, setUsername };
        return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    }

    const useAuth = () => {
        return useContext(AuthContext)
    }

    const RequireAuth = ({ children }: { children: JSX.Element }) => {
        const { username } = useAuth();
        const location = useLocation();
        const jwt = getCookie('token')

        // check if user is set or if jwt exists in case of browser refresh.
        if (username || jwt) {
            return children;
        }
        // Redirect user to the /login page, but save the current location 
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return (
        <AuthProvider>
            <Routes>
                {/* popups urls */}
                <Route path="/fied?" element={<Login />} />
                <Route path="/sameAccount?" element={<Login />} />
                <Route path="/forgotpassword" element={<ForgotPassowrd />} />

                <Route path="/register" element={<Register />} />
                <Route
                    path="/chat"
                    element={
                        <RequireAuth>
                            <Chat />
                        </RequireAuth>
                    }
                />
                <Route path="*" element={<Login />} />
            </Routes>
        </AuthProvider>
    )
}

export { MainRouter }


