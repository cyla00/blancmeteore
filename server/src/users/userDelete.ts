// deletes roles staff and user account
// takes body params (id) and jwt auth
// checks if the account is owner or admin


import { Router, Status, fs } from '../deps.ts'
import { jwtDecode } from '../auth/jwtDecode.ts'
import db from '../database/connection.ts'
import { UserSchema } from '../database/interfaces.ts'



export const userDelete = new Router()
userDelete.delete('/api/user-delete', async (ctx) => {
    const users = db.collection<UserSchema>("users")
    const body:any = await ctx.request.body({ type: 'json'})
    const bodyVal = await body.value
    const token = ctx.request.headers.get('Authorization')

    if(bodyVal.id === ''){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: `Erreur`
        }
    }

    const idCheck = await users.findOne({id: bodyVal.id})
    if(!idCheck){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: `Le compte que vous souhaitez supprimé n'existe pas`
        }
    }

    if(idCheck.role === 'admin'){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: `Erreur`
        }
    }

    if(idCheck.id !== jwtDecode(token).id && jwtDecode(token).role !== 'admin'){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: `Erreur`
        }
    }

    try{
        await fs.emptyDir(`./media/user_${bodyVal.id}`)
        const userFolderPath = `./media/user_${bodyVal.id}`
        await Deno.removeSync(userFolderPath)
    }catch(e){
        console.log(e)
        ctx.response.status = Status.InternalServerError
        return ctx.response.body = {
            ErrMsg: `Erreur, réessayer plus tard`
        }
    }


    await users.deleteOne({id: bodyVal.id}).then((_doc) => {
        ctx.response.status = Status.OK
        return ctx.response.body = {
            SuccMsg: `compte supprimé avec succès`
        }
    }).catch((_e) => {
        ctx.response.status = Status.InternalServerError
        return ctx.response.body = {
            ErrMsg: `Erreur, réessayer plus tard`
        }
    })
})