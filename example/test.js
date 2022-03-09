const { default: genTypeSchema } = require('typescript-to-jsonschema');
const path = require('path');

// 目标文件
const file = path.resolve(__dirname, './type.ts');

// 生成数据
genTypeSchema.genJsonDataFormFile(file);

// 获得当前文件对应的所有jsonschema数据
const json = genTypeSchema.genJsonData();

// 获得具体的某个type的jsonschema数据
const jsonSchema = genTypeSchema.getJsonSchema(file, 'ITest');

// 返回结果
console.log(jsonSchema); 