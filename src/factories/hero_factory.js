const HeroRepository = require("./../resource/hero_repository");
const HeroService = require("./../service/hero_services");

const { join } = require("path");
const filename = join(__dirname, "../../database", "data.json");

const generateInstance = () => {
  const heroService = new HeroService({
    heroRepository: new HeroRepository({
      file: filename,
    }),
  });

  return heroService;
};
module.exports = { generateInstance };

//generateInstance().find().then(console.log)
