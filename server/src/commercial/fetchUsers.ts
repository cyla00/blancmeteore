//fetches specific user
// body param "clientId"


import { Router, Status } from '../deps.ts'
import db from '../database/connection.ts'
import { UserSchema} from '../database/interfaces.ts'
import { jwtDecode } from '../auth/jwtDecode.ts'
    
export const fetchUser = new Router()
fetchUser.post('/api/get-user', async (ctx) => {
    
    const token = ctx.request.headers.get('Authorization')
    const body:any = await ctx.request.body()
    const bodyVal = await body.value
    const users = db.collection<UserSchema>("users")

    if(jwtDecode(token).role !== 'commercial'){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: 'Erreur'
        }
    }

    if(bodyVal.clientId === ''){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: 'Erreur'
        }
    }

    try{
        const user = await users.findOne({id: bodyVal.clientId})
        if(!user){
            ctx.response.status = Status.BadRequest
            return ctx.response.body = {
                ErrMsg: 'Utilisateur non trouvé'
            }
        }

        ctx.response.status = Status.OK
        return ctx.response.body = {
            firstName: user.firstName,
            lastName: user.lastName,
            companyName: user.companyName,
            siret: user.siret,
            tel: user.tel,
            email: user.email,
        }
    }catch(_e){
        ctx.response.status = Status.InternalServerError
        return ctx.response.body = {
            ErrMsg: 'Erreur'
        }
    }
})