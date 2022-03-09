const { default: genTypeSchema, jsonschemaToJson } = require('../dist/index');
const path = require('path');

const file = path.resolve(__dirname, './types.ts');

genTypeSchema.genJsonDataFormFile(file);
const json = genTypeSchema.genJsonData();

const jsonschema = genTypeSchema.getJsonSchema(file,'Role')

// const json = jsonschemaToJson(jsonschema);

// console.log('//////////////',JSON.stringify(json,null,2))
console.log('-------', JSON.stringify(jsonschema, null, 2));
