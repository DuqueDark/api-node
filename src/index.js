const http = require("http");
const PORT = 5000;
const DEFAULT_HEADER = { "Content-Type": "application/json" };

const HeroFactory = require("./factories/hero_factory");
const heroService = HeroFactory.generateInstance();

const Hero = require("./model/hero");

const routes = {
  "/heroes:get": async (request, response) => {
    try {

      const { id } = request.queryString;
      const heroes = await heroService.find(id);
      response.write(JSON.stringify(heroes));
      response.end();

    } catch (err) {
      handlerErr(response)(err);
    }
  },

  "/heroes:post": async (request, response) => {
    for await (const data of request) {
      try {

        const item = JSON.parse(data);
        const hero = new Hero(item);
        const { err, valid } = hero.isValid();

        if (!valid) {
          response.writeHead(400, DEFAULT_HEADER);
          response.write(JSON.stringify({ error: err.join(", ") }));
          response.end();
        }

        const id = await heroService.create(hero);
        response.writeHead(201, DEFAULT_HEADER);
        response.write(
          JSON.stringify({ success: "User created with success", id })
        );

        response.end();
      } catch (err) {
        handlerErr(response)(err);
      }
    }
  },

  default: (request, response) => {
    response.write("Hello!");
    response.end();
  },
};

const handlerErr = (response) => {
  return (err) => {
    console.log("deu ruim!!!");
    response.writeHead(500, DEFAULT_HEADER);
    response.write(JSON.stringify({ error: "Internal Server Error" }));
    response.end();
  };
};

const handler = (request, response) => {
  const { url, method } = request;
  const [first, route, id] = url.split("/");
  
  request.queryString = { id: isNaN(id) ? id : Number(id) };
  const key = `/${route}:${method.toLowerCase()}`;
  response.writeHead(200, DEFAULT_HEADER);

  const chosen = routes[key] || routes.default;

  return chosen(request, response).catch(handlerErr(response));
};

http.createServer(handler).listen(PORT, () => {
  console.log("Server runing at !!", PORT);
});
