import axios from 'axios'
import jwt_decode from 'jwt-decode'

export default defineNuxtRouteMiddleware(async (to:any, from:any) => {

    if(localStorage.getItem('token')){
        const auth = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        await axios.post('http://localhost:3000/api/jwt-check', {}, auth).then(async (res:any) => {
            if(res.status === 200) {
                const token_role:any = jwt_decode(localStorage.getItem('token'))
                if(token_role.role === 'admin') return window.location.href = '/admin-dash'
                if(token_role.role === 'commercial') return window.location.href = '/commercial-dash'
                if(token_role.role === 'creator') return window.location.href = '/creator-dash'
                if(token_role.role === 'user') return window.location.href = '/user-dash'
            }
        }).catch(async (_err:any) => {
            localStorage.clear()
            return window.location.href = '/connection'
        })
    }
    else{
        localStorage.clear()
        return window.location.href = '/connection'
    }
})