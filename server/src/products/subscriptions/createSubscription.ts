// created a subscription linked to a user
// body vals (type, questDejaIdGraph, questSecteurActivite, questObjectiveCreation, instagram, facebook, instagram, linkedin, tiktok, linkInstagram, linkFacebook, linkLinkedin, linkTiktok, infoSuppl)

import { Router, Status, config } from '../../deps.ts'
import db from '../../database/connection.ts'
import { SubscriptionOrderSchema, UserSchema } from '../../database/interfaces.ts'
import { jwtDecode } from '../../auth/jwtDecode.ts'
import prod_json from '../prod_config.json' assert { type: "json" }

export const createSubscription = new Router()
createSubscription.post('/api/create-subscription', async (ctx) => {

        const token = ctx.request.headers.get('Authorization')
        const date = new Date()
        const body:any = await ctx.request.body()
        const bodyVal = await body.value
        

        const users = db.collection<UserSchema>("users")
        const subscriptions = db.collection<SubscriptionOrderSchema>("subscriptions")

        if(jwtDecode(token).role !== 'user'){
                ctx.response.status = Status.BadRequest
                return ctx.response.body = {
                        ErrMsg: 'Erreur'
                }
        }

		if(bodyVal.type === ''){
			ctx.response.status = Status.BadRequest
			return ctx.response.body = {
					ErrMsg: 'Erreur'
			}
		}
		
		if(!prod_json.subscriptions.includes(bodyVal.type)){
			ctx.response.status = Status.BadRequest
			return ctx.response.body = {
					ErrMsg: 'Erreur'
			}
		}

        const checkSub:any = await subscriptions.findOne({customerId: jwtDecode(token).id})
        
        if(checkSub && bodyVal.type !== 'audit'){
                ctx.response.status = Status.BadRequest
                return ctx.response.body = {
                        ErrMsg: 'Vous êtes déjà abonné'
                }
        }
        else{
            const new_id:string = crypto.randomUUID()

            await subscriptions.insertOne({
                    id: new_id,
                    customerId: jwtDecode(token).id,
                    price: 0,
                    type: bodyVal.type,
                    category: 'subscription',
                    questDejaIdGraph: bodyVal.questDejaIdGraph,
                    questSecteurActivite: bodyVal.questSecteurActivite,
                    questObjectiveCreation: bodyVal.questObjectiveCreation,
                    instagram: bodyVal.instagram,
                    facebook: bodyVal.facebook,
                    linkedin: bodyVal.linkedin,
                    tiktok: bodyVal.tiktok,
                    linkInstagram: bodyVal.linkInstagram,
                    linkFacebook: bodyVal.linkFacebook,
                    linkLinkedin: bodyVal.linkLinkedin,
                    linkTiktok: bodyVal.linkTiktok,
                    infoSuppl: bodyVal.infoSuppl,
                    createdAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
                    isActive: true,
                    expirationDate: '',
            }).then(async (doc) => {
    
                    if(bodyVal.type === 'audit'){
                        await users.updateOne({id: jwtDecode(token).id}, {$set: {auditId: new_id}}).then((doc) => {
                            ctx.response.status = Status.OK
                            return ctx.response.body = {
                                    SuccMsg: 'Commande envoyé avec succès'
                            }  
                        }).catch((_e) => {
                                ctx.response.status = Status.InternalServerError
                                return ctx.response.body = {
                                        ErrMsg: 'Erreur'
                                }  
                        })
                    }
                    else{
                        await users.updateOne({id: jwtDecode(token).id}, {$set: {subscriptionId: new_id}}).then((doc) => {
                            ctx.response.status = Status.OK
                            return ctx.response.body = {
                                    SuccMsg: 'Abonnement créé avec succès'
                            }  
                        }).catch((_e) => {
                                ctx.response.status = Status.InternalServerError
                                return ctx.response.body = {
                                        ErrMsg: 'Erreur'
                                }  
                        })
                    }
                    
            }).catch((_e) => {
                console.log(_e);
                
                    ctx.response.status = Status.InternalServerError
                    return ctx.response.body = {
                            ErrMsg: 'Erreur'
                    }  
            })
        }
})