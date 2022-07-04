const { readFile, writeFile } = require("fs/promises");
class HeroRepository {
  constructor({ file }) {
    this.file = file;
  }
  async _currentFileContent() {
    return JSON.parse(await readFile(this.file));
  }
  async find(itemId) {
    const all = await this._currentFileContent();

    if (!itemId) return all;
    
    return all.find(({ id }) => itemId === id);
  }
  async create(data) {
    const currentFile = await this._currentFileContent();
    currentFile.push(data);

    await writeFile(this.file, JSON.stringify(currentFile));

    return data.id;
  }
}
module.exports = HeroRepository;
/*
const hero = new HeroRepository({
  file: "./../../database/data.json",
});
hero
  .create({ id: 2, name: "chapolin", age: 40, power: "ser incrivel" })
  .then(console.log)
  .catch((err) => console.log(err));
*/
