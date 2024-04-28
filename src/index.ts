import { Elysia } from "elysia";
// setup
import setup from "./setup";
import { JWT } from "./setup";
// routes
import UserRoutes from './controllers/userController';

const app = new Elysia()
  .use(setup)
  .use(UserRoutes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
