// remove user billing address
// takes body params (address_id)
// takes jwt auth

import { Router, Status } from '../deps.ts'
import db from '../database/connection.ts'
import { UserSchema, Addresses } from '../database/interfaces.ts'
import { jwtDecode } from '../auth/jwtDecode.ts'

export const billingAddrDelete = new Router()
billingAddrDelete.delete('/api/delete-billing-address', async (ctx) => {

    const users = db.collection<UserSchema>("users")
    const addresses = db.collection<Addresses>("addresses")
    const body:any = await ctx.request.body({ type: 'json'})
    const bodyVal = await body.value
    const token = ctx.request.headers.get('Authorization')
    const date = new Date()

    if(bodyVal.address_id === ''){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: `Erreur`
        }
    }

    const addrCheck = await addresses.findOne({id: bodyVal.address_id})
    if(!addrCheck){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: 'Erreur'
        }
    }

    const userAddrCheck = await users.findOne({id: jwtDecode(token).id, billing_addr: bodyVal.address_id})
    if(!userAddrCheck){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: 'Erreur'
        }
    }

    await addresses.deleteOne({id: bodyVal.address_id}).then(async (doc) => {
        await users.updateOne({id: jwtDecode(token).id}, {
            $set: {modifiedAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`},
            $pull: {billing_addr: bodyVal.address_id}
        }).then((doc) => {
            ctx.response.status = Status.OK
            return ctx.response.body = {
                SuccMsg: `Adresse supprimée avec succès`
            }
        }).catch((_e) => {
            ctx.response.status = Status.InternalServerError
            return ctx.response.body = {
                ErrMsg: `Erreur`
            }
        })
    }).catch((_e) => {
        ctx.response.status = Status.InternalServerError
        return ctx.response.body = {
            ErrMsg: `Erreur`
        }
    })
})