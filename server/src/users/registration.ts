// register a user account
// takes body params "email" and "password"
// password sha256 + base64

import { Router, Status, sha256 } from '../deps.ts'
import db from '../database/connection.ts'
import { UserSchema } from '../database/interfaces.ts'
import { emailValidator } from '../emailValidator.ts'
import users_json from './users_config.json' assert { type: "json" }

export const registration = new Router()
registration.post('/api/registration', async (ctx) => {
    const users = db.collection<UserSchema>("users")
    const date = new Date()
    const body:any = await ctx.request.body({ type: 'json'})
    const bodyVal = await body.value

    if(!emailValidator(bodyVal.email)){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: `E-mail pas valide`
        }
    }

    const userEmailCheck = await users.findOne({email: bodyVal.email})

    if(userEmailCheck){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: `Le compte existe déjà, connectez-vous!`
        }
    }

    const new_id:string = crypto.randomUUID()

    const folderPath = `./media/user_${new_id}`
    const creaPath = `./media/user_${new_id}/creations`
    const assetsPath = `./media/user_${new_id}/assets`
    await Deno.mkdir(folderPath)
    await Deno.mkdir(creaPath)
    await Deno.mkdir(assetsPath)

    const hashedPwd = sha256(bodyVal.password, "utf8", "base64").toString()
    await users.insertOne({
        id: new_id,
        firstName: '',
        lastName: '',
        companyName: '',
        siret: '',
        tel: '',
        email: bodyVal.email,
        profile_image: users_json.default_avatar,
        banner: users_json.default_banner,
        password: hashedPwd,
        billing_addr: [], 
        website: '',
        createdAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
        lastLogin: ``,
        modifiedAt: ``,
        role: 'user',
        subscriptionId: '',
        idGraphicOrders: [],
        sitesVitrineOrders: [],
        sitesEcomOrders: [],
        sitesMesureOrders: [],
    }).then((_doc) => {
        ctx.response.status = Status.OK
        return ctx.response.body = {
            SuccMsg: `compte créé avec succès`
        }
    }).catch((_e) => {
        ctx.response.status = Status.InternalServerError
        return ctx.response.body = {
            ErrMsg: `Erreur de registration, réessayer plus tard`
        }
    })
})