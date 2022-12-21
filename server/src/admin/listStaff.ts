// list all staff users

import { Router, Status, decode, sha256 } from '../deps.ts'
import db from '../database/connection.ts'
import { UserSchema } from '../database/interfaces.ts'


export const listStaff = new Router()
listStaff.post('/api/list-staff', async (ctx) => {

    const token = ctx.request.headers.get("Authorization")
    if(!token) return ctx.response.status = Status.Unauthorized
    const cleanedToken = token.split(' ')[1]

    const [header, payload, signature]:Array<any> = decode(cleanedToken)

    if(payload.role !== 'admin') return ctx.response.status = Status.Unauthorized
    const users = db.collection<UserSchema>("users")
    await users.find({$or: [{role: 'commercial'}, {role: 'creator'}]}).toArray().then(async (doc) => {
        const cleaned:Array<object> = []

        await doc.forEach((element) => {
            cleaned.push({
                id: element.id,
                email: element.email,
                role: element.role,
                lastLogin: element.lastLogin,
            })
        })
        ctx.response.status = Status.OK
        return ctx.response.body = {
            staffList: cleaned
        }
    }).catch((_e) => {
        return ctx.response.status = Status.InternalServerError
    })
})