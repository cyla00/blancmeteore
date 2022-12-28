// created a graphic id product linked to a user
// body params (
    // newLogo, newCarteVisite, newFlyer, newDeplyant, 
    // newDeclinaisonResaux, newIdGraphComplete, newMoreInfo,
    // questDejaIdGraph, questSecteurActivite, questObjectiveCreation, oldlogo(image file)
    // )

import { Router, Status } from '../../deps.ts'
import db from '../../database/connection.ts'
import { IdGraphicOrderSchema, UserSchema } from '../../database/interfaces.ts'
import { jwtDecode } from '../../auth/jwtDecode.ts'
import prod_json from '../prod_config.json' assert { type: "json" }

export const createIdGrpah = new Router()
createIdGrpah.post('/api/create-id-graphic', async (ctx) => {

        const token = ctx.request.headers.get('Authorization')
        const date = new Date()
        const body:any = await ctx.request.body()
        const bodyVal = await body.value.read()

        const idGraph = db.collection<IdGraphicOrderSchema>("id_graphic")
        const users = db.collection<UserSchema>("users")

        let oldLogo:string = ''
        if(bodyVal.files){
            try{
                await Deno.rename(bodyVal.files[0].filename, `./media/user_${jwtDecode(token).id}/assets/${bodyVal.files[0].originalName}`)
                oldLogo = `/user_${jwtDecode(token).id}/assets/${bodyVal.files[0].originalName}`
            }
            catch(e){
                console.log(e)
                ctx.response.status = Status.InternalServerError
                return ctx.response.body = {
                    ErrMsg: 'Erreur'
                }
            }
        }

        if(bodyVal.fields.newLogo === 'true') bodyVal.fields.newLogo = true
        if(bodyVal.fields.newLogo === 'false') bodyVal.fields.newLogo = false

        if(bodyVal.fields.newCarteVisite === 'true') bodyVal.fields.newCarteVisite = true
        if(bodyVal.fields.newCarteVisite === 'false') bodyVal.fields.newCarteVisite = false

        if(bodyVal.fields.newFlyer === 'true') bodyVal.fields.newFlyer = true
        if(bodyVal.fields.newFlyer === 'false') bodyVal.fields.newFlyer = false

        if(bodyVal.fields.newDeplyant === 'true') bodyVal.fields.newDeplyant = true
        if(bodyVal.fields.newDeplyant === 'false') bodyVal.fields.newDeplyant = false

        if(bodyVal.fields.newDeclinaisonResaux === 'true') bodyVal.fields.newDeclinaisonResaux = true
        if(bodyVal.fields.newDeclinaisonResaux === 'false') bodyVal.fields.newDeclinaisonResaux = false

        if(bodyVal.fields.newIdGraphComplete === 'true') bodyVal.fields.newIdGraphComplete = true
        if(bodyVal.fields.newIdGraphComplete === 'false') bodyVal.fields.newIdGraphComplete = false

        if(bodyVal.fields.questDejaIdGraph === 'true') bodyVal.fields.questDejaIdGraph = true
        if(bodyVal.fields.questDejaIdGraph === 'false') bodyVal.fields.questDejaIdGraph = false

        const prod_id:any = crypto.randomUUID()
        
        await idGraph.insertOne({
            id: prod_id,
            customerId: jwtDecode(token).id,
            createdAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
            oldLogoDir: oldLogo,
            newLogo: bodyVal.fields.newLogo,
            newCarteVisite: bodyVal.fields.newCarteVisite,
            newFlyer: bodyVal.fields.newFlyer,
            newDeplyant: bodyVal.fields.newDeplyant,
            newDeclinaisonResaux: bodyVal.fields.newDeclinaisonResaux,
            newIdGraphComplete: bodyVal.fields.newIdGraphComplete,
            newMoreInfo: bodyVal.fields.newMoreInfo,
            questDejaIdGraph: bodyVal.fields.questDejaIdGraph,
            questSecteurActivite: bodyVal.fields.questSecteurActivite,
            questObjectiveCreation: bodyVal.fields.questObjectiveCreation,
            status: prod_json.status[0],
        }).then(async (_doc) => {
            await users.updateOne({id: jwtDecode(token).id}, {$push: {idGraphicOrders: prod_id}}).then((doc) => {
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