// create usere billing address
// takes body params (address, region, city, postcode)
// takes jwt auth id

import { Router, Status } from '../deps.ts'
import db from '../database/connection.ts'
import { UserSchema, Addresses } from '../database/interfaces.ts'
import { jwtDecode } from '../auth/jwtDecode.ts'

export const billingAddrAdd = new Router()
billingAddrAdd.post('/api/add-billing-address', async (ctx) => {
    const users = db.collection<UserSchema>("users")
    const addresses = db.collection<Addresses>("addresses")
    const body:any = await ctx.request.body({ type: 'json'})
    const bodyVal = await body.value
    const token = ctx.request.headers.get('Authorization')
    const date = new Date()

    if(bodyVal.address === '' || bodyVal.region === '' || bodyVal.city === '' || bodyVal.postcode === ''){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: `Remplir tous les champs`
        }
    }

    const addrCheck = await addresses.findOne({
        address: bodyVal.address,
        city: bodyVal.city,
        region: bodyVal.region,
        postcode: bodyVal.postcode,
    })

    if(addrCheck){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: `L'adresse existe`
        }
    }

    const addrId:any = crypto.randomUUID()
    
    await addresses.insertOne({
        id: addrId,
        userId: jwtDecode(token).id,
        address: bodyVal.address,
        city: bodyVal.city,
        region: bodyVal.region,
        postcode: bodyVal.postcode,
    }).then(async (doc) => {
        await users.updateOne({id: jwtDecode(token).id}, {
            $set: {modifiedAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`},
            $push: {billing_addr: addrId}
        }).then((doc) => {
            ctx.response.status = Status.OK
            return ctx.response.body = {
                SuccMsg: `Adresse ajoutée avec succès`
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