//fetches all orders

import { Router, Status } from '../deps.ts'
import db from '../database/connection.ts'
import { IdGraphicOrderSchema, UserSchema, SiteEComSchema, SiteVitrineSchema, SiteMesureSchema } from '../database/interfaces.ts'
import { jwtDecode } from '../auth/jwtDecode.ts'
import prod_json from '../products/prod_config.json' assert { type: "json" }
    
export const fetchOrders = new Router()
fetchOrders.post('/api/get-orders', async (ctx) => {
    
    const token = ctx.request.headers.get('Authorization')
    
    const idGraph = db.collection<IdGraphicOrderSchema>("id_graphic")
    const sitesEcom = db.collection<SiteEComSchema>('sites_ecomm')
    const sitesVitr = db.collection<SiteVitrineSchema>('sites_vitrine')
    const sitesMesure = db.collection<SiteMesureSchema>('sites_mesure')
    const users = db.collection<UserSchema>("users")

    if(jwtDecode(token).role !== 'commercial'){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: 'Erreur'
        } 
    }

    const all:any = []

    try{
        await idGraph.find({}).forEach(async (product) => {
            await all.unshift({
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
        await sitesEcom.find({}).forEach(async (product) => {
            await all.unshift({
                type: 'site e-commerce',
                id: product.id,
                clientId: product.customerId,
                createdAt: product.createdAt,
                oldSiteUrl: product.oldSiteUrl,
                newSiteUrl: product.newSiteUrl,
                questDejaSite: product.questDejaSite,
                questSecteurActivite: product.questSecteurActivite,
                questObjectiveSite: product.questObjectiveSite,
                questPossedezIdGraph: product.questPossedezIdGraph,
                questNumCategories: product.questNumCategories,
                questNumProducts: product.questNumProducts,
                newMoreInfo: product.newMoreInfo,
                status: product.status,
            })
        })
        await sitesVitr.find({}).forEach(async (product) => {
            await all.unshift({
                type: 'site vitrine',
                id: product.id,
                clientId: product.customerId,
                createdAt: product.createdAt,
                oldSiteUrl: product.oldSiteUrl,
                newSiteUrl: product.newSiteUrl,
                questDejaSite: product.questDejaSite,
                questSecteurActivite: product.questSecteurActivite,
                questObjectiveSite: product.questObjectiveSite,
                questPossedezIdGraph: product.questPossedezIdGraph,
                questNumPages: product.questNumPages,
                newMoreInfo: product.newMoreInfo,
                status: product.status,
            })
        })
        await sitesMesure.find({}).forEach(async (product) => {
            await all.unshift({
                type: 'site sur mesure',
                id: product.id,
                clientId: product.customerId,
                createdAt: product.createdAt,
                newSiteUrl: product.newSiteUrl,
                questDejaSite: product.questDejaSite,
                questSecteurActivite: product.questSecteurActivite,
                questObjectiveSite: product.questObjectiveSite,
                questNumUsers: product.questNumUsers,
                newMoreInfo: product.newMoreInfo,
                status: product.status,
            })
        })

        const toContact:Array<object> = await all.filter((element:any) => element.status === prod_json.status[0]) //prod_json.status[0]
        const inProgress:Array<object> = await all.filter((element:any) => element.status === prod_json.status[1]) //prod_json.status[1]
        const sentProposition:Array<object> = await all.filter((element:any) => element.status === prod_json.status[2]) //prod_json.status[2]
        const signedProposition:Array<object> = await all.filter((element:any) => element.status === prod_json.status[3]) //prod_json.status[3]
        const completed:Array<object> = await all.filter((element:any) => element.status === prod_json.status[4]) //prod_json.status[4]

        ctx.response.status = Status.OK
        return ctx.response.body = {
            toContact: toContact,
            inProgress: inProgress,
            sentProposition: sentProposition,
            signedProposition: signedProposition,
            completed: completed,
        }
    }catch(_e){
        ctx.response.status = Status.InternalServerError
        return ctx.response.body = {
            ErrMsg: 'Erreur'
        }
    }
})