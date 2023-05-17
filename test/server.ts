import path from "path";
import fs from "fs";
import jsonServer from "json-server";

const server = jsonServer.create();
const routes = {
  messages: {},
};

const dbJsonFilePath = path.join(__dirname, "data.json");
console.log(dbJsonFilePath)
fs.writeFileSync(dbJsonFilePath, JSON.stringify(routes), {});
const router = jsonServer.router(dbJsonFilePath);
const middlewares = jsonServer.defaults({
	noCors: false,
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

server.get("/api/test", (_: any, res: any) => {
  res.status(200).send("Ok");
});

// Use default router
server.use(router);

export default server
