// modify all roles account
// takes body params (id, firstName, lastName, companyName, siret, tel, email)
// obligatory body params are (id, email), id can be taken from admin dash or user jwt
// checks if the new meail exists on a different account, return error if does


import { Router, Status } from '../deps.ts'
import db from '../database/connection.ts'
import { UserSchema } from '../database/interfaces.ts'
import { emailValidator } from '../emailValidator.ts'

export const userModify = new Router()
userModify.put('/api/user-modify', async (ctx) => {
    const users = db.collection<UserSchema>("users")
    const date = new Date()
    const body:any = await ctx.request.body({ type: 'json'})
    const bodyVal = await body.value

    if(bodyVal.id === ''){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: `Erreur`
        }
    }

    if(bodyVal.email === ''){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: `Inserer une Email valide`
        }
    }

    if(!emailValidator(bodyVal.email)){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: `Email pas valide`
        }
    }
    const idCheck = await users.findOne({id: bodyVal.id})
    if(!idCheck){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: `Le compte que vous souhaitez modifier n'existe pas`
        }
    }

    const userEmailCheck = await users.findOne({email: bodyVal.email})

    if(userEmailCheck && userEmailCheck.id !== bodyVal.id){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: `Un compte avec cette email existe déjà`
        }
    }

    await users.updateOne({id: bodyVal.id}, {$set: {
        firstName: bodyVal.firstName, 
        lastName: bodyVal.lastName,
        companyName: bodyVal.companyName, 
        siret: bodyVal.siret, 
        tel: bodyVal.tel, 
        email: bodyVal.email,
        modifiedAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    }}).then((_doc) => {
        ctx.response.status = Status.OK
        return ctx.response.body = {
            SuccMsg: `compte modifié avec succès`
        }
    }).catch((_e) => {
        ctx.response.status = Status.InternalServerError
        return ctx.response.body = {
            ErrMsg: `Erreur de modification, réessayer plus tard`
        }
    })
})