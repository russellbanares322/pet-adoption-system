
const getLoggedUserInfo = () => {
    const userInfo = JSON.parse(localStorage.getItem("user-info") || '{}');
    return {email: userInfo?.email, displayName: userInfo?.displayName}

}

export default getLoggedUserInfo