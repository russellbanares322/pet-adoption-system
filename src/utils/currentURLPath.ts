const renderLocationHostnameWithLogin = (extension: string) => {
    return `${window.location.hostname}${extension}`
}

export const currentURLPath = window.location.hostname.includes("localhost") ? `http://${renderLocationHostnameWithLogin(":5174/login")}` : renderLocationHostnameWithLogin("/login")