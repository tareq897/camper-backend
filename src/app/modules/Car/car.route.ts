import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../User/user.constant'
import { auth } from '../../middlewares/auth'
import { CarsValidations } from './car.validation'
import { CarsController } from './car.controller'

const router = express.Router()
router.post('/', auth(USER_ROLE.admin), validateRequest(CarsValidations.createCarsValidation), CarsController.createCars)

router.put('/return', auth(USER_ROLE.admin), CarsController.returnCar)

router.get('/', CarsController.getAllCars)

router.get('/:id', CarsController.getSingleCar)

router.delete('/:id', auth(USER_ROLE.admin), CarsController.deleteCar)

router.put('/:id', auth(USER_ROLE.admin), validateRequest(CarsValidations.updateCarsValidation), CarsController.updateCar)


export const CarsRoutes = router