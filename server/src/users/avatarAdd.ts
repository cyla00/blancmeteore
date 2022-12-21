// change the profile avatar image of a user
import { Router, Status } from '../deps.ts'
import db from '../database/connection.ts'
import { UserSchema } from '../database/interfaces.ts'
import { jwtDecode } from '../auth/jwtDecode.ts'

export const avatarAdd = new Router()
avatarAdd.post('/api/add-avatar', async (ctx) => {

        const token = ctx.request.headers.get('Authorization')
        const body:any = await ctx.request.body()
        
        const users = db.collection<UserSchema>("users")
        const userCheck:any = await users.findOne({id: jwtDecode(token).id})
        const date = new Date()

        if(userCheck === undefined){
            ctx.response.status = Status.BadGateway
            return ctx.response.body = {
                ErrMsg: `Erreur`
            }
        }

        try{
            const bodyVal = await body.value.read()
            await Deno.rename(bodyVal.files[0].filename, `./media/user_${jwtDecode(token).id}/${bodyVal.files[0].originalName}`)
        }   
        catch(e){
            console.log(e)
            ctx.response.status = Status.InternalServerError
            return ctx.response.body = {
                ErrMsg: 'Erreur'
            }
        }

        await users.updateOne({id: jwtDecode(token).id}, {$set: {
            profile_image: `user_${jwtDecode(token).id}/avatar.jpg`,
            modifiedAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
        }}).then((_doc) => {
            ctx.response.status = Status.OK
            return ctx.response.body = {
                SuccMsg: `Image modifiée avec succès`
            }
        }).catch((_e) => {
            ctx.response.status = Status.InternalServerError
            return ctx.response.body = {
                ErrMsg: `Erreur de modification, réessayer plus tard`
            }
        })
})