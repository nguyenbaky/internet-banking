const getToken = _ => {
    const auth = JSON.parse(localStorage.getItem('user')) 
    if (!auth) {
        return ''
    }

    return auth.token || ''
}

const utils = {
    getToken,
}

export default utils
