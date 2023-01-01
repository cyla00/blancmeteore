// download creation route

import { Router, Status } from '../deps.ts'
import { jwtDecode } from '../auth/jwtDecode.ts'
    
export const downloadCreations = new Router()
downloadCreations.post(`/api/download/:id`, async (ctx) => {
    
    const token = ctx.request.headers.get('Authorization')
    const url_id = ctx.params.id

    if(jwtDecode(token).id !== url_id){
        ctx.response.status = Status.BadRequest
        return ctx.response.body = {
            ErrMsg: 'Erreur'
        }
    }
    try{
        const filePath = `${Deno.cwd()}/media/user_${jwtDecode(token).id}/creations/creations.zip`
        ctx.response.headers.set("Content-Type", "application/zip");
        ctx.response.headers.set("Content-Disposition", `attachment; filename="creations.zip"`)
        ctx.response.body = await Deno.open(filePath)
        ctx.response.status = Status.OK
    }catch(_e){
        ctx.response.status = Status.InternalServerError
        return ctx.response.body = {
            ErrMsg: 'Erreur'
        }
    }
    
})