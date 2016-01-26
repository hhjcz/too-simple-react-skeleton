/** Created by hhj on 1/26/16. */
export default function loadEnv(envFile) {
  let env = {}
  if (process.env.IS_BROWSER !== true) {
    const fs = require('fs')
    const nodeEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development'
    try {
      const envJson = JSON.parse(fs.readFileSync(envFile, 'utf8'))[nodeEnv]
      env = { ...envJson, ...process.env }
    } catch(e) {}
  } else {
    env = process.env
  }

  return env
}
