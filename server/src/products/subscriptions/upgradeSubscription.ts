// upgrade a subscription linked to a user

import { Router, Status } from '../../deps.ts'
import db from '../../database/connection.ts'
import { SubscriptionOrderSchema } from '../../database/interfaces.ts'
import { jwtDecode } from '../../auth/jwtDecode.ts'

export const upgradeSubscription = new Router()
upgradeSubscription.put('/api/upgrade-subscription', async (ctx) => {

        const token = ctx.request.headers.get('Authorization')
        const date = new Date()
        const body:any = await ctx.request.body()

        const subscriptions = db.collection<SubscriptionOrderSchema>("createSubscription")

})