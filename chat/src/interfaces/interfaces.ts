import { Socket } from "socket.io";

interface msg {
    time: string;
    username: string;
    msg: string;
}[]

type socketsOnline = {
    [username:string]:  Socket["id"]
}

export type {msg,  socketsOnline}