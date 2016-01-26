/** Created by hhj on 1/26/16. */

/**
 * Loads and merges environment config to process.env from JSON file (defaults to env.json)
 * If variable already defined in process.env, it will not be overwritten
 *
 * @param envFile  JSON file with env config
 * @returns {{}}
 */
export default function loadEnv(envFile = 'env.json') {
  let env = {}
  const fs = require('fs')

  const nodeEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development'

  fs.exists(envFile, () => {
    const envJson = JSON.parse(fs.readFileSync(envFile, 'utf8'))[nodeEnv]
    env = { ...envJson, ...process.env }
  })

  process.env = { ...process.env, ...env }

  return env
}
