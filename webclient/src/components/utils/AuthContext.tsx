import { createContext } from "react";

interface AuthContextType {
    username: string | null;
    signin: (e: React.SyntheticEvent, successPopup:any, failPopup:any) => void;
    signout: () => void;
    setUsername: React.Dispatch<React.SetStateAction<string | null>>
}
const AuthContext = createContext<AuthContextType>(null!);

export {AuthContext}