/** Created by hhj on 8/23/16. */
const path = require('path');

const BASE_DIR = path.resolve('.')
const NODE_MODULES_DIR = path.join(BASE_DIR, 'node_modules')

module.exports = {
  BASE_DIR,
  NODE_MODULES_DIR
}
