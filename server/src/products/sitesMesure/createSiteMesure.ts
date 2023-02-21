// created site mesure linked to a user

import { Router, Status } from '../../deps.ts'
import db from '../../database/connection.ts'
import { SiteMesureSchema, UserSchema } from '../../database/interfaces.ts'
import { jwtDecode } from '../../auth/jwtDecode.ts'
import prod_json from '../prod_config.json' assert { type: "json" }

export const createSiteMesure = new Router()
createSiteMesure.post('/api/create-site-mesure', async (ctx) => {

    const token = ctx.request.headers.get('Authorization')
    const date = new Date()
    const body:any = await ctx.request.body()
    const bodyVal = await body.value

    const sitesMesure = db.collection<SiteMesureSchema>("sites_mesure")

    const users = db.collection<UserSchema>('users')

	const prod_id:any = crypto.randomUUID()
    
    await sitesMesure.insertOne({
        id: prod_id,
        customerId: jwtDecode(token).id,
        category: 'sites',
        createdAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
        newSiteUrl: bodyVal.newSiteUrl,
        questDejaSite: bodyVal.questDejaSite,
        questSecteurActivite: bodyVal.questSecteurActivite,
        questObjectiveSite: bodyVal.questObjectiveSite,
        questNumUsers: bodyVal.questNumUsers,
        newMoreInfo: bodyVal.newMoreInfo,
        status: prod_json.status[0],
    }).then(async (doc) => {
		await users.updateOne({id: jwtDecode(token).id}, {$push: {sitesMesureOrders: prod_id}}).then((doc) => {
			ctx.response.status = Status.OK
			return ctx.response.body = {
				SuccMsg: 'Données envoyées avec succès'
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