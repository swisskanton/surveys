import express from "express"
import * as controller from '../controllers/controller.js'

const router = express.Router()

router.get('/', controller.getIndexPage)

router.post('/display-files', controller.postEmailSendContent)

router.get('/contest', controller.getContestContent)

router.get('/active', controller.getActivePage)

router.post('/active', controller.setActivity)

export default router