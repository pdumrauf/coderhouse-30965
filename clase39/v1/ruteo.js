import { Router } from 'express'

import { getDatosController, postDatosController } from './controlador.js'

const routerDatos = new Router()

routerDatos.get('/', getDatosController)
routerDatos.post('/', postDatosController)

export default routerDatos
