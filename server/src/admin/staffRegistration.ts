// register a staff account
// takes body params "email", "password" and "role"
// password sha256 + base64
// checks if the body "role" exists into the admin_config.json file

import { Router, Status, sha256 } from '../deps.ts'
import db from '../database/connection.ts'
import { UserSchema } from '../database/interfaces.ts'
import { emailValidator } from '../emailValidator.ts'
import { jwtDecode } from '../auth/jwtDecode.ts'
import admin_json from './admin_config.json' assert { type: "json" }
import users_json from '../users/users_config.json' assert { type: "json" }

export const staffRegistration = new Router()
staffRegistration.post('/api/staff-registration', async (ctx) => {

    const token:any = ctx.request.headers.get("Authorization")
    if(jwtDecode(token).role !== 'admin') return ctx.response.status = Status.Unauthorized
    
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

    if(!admin_json.roles.includes(bodyVal.role)) return ctx.response.status = Status.BadRequest

    const userEmailCheck = await users.findOne({email: bodyVal.email})

    if(userEmailCheck){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: `Le compte existe déjà, connectez-vous!`
        }
    }

    const new_id:string = crypto.randomUUID()

    const folderPath = `./media/user_${new_id}`
    await Deno.mkdir(folderPath)

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
        role: `${bodyVal.role}`,
        public: false,
        subscriptionId: '',
        auditId: '',
        idGraphicOrders: [],
        sitesVitrineOrders: [],
        sitesEcomOrders: [],
        sitesMesureOrders: [],
    }).then((doc) => {
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