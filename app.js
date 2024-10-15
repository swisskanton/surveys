import express from 'express'
import fs from 'fs'
import path from 'path'

import __dirname from './util/rootpath.js'
import routerHandler from './routes/routerHandler.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routerHandler)

app.listen(10000, () => {
    console.log('Server is running on http://localhost:10000')
})
