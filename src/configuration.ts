
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
// 配置文件名
const Yaml_Config_FileName = 'config.yaml'
const filePath = join(__dirname,'../config',Yaml_Config_FileName)

export default  () => {
  return yaml.load(readFileSync(filePath, 'utf8'));
};

