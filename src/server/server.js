/** Created by hhj on 12/23/15. */
import express from 'express'
import path from 'path'
import render from './render'
import loadEnv from './loadEnv'

loadEnv()

const PORT = process.env.PORT || 3000

const app = express()

// add dev middleware to express in dev mode
if (process.env.NODE_ENV !== 'production') {
  require('./webpack.dev.js').default(app);
}

app.use('/', express.static('dist', { maxAge: '200d' }));
app.use('/favicon.ico', express.static('src/server/favicon.ico', { maxAge: '200d' }));

app.use('/', render)

app.listen(PORT, () => {
  console.log('Server listening on', PORT)
})

export default app
