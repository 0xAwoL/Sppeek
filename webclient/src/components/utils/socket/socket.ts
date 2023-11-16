import { io } from 'socket.io-client';

const PROD = import.meta.env.PROD;
const url = PROD ? "https://www.sppeek.online:1337" : "http://localhost:1337"

const socket = io(url, {
    autoConnect: false,
    withCredentials: true
})

export { socket }