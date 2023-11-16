const getCookie = (name: string ): string | undefined => {
    try {
        const matches = window.sessionStorage.getItem(name)
        return matches ? decodeURIComponent(matches) : undefined;
    }
    catch (e) {
        return undefined
    }
}

export { getCookie }