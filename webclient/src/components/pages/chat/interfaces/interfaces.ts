interface msg {
    time: string;
    username: string;
    msg: string;
}

interface childrenProps {
    children: React.ReactNode
}

interface chatFormProps {
    messages: msg[];
    setMessages: (value: msg[]) => void;
}

type chatLogProps = {
    messages: msg[];
}

interface usersProps {
    users: string[];
}

interface messageProps {
    text: string;
    time: string;
    username: string;
    isOurMessage: boolean;
}

export type { msg, childrenProps, chatFormProps, chatLogProps, usersProps, messageProps }