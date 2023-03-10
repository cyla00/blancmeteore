import axios from 'axios'
import jwt_decode from 'jwt-decode'

export default defineNuxtRouteMiddleware(async (to, from) => {

    if(localStorage.getItem('token')){
        const auth = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        await axios.post('http://localhost:3000/api/jwt-check', {}, auth).then(async (res) => {
            if(res.status === 200) {
                const token_role:any = jwt_decode(localStorage.getItem('token'))
                if(token_role.role !== 'user') return window.location.href = '/'
            }
        }).catch(async (_err) => {
            localStorage.clear()
            return window.location.href = '/connection'
        })
    }
    else{
        localStorage.clear()
        return window.location.href = '/connection'
    }
})