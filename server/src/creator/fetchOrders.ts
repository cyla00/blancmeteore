//fetches all orders

import { Router, Status } from '../deps.ts'
import db from '../database/connection.ts'
import { IdGraphicOrderSchema, SubscriptionOrderSchema } from '../database/interfaces.ts'
import { jwtDecode } from '../auth/jwtDecode.ts'
import prod_json from '../products/prod_config.json' assert { type: "json" }
    
export const fetchCreaOrders = new Router()
fetchCreaOrders.post('/api/get-creator-orders', async (ctx) => {
    
    const token = ctx.request.headers.get('Authorization')
    
    const idGraph = db.collection<IdGraphicOrderSchema>("id_graphic")
    const subscriptions = db.collection<SubscriptionOrderSchema>("subscriptions")

    if(jwtDecode(token).role !== 'creator'){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: 'Erreur'
        }
    }

    const orders:any = []
    const subs:any = []

    try{
        await idGraph.find({status: prod_json.status[3]}).forEach(async (product) => {
            await orders.unshift({
                type: 'identite graphique',
                id: product.id,
                clientId: product.customerId,
                createdAt: product.createdAt,
                newLogo: product.newLogo,
                newCarteVisite: product.newCarteVisite,
                newFlyer: product.newFlyer,
                newDeplyant: product.newDeplyant,
                newDeclinaisonResaux: product.newDeclinaisonResaux,
                newIdGraphComplete: product.newIdGraphComplete,
                newMoreInfo: product.newMoreInfo,
                questDejaIdGraph: product.questDejaIdGraph,
                questSecteurActivite: product.questSecteurActivite,
                questObjectiveCreation: product.questObjectiveCreation,
                status: product.status,
            })
        })

        await subscriptions.find({}).forEach(async (sub) => {
                
            await subs.unshift({
                type: sub.type,
                id: sub.id,
                customerId: sub.customerId,
                price: sub.price,
                category: sub.category,
                questDejaIdGraph: sub.questDejaIdGraph,
                questSecteurActivite: sub.questSecteurActivite,
                questObjectiveCreation: sub.questObjectiveCreation,
                instagram: sub.instagram,
                facebook: sub.facebook,
                linkedin: sub.linkedin,
                tiktok: sub.tiktok,
                linkInstagram: sub.linkInstagram,
                linkFacebook: sub.linkFacebook,
                linkLinkedin: sub.linkLinkedin,
                linkTiktok: sub.linkTiktok,
                infoSuppl: sub.infoSuppl,
                createdAt: sub.createdAt,
                isActive: sub.isActive,
                expirationDate: sub.expirationDate,
            })
        })
        ctx.response.status = Status.OK
        return ctx.response.body = {
            orders,
            subs,
        }
    }catch(_e){
        ctx.response.status = Status.InternalServerError
        return ctx.response.body = {
            ErrMsg: 'Erreur'
        }
    }
})