import { config, sha256 } from '../deps.ts'
import db from '../database/connection.ts'
import { UserSchema } from '../database/interfaces.ts'
import users_json from '../users/users_config.json' assert { type: "json" }

export const adminCheck = async () => {
    try{
        if(!config().ADMIN_USR || !config().ADMIN_PWD || config().ADMIN_USR === '' || config().ADMIN_PWD === '') {
            console.log(`admin USR or PWD not set`)
            return
        }
``        
        const users = db.collection<UserSchema>("users")
        const adminCheck = await users.findOne({role: 'admin'})
        
        if(adminCheck === undefined) {
            const date = new Date()

            const hashedPwd = sha256(config().ADMIN_PWD, "utf8", "base64").toString()
            
                
            await users.insertOne({
                id: crypto.randomUUID(),
                firstName: '',
                lastName: '',
                companyName: '',
                siret: '',
                tel: '',
                email: config().ADMIN_USR,
                profile_image: users_json.default_avatar,
                banner: users_json.default_banner,
                password: hashedPwd,
                billing_addr: [],  
                website: '',
                createdAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
                lastLogin: ``,
                modifiedAt: ``,
                role: 'admin',
                public: false,
                subscriptionId: '',
                auditId: '',
                idGraphicOrders: [],
                sitesVitrineOrders: [],
                sitesEcomOrders: [],
                sitesMesureOrders: [],
            })
            console.log(`admin ${config().ADMIN_USR} created`)
            return
        }
        else{
            console.log("admin exists")
            return
        }
    }catch(_e){
        console.log(_e)
        return
    }
}