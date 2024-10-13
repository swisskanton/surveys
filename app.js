import express from 'express'
import fs from 'fs'
import path from 'path'

import __dirname from './util/rootpath.js'
import * as controller from './controllers/controller.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// Route to render the form
app.get('/', controller.getIndexPage)

// Route to handle form submission and display files
app.post('/display-files', controller.postEmailSendContent)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})
