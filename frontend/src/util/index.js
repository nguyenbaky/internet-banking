import store from 'store'

const getToken = _ => {
    const auth = store.get('user')
    if (!auth) {
        return ''
    }

    return auth.token || ''
}

const utils = {
    getToken,
}

export default utils