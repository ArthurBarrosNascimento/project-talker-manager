const fs = require('fs').promises;

const talkers = async () => JSON.parse(await fs.readFile('src/talker.json', { encoding: 'utf-8' }));

module.exports = talkers;
