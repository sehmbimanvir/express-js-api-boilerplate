import express from 'express'
import userCtrl from '../controllers/userController'
const router = express.Router()

router.get('/', userCtrl.list)
router.get('/:id', userCtrl.show)
router.post('/', userCtrl.store)

export default router