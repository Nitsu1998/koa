import Koa from "koa";
import koaBody from "koa-body";
import router from "./routes/index.js";

const app = new Koa();

app.use(koaBody());

app.use(router.routes());

app.use((ctx) => {
  ctx.response.status = 404;
  ctx.body = {
    status: "Not found",
    message: "Route not found",
  };
});

app.listen(3000);
console.log("Server listening on port 3000");