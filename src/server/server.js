/** Created by hhj on 12/23/15. */
import express from 'express'
import render from './render'

const PORT = process.env.PORT || 3000

const app = express()

// add dev middleware to express in dev mode
if (process.env.NODE_ENV !== 'production') {
  require('../../webpack.dev.js').default(app);
}

app.use('/', express.static('dist', { maxAge: '200d' }));
app.use('/favicon.ico', express.static('./favicon.ico', { maxAge: '200d' }));

app.use('/', render)

app.listen(PORT, function() {   // eslint-disable-line func-names, space-before-function-paren
  console.log('Server listening on', PORT)
})
