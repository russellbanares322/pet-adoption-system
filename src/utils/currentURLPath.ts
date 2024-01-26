const renderLocationHostnameWithLogin = (extension: string) => {
    return `${window.location.hostname}${extension}`
}

export const currentURLPath = window.location.hostname.includes("localhost") ? renderLocationHostnameWithLogin(":5174/login") : renderLocationHostnameWithLogin("/login")