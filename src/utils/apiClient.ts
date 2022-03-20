import axios from 'axios'
import { getErrMsg } from '@/utils/error'
import qs from 'qs'
// import { toaster } from 'baseui/toast'

// Define possible endpoints
const endPoints = {
    test: 'https://60b2643d62ab150017ae21de.mockapi.io/',
    prod: 'https://prod.myapi.io/',
    staging: 'https://staging.myapi.io/',
}

// Create an axios instnce
const instance = axios.create({
    // in real case, determine it dynamically
    baseURL: endPoints.test,
    timeout: 30000,
    // get token somewhere
    headers: { Authorization: 'Bear mytoken' },
})

// Define interceptors to handle all requests.
instance.interceptors.response.use(
    (response) => {
        // You can add special logic for successful requests
        return response
    },
    (error) => {
        const errMsg = getErrMsg(error)
        if (error.response?.status === 403 && error.config.method === 'get') {
            const search = qs.parse(location.search, { ignoreQueryPrefix: true })
            let { redirect } = search
            if (redirect && typeof redirect === 'string') {
                redirect = decodeURI(redirect)
            } else if (['/login', '/logout'].indexOf(location.pathname) < 0) {
                redirect = `${location.pathname}${location.search}`
            } else {
                redirect = '/'
            }
            if (location.pathname !== '/login' && location.pathname !== '/login/') {
                window.location.href = `${window.location.protocol}//${
                    window.location.host
                }/login?redirect=${encodeURIComponent(redirect)}`
            }
        }
        // todo fix it
        // else if (Date.now() - (lastErrMsgRef.current[errMsg] || 0) > errMsgExpireTimeSeconds * 1000) {
        //     toaster.negative(errMsg, { autoHideDuration: (errMsgExpireTimeSeconds + 1) * 1000 })
        //     lastErrMsgRef.current[errMsg] = Date.now()
        // }

        return Promise.reject(error)
    }
)

export default instance
