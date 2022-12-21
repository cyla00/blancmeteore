// deletes a site mesure product linked to a user + poroduct_id
// body params (user_id, product_id,)

import { Router, Status } from '../../deps.ts'
import db from '../../database/connection.ts'
import { SiteMesureSchema, UserSchema } from '../../database/interfaces.ts'
import { jwtDecode } from '../../auth/jwtDecode.ts'

export const deleteSiteMesure = new Router()
deleteSiteMesure.delete('/api/delete-site-mesure', async (ctx) => {

        const token = ctx.request.headers.get('Authorization')
        const body:any = await ctx.request.body()
        const bodyVal = await body.value
        
        const sitesMesure = db.collection<SiteMesureSchema>("sites_mesure")
        const users = db.collection<UserSchema>("users")

        if(bodyVal.user_id === '' || bodyVal.product_id === ''){
            ctx.response.status = Status.BadRequest
            return ctx.response.body = {
                ErrMsg: 'Erreur'
            }
        }
    
        if(jwtDecode(token).role !== 'admin' && jwtDecode(token).role !== 'commercial' && jwtDecode(token).role !== 'user'){
            ctx.response.status = Status.BadRequest
            return ctx.response.body = {
                ErrMsg: 'Erreur'
            }
        }

        if(jwtDecode(token).role === 'user' && jwtDecode(token).id !== bodyVal.user_id){
            ctx.response.status = Status.BadRequest
            return ctx.response.body = {
                ErrMsg: 'Erreur'
            }
        }

        await users.findOne({id: bodyVal.user_id, sitesMesureOrders: {$in: [bodyVal.product_id]}}).then(async (doc) => {
            if(!doc){
                ctx.response.status = Status.BadRequest
                return ctx.response.body = {
                    ErrMsg: 'Erreur'
                }
            }
            await sitesMesure.deleteOne({id: bodyVal.product_id}).then(async (doc) => {
                await users.updateOne({id: bodyVal.user_id}, {$pull: {sitesMesureOrders: bodyVal.product_id}}).then((doc) => {
                    ctx.response.status = Status.OK
                    return ctx.response.body = {
                        SuccMsg: 'Produit supprimé avec succès'
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
        }).catch((_e) => {
            ctx.response.status = Status.InternalServerError
            return ctx.response.body = {
                ErrMsg: 'Erreur'
            }
        })
})