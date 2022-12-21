// modify password for any account
// takes body params "old_password", "new_password"
// takes jwt token owned by in use account

import { Router, Status, sha256 } from '../deps.ts'
import db from '../database/connection.ts'
import { UserSchema } from '../database/interfaces.ts'
import { jwtDecode } from '../auth/jwtDecode.ts'

export const passwordChange = new Router()
passwordChange.put('/api/password-change', async (ctx) => {
        const date = new Date()
        const body:any = await ctx.request.body({ type: 'json'})
        const bodyVal = await body.value

        if(Object.keys(bodyVal).length === 0) return ctx.response.status = Status.BadRequest
        if(bodyVal.old_password === '') return ctx.response.status = Status.BadRequest
        if(bodyVal.new_password === '') return ctx.response.status = Status.BadRequest

        const token = ctx.request.headers.get("Authorization")

        const hashedPwd = sha256(bodyVal.old_password, "utf8", "base64").toString()
        const newPwdHash = sha256(bodyVal.new_password, "utf8", "base64").toString()
        const users = db.collection<UserSchema>("users")

        await users.findOne({id: jwtDecode(token).id, "password": hashedPwd}).then(async (_res) => {
            if(_res === undefined){
                ctx.response.status = Status.Unauthorized
                return ctx.response.body = {
                    ErrMsg: 'Erreur'
                }
            }

            await users.updateOne({id: jwtDecode(token).id}, {$set: {
                "password": newPwdHash,
                "modifiedAt": `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
            }}).then((_res) => {
                ctx.response.status = Status.OK
                return ctx.response.body = {
                    SuccMsg: 'Le mot de passe a été changé avec succès'
                }
            }).catch((_e) => {
                ctx.response.status = Status.InternalServerError
                return ctx.response.body = {
                    ErrMsg: 'Erreur'
                }
            })
        }).catch((_e) => {
            ctx.response.status = Status.InternalServerError
            return ctx.response.body = {
                ErrMsg: 'Erreur'
            }
        })
})