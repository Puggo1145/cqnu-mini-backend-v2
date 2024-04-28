import { Elysia } from "elysia";
import { db } from "./libs/connectToDB";
import jwt from "@elysiajs/jwt";

const DB = new Elysia({
    name: 'database',
})
    .decorate('db', db)

export const JWT = new Elysia({
    name: 'jwt',
})
    .use(jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET!,
        exp: "7d"
    }));

const errorHandle = new Elysia({
    name: 'errorHandle',
})
    .onError(({ code, error }) => {
        return new Response(JSON.stringify({
            code, error
        }))
    })

const encoder = new TextEncoder();
const resposne = new Elysia({
    name: 'standard_response',
})
    .mapResponse(({ response, set }) => {
        const isJson = typeof response === 'object'

        const text = isJson
            ? JSON.stringify(response)
            : response?.toString() ?? ''

        set.headers["Content-Encoding"] = "gzip";

        return new Response(
            Bun.gzipSync(encoder.encode(text)),
            {
                headers: {
                    "Content-Type": isJson
                        ? "application/json"
                        : "text/plain"
                }
            }
        )
    })

const setup = new Elysia()
    .use(DB)
    .use(JWT)
    .use(resposne)
    .use(errorHandle)

export default setup;