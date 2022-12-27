//sets status of order as "signed"

import { Router, Status } from '../deps.ts'
import db from '../database/connection.ts'
import { IdGraphicOrderSchema, UserSchema } from '../database/interfaces.ts'
import { jwtDecode } from '../auth/jwtDecode.ts'
import prod_json from '../products/prod_config.json' assert { type: "json" }
    
export const propositionSigned = new Router()
propositionSigned.post('/api/proposition-signed', async (ctx) => {
    
    const token = ctx.request.headers.get('Authorization')
    const date = new Date()
    const body:any = await ctx.request.body()
    const bodyVal = await body.value.read()
    
    const idGraph = db.collection<IdGraphicOrderSchema>("id_graphic")
    const users = db.collection<UserSchema>("users")

})