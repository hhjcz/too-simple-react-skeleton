/** Created by hhj on 1/26/16. */

/**
 * Loads and merges environment config to process.env from JSON file (defaults to env.json)
 * If variable already defined in process.env, it will not be overwritten
 *
 * @param envFile JSON file with env config
 * @param envJson Directly pass environment variables (for testing purposes mainly)
 * @returns {{}}
 */
export default function loadEnv(envFile = 'env.json', envJson = null) {
  let env = {}
  const fs = require('fs')

  const nodeEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development'

  if (!envJson && fs.existsSync(envFile)) {
    envJson = JSON.parse(fs.readFileSync(envFile, 'utf8'))[nodeEnv]
  }

  Object.keys(envJson || {}).forEach((key) => {
    env[key] = process.env[key] || envJson[key]
  })

  process.env = { ...process.env, ...env }

  return env
}
