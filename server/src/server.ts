// deno run --allow-net --allow-env --allow-read --watch ./src/database/seed.ts FOR DATABASE SEED
// deno run --allow-net --allow-read --allow-write --allow-sys --watch ./src/server.ts TO RUN SERVER
import { Application, config, send, Status } from './deps.ts'
import { jwtMiddleware } from './auth/jwt.ts'
import os from "https://deno.land/x/dos@v0.11.0/mod.ts"
import { oakCors } from './deps.ts'

// routers
import { login } from './users/login.ts' // login
import { passwordChange } from './users/passwordChange.ts' // change user passwords
import { jwtCheck } from './auth/jwtCheck.ts'
// admin routes
import { adminCheck } from './admin/adminCheck.ts' // admin db check + creation if not exist else skip
import { listStaff } from './admin/listStaff.ts'
import { staffRegistration } from './admin/staffRegistration.ts'
// user routes
import { registration } from './users/registration.ts'
import { userModify } from './users/userModify.ts'
import { userDelete } from './users/userDelete.ts'
import { avatarAdd } from './users/avatarAdd.ts'
import { bannerAdd } from './users/bannerAdd.ts'
import { billingAddrAdd } from './users/billingAddrAdd.ts'
import { billingAddrDelete } from './users/billingAddrDelete.ts'

// product routes
import { createIdGrpah } from './products/idGraph/createIdGraph.ts'
import { deleteIdGrpah } from './products/idGraph/deleteIdGraph.ts'

import { createSubscription } from './products/subscriptions/createSubscription.ts'
import { deleteSubscription } from './products/subscriptions/deleteSubscription.ts'
import { upgradeSubscription } from './products/subscriptions/upgradeSubscription.ts'

import { createSiteVitrine } from './products/sitesVitrine/createSiteVitr.ts'
import { deleteSiteVitrine } from './products/sitesVitrine/deleteSiteVitrine.ts'

import { createSiteEcomm } from './products/sitesEcommerce/createSiteEcom.ts'
import { deleteSiteEcomm } from './products/sitesEcommerce/deleteSiteEcom.ts'

import { createSiteMesure } from './products/sitesMesure/createSiteMesure.ts'
import { deleteSiteMesure } from './products/sitesMesure/deleteSitesMesure.ts'
 

const app = new Application()

//static files
const root = './media'
app.use(async (ctx, next) => {
    const path = ctx.request.url.pathname
    try{
        await send(ctx, path, {
            root: root,
        })
        return next()
    }catch(e){
        ctx.response.status = Status.BadGateway
        return next()
    }
})

app.use(oakCors()) // enables cors
adminCheck() // admin db check + creation if not exist, else skip


// open routes
app.use(registration.routes(), registration.allowedMethods()) // user role registration
app.use(login.routes(), login.allowedMethods()) // login

//protected routes by jwt verification middleware + jwt check
app.use(jwtMiddleware)

app.use(jwtCheck.routes(), jwtCheck.allowedMethods())
app.use(staffRegistration.routes(), staffRegistration.allowedMethods()) // registers staff users (creator & commercial)
app.use(userModify.routes(), userModify.allowedMethods()) // modifies any role account
app.use(userDelete.routes(), userDelete.allowedMethods()) // deletes users
app.use(passwordChange.routes(), passwordChange.allowedMethods()) // modify password (roles: all)
app.use(listStaff.routes(), listStaff.allowedMethods()) // gets all staff members from db (roles: admin)
app.use(avatarAdd.routes(), avatarAdd.allowedMethods()) // changes profile avatar image
app.use(bannerAdd.routes(), bannerAdd.allowedMethods()) // changes profile banner image
app.use(billingAddrAdd.routes(), billingAddrAdd.allowedMethods()) // add a user billing address
app.use(billingAddrDelete.routes(), billingAddrDelete.allowedMethods()) // delete a user billing address

// product routes
app.use(createIdGrpah.routes(), createIdGrpah.allowedMethods()) // created a graphic id order
app.use(deleteIdGrpah.routes(), deleteIdGrpah.allowedMethods()) // deletes the graph order and removes order_id from user

app.use(createSubscription.routes(), createSubscription.allowedMethods()) // created subscription order
app.use(deleteSubscription.routes(), deleteSubscription.allowedMethods()) // delete subscription
app.use(upgradeSubscription.routes(), upgradeSubscription.allowedMethods()) // upgrade subscription

app.use(createSiteVitrine.routes(), createSiteVitrine.allowedMethods()) // creates site vitrine order
app.use(deleteSiteVitrine.routes(), deleteSiteVitrine.allowedMethods()) // deletes site vitrine order and removes order_id from user

app.use(createSiteEcomm.routes(), createSiteEcomm.allowedMethods()) // creates ecomm site order
app.use(deleteSiteEcomm.routes(), deleteSiteEcomm.allowedMethods()) // deletes ecomm site order and removes order_id from user

app.use(createSiteMesure.routes(), createSiteMesure.allowedMethods()) // creates sites mesure order
app.use(deleteSiteMesure.routes(), deleteSiteMesure.allowedMethods()) // deletes site mesure order and removes order_id from user


if(config().STATUS === 'production'){
    // serve /dist/index.html static file
}

console.log(`http://${os.hostname()}:${config().SERVER_PORT}`)
await app.listen({port: Number(config().SERVER_PORT)})