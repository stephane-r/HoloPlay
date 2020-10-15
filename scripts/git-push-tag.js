const shell = require('shelljs');

shell.exec(`npm version ${process.argv.slice(2)[0]}`);

const { version } = require('../package.json');

shell.exec(`git tag ${version}`);
shell.exec(`git push origin ${version}`);
shell.exec('git push origin develop');
shell.exec('echo New tag pushed.');
