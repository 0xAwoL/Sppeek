const userFromJWT = (jwt: string | undefined):string|null => {
    try {
        if (!jwt) return null;

        return JSON.parse(atob(jwt.split('.')[1])).username
    } catch (e) {
        return null 
    }

}

export { userFromJWT }