// delete a subscription linked to a user
// takes body (subscription_id)

import { Router, Status } from '../../deps.ts'
import db from '../../database/connection.ts'
import { SubscriptionOrderSchema, UserSchema } from '../../database/interfaces.ts'
import { jwtDecode } from '../../auth/jwtDecode.ts'

export const deleteSubscription = new Router()
deleteSubscription.delete('/api/delete-subscription', async (ctx) => {

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

        const checkSub = await users.findOne({id: jwtDecode(token).id, subscriptionId: bodyVal.subscription_id})
        
        if(!checkSub){
            ctx.response.status = Status.BadRequest
            return ctx.response.body = {
                    ErrMsg: 'Erreur'
            }
        }

        await subscriptions.deleteOne({id: bodyVal.subscription_id}).then(async (doc) => {
			await users.updateOne({id: jwtDecode(token).id}, {$set: {subscriptionId: ""}}).then((doc) => {
				ctx.response.status = Status.OK
				return ctx.response.body = {
						SuccMsg: 'Supprimé avec succès'
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