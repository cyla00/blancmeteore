// checks if user profile is set to public
// takes body params "user_id"


import { Router, Status } from '../deps.ts'
import db from '../database/connection.ts'
import { UserSchema } from '../database/interfaces.ts'



export const publicProfileCheck = new Router()
publicProfileCheck.post('/api/public-profile', async (ctx) => {
    const users = db.collection<UserSchema>("users")
    const body:any = await ctx.request.body({ type: 'json'})
    const bodyVal = await body.value

    if(bodyVal.user_id === ''){
        ctx.response.status = Status.Unauthorized
        return ctx.response.body = {
            ErrMsg: 'Erreur'
        }
    }

    const userCheck = await users.findOne({id: bodyVal.user_id, public: true})
    if(!userCheck){
        ctx.response.status = Status.Unauthorized
        return ctx.response.body = {
            ErrMsg: 'Erreur'
        }
    }
    return ctx.response.status = Status.OK
})