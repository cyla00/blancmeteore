import { Router, Status, send } from './deps.ts'

export const vuejsRouter = new Router()
vuejsRouter.get("/(.*)", async (ctx:any, next) => {
    await send(ctx, 'index.html', {
        root: "./dist",
    })
    return next() 
})