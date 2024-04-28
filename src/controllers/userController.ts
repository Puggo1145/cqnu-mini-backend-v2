import { Elysia } from "elysia";
import { JWT } from "../setup";
// DTO
import { SignUpDTO } from "../db/DTO/user";
// db
import { db } from "../libs/connectToDB";
import { users } from "../db/schema/users";
// types
import type { NewUser } from "../db/schema/users";

class Service {
    async createUser(user: NewUser) {
        console.log(user);

        const newUser = await db.insert(users).values(user);

        return newUser;
    }
}

const UserRoutes = new Elysia({ prefix: "/user" })
    .decorate({
        Service: new Service()
    })
    .use(JWT)
    .post("/", async ({ Service, body, jwt, cookie: { auth } }) => {
        await Service.createUser(body as NewUser);
        
        // 签发 jwt
        const token = await jwt.sign({ "name": body.username });
        auth.set({
            value: token,
            httpOnly: true,
        })

        return {
            ok: true,
        };
    }, {
        body: SignUpDTO,
    })

export default UserRoutes;