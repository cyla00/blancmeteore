// deno run --allow-net --allow-env --allow-read --watch ./src/database/seed.ts FOR DATABASE SEED
// deno run --allow-net --allow-read --allow-write --allow-sys --watch ./src/server.ts TO RUN SERVER
// deno compile --allow-net --allow-read --allow-write --allow-sys ./src/server.ts COMPILE TO EXECUTABLE

import { Application, config, send, Status } from './deps.ts'
import { jwtMiddleware } from './auth/jwt.ts'
import os from "https://deno.land/x/dos@v0.11.0/mod.ts"
import staticFiles from "https://deno.land/x/static_files@1.1.6/mod.ts"
import { oakCors } from './deps.ts'

import { vuejsRouter } from './vuejsRouter.ts'

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

//commercial routes
import { orderCompleted } from './commercial/orderCompleted.ts'
import { fetchOrders } from './commercial/fetchOrders.ts'
import { propositionSent } from './commercial/propositionSent.ts'
import { propositionSigned } from './commercial/propositionSigned.ts'
import { orderInProgress } from './commercial/orderInProgress.ts'
import { fetchUser } from './commercial/fetchUsers.ts'

//creator routes
import { fetchCreaOrders } from './creator/fetchOrders.ts'
import { sendMedia } from './creator/SendMedia.ts'
import { downloadCreations } from './users/downloadCreations.ts'
 

const app = new Application()
app.use(oakCors()) // enables cors

//static files
const root = './media'
app.use(async (ctx, next) => {
    const path = ctx.request.url.pathname
    try{
        await send(ctx, path, {
            root: '/',
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

//commercial routes
app.use(orderCompleted.routes(), orderCompleted.allowedMethods()) // set order status completed
app.use(fetchOrders.routes(), fetchOrders.allowedMethods()) // fetches all order
app.use(propositionSent.routes(), propositionSent.allowedMethods()) // set order status "proposition sent"
app.use(propositionSigned.routes(), propositionSigned.allowedMethods()) // set order status "proposition signed"
app.use(orderInProgress.routes(), orderInProgress.allowedMethods()) // set order status "in progress"
app.use(fetchUser.routes(), fetchUser.allowedMethods()) // gets user info

//creator routes
app.use(fetchCreaOrders.routes(), fetchCreaOrders.allowedMethods()) // gets all orders with status "signed"
app.use(sendMedia.routes(), sendMedia.allowedMethods()) // sends zip to user dir
app.use(downloadCreations.routes(), downloadCreations.allowedMethods()) //user downloads zip folder



if(config().STATUS === 'production'){   
    app.use(staticFiles(`${Deno.cwd()}/dist`))
    app.use(vuejsRouter.routes(), vuejsRouter.allowedMethods())
}

console.log(`http://${os.hostname()}:${config().SERVER_PORT}`)
await app.listen({port: Number(config().SERVER_PORT)})
