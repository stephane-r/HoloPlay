const fs = require('fs');
const util = require('util');
const xml2js = require('xml2js');
const dotEnv = require('dotenv');

const parser = new xml2js.Parser();

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const parseString = util.promisify(parser.parseString);

const stringsXml = `${__dirname}/../packages/mobile/android/app/src/main/res/values/strings.xml`;

dotEnv.config();

/**
 * Read XML file
 *
 * @param {object} file
 * @returns
 */
async function readXmlFile(file) {
  const data = await readFile(file);
  const result = await parseString(data);
  return result;
}

/**
 * Write XML file
 *
 * @param {object} file
 * @param {object} data
 */
async function writeXmlFile(file, data) {
  const builder = new xml2js.Builder();
  const xml = builder.buildObject(data);

  await writeFile(file, xml);
}

/**
 * Upgrade config.xml file
 *
 * @returns {Function}
 */
async function upgradeStringsXml() {
  try {
    const data = await readXmlFile(stringsXml);
    const json = {
      ...data,
      resources: {
        ...data.resources,
        string: [
          ...data.resources.string,
          {
            _: process.env.CODE_PUSH_DEPLOY_KEY,
            $: {
              moduleConfig: 'true',
              name: 'reactNativeCodePush_androidDeploymentKey'
            }
          }
        ]
      }
    };

    await writeXmlFile(stringsXml, json);

    return console.log(`Successfully updated ${stringsXml}`);
  } catch (error) {
    console.log(error);
  }
}

try {
  upgradeStringsXml();
} catch (error) {
  console.log(error);
}
