//sets status of order as "proposition sent"

import { Router, Status } from '../deps.ts'
import db from '../database/connection.ts'
import { IdGraphicOrderSchema, SiteEComSchema, SiteVitrineSchema, SiteMesureSchema } from '../database/interfaces.ts'
import { jwtDecode } from '../auth/jwtDecode.ts'
import prod_json from '../products/prod_config.json' assert { type: "json" }
    
export const propositionSent = new Router()
propositionSent.post('/api/proposition-sent', async (ctx) => {
    
    const token = ctx.request.headers.get('Authorization')
    const date = new Date()
    const body:any = await ctx.request.body()
    const bodyVal = await body.value
    
    const idGraph = db.collection<IdGraphicOrderSchema>("id_graphic")
    const sitesEcom = db.collection<SiteEComSchema>('sites_ecomm')
    const sitesVitr = db.collection<SiteVitrineSchema>('sites_vitrine')
    const sitesMesure = db.collection<SiteMesureSchema>('sites_mesure')
    
    if(jwtDecode(token).role !== 'commercial'){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: 'Erreur'
        }
    }

    if(bodyVal.order_id === '') return ctx.response.status = Status.BadRequest

    const findgraph = await idGraph.findOne({id: bodyVal.order_id})
    const findsitevitr = await sitesVitr.findOne({id: bodyVal.order_id})
    const findsiteecomm = await sitesEcom.findOne({id: bodyVal.order_id})
    const findsitemesure = await sitesMesure.findOne({id: bodyVal.order_id})

    if(findgraph){
        try{
            await idGraph.updateOne({id: bodyVal.order_id}, {$set: {status: prod_json.status[2], modifiedAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}})
            ctx.response.status = Status.OK
            return ctx.response.body = {
                SuccMsg: 'Statut changé avec succès'
            }
        }catch(e){
            ctx.response.status = Status.InternalServerError
            return ctx.response.body = {
                ErrMsg: 'Erreur changement de statut'
            }
        }
    }

    if(findsitevitr){
        try{
            await sitesVitr.updateOne({id: bodyVal.order_id}, {$set: {status: prod_json.status[2], modifiedAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}})
            ctx.response.status = Status.OK
            return ctx.response.body = {
                SuccMsg: 'Statut changé avec succès'
            }
        }catch(e){
            ctx.response.status = Status.InternalServerError
            return ctx.response.body = {
                ErrMsg: 'Erreur changement de statut'
            }
        }
    }

    if(findsiteecomm){
        try{
            await sitesEcom.updateOne({id: bodyVal.order_id}, {$set: {status: prod_json.status[2], modifiedAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}})
            ctx.response.status = Status.OK
            return ctx.response.body = {
                SuccMsg: 'Statut changé avec succès'
            }
        }catch(e){
            ctx.response.status = Status.InternalServerError
            return ctx.response.body = {
                ErrMsg: 'Erreur changement de statut'
            }
        }
    }

    if(findsitemesure){
        try{
            await sitesMesure.updateOne({id: bodyVal.order_id}, {$set: {status: prod_json.status[2], modifiedAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}})
            ctx.response.status = Status.OK
            return ctx.response.body = {
                SuccMsg: 'Statut changé avec succès'
            }
        }catch(e){
            ctx.response.status = Status.InternalServerError
            return ctx.response.body = {
                ErrMsg: 'Erreur changement de statut'
            }
        }
    }

})