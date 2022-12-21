// deletes a site vitrine product linked to a user + poroduct_id
// body params (user_id, product_id,)

import { Router, Status } from '../../deps.ts'
import db from '../../database/connection.ts'
import { SiteVitrineSchema, UserSchema } from '../../database/interfaces.ts'
import { jwtDecode } from '../../auth/jwtDecode.ts'

export const deleteSiteVitrine = new Router()
deleteSiteVitrine.delete('/api/delete-site-vitrine', async (ctx) => {

        const token = ctx.request.headers.get('Authorization')
        const body:any = await ctx.request.body()
        const bodyVal = await body.value

        const sitesVitrine = db.collection<SiteVitrineSchema>("sites_vitrine")
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

        await users.findOne({id: bodyVal.user_id, sitesVitrineOrders: {$in: [bodyVal.product_id]}}).then(async (doc) => {
            if(!doc){
                ctx.response.status = Status.BadRequest
                return ctx.response.body = {
                    ErrMsg: 'Erreur'
                }
            }
            await sitesVitrine.deleteOne({id: bodyVal.product_id}).then(async (doc) => {
                await users.updateOne({id: bodyVal.user_id}, {$pull: {sitesVitrineOrders: bodyVal.product_id}}).then((doc) => {
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