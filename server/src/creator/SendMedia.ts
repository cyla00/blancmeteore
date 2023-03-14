//sends media to user
//takes body "user_id"

import { Router, Status } from '../deps.ts'
import db from '../database/connection.ts'
import { UserSchema } from '../database/interfaces.ts'
import { jwtDecode } from '../auth/jwtDecode.ts'

export const sendMedia = new Router()
sendMedia.post('/api/send-media', async (ctx) => {

    const token = ctx.request.headers.get('Authorization')
    const users = db.collection<UserSchema>("users")
    const body:any = await ctx.request.body()
    
    if(jwtDecode(token).role !== 'creator'){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: 'Erreur'
        }
    }

    try{
        const bodyVal = await body.value.read()

        if(bodyVal.fields.client_id === ''){
            ctx.response.status = Status.BadRequest
            return ctx.response.body = {
                ErrMsg: 'Erreur'
            }
        }

        const checkUser = await users.findOne({id: bodyVal.fields.client_id})
        if(!checkUser){
            ctx.response.status = Status.BadRequest
            return ctx.response.body = {
                ErrMsg: 'Erreur'
            }
        }

        // if(bodyVal.files[0].contentType !== 'application/zip'){
        //     ctx.response.status = Status.BadRequest
        //     return ctx.response.body = {
        //         ErrMsg: 'Erreur'
        //     }
        // }
        

        await Deno.rename(bodyVal.files[0].filename, `./media/user_${bodyVal.fields.client_id}/creations/creations.zip`)
        
        ctx.response.status = Status.OK
        return ctx.response.body = {
            SuccMsg: 'Téléchargé avec succès'
        }
    }catch(_e){
        console.log(_e)
        ctx.response.status = Status.InternalServerError
        return ctx.response.body = {
            ErrMsg: 'Erreur'
        }
    }
})