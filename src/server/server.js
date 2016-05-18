/** Created by hhj on 12/23/15. */
import express from 'express'
import compression from 'compression'
import render from './render'

// for example heroku.com sets env.PORT
const PORT = process.env.PORT || 8080

const app = express()

app.use(compression());

// add dev middleware to express in dev mode
if (process.env.NODE_ENV !== 'production') {
  require('./webpack.dev.js').default(app);
}

app.use('/', express.static('dist', { maxAge: '200d' }));
app.use('/favicon.ico', express.static('src/server/favicon.ico', { maxAge: '200d' }));

app.use('/', render)

app.listen(PORT, () => {
  console.log('Server listening on', PORT, ', NODE_ENV:', process.env.NODE_ENV)
})

export default app
