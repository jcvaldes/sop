import db from '../../models'
const config = require('../../config').config
import RESPONSES from '../../utils/responses'
import { Sequelize } from '../../models'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

class AuthController {
  static async Login(req, res) {
    const { body } = req
    db.User.findOne({
        where: {
          accountName: body.accountName
        }
      }).then(user => {
        // si el usuario no existe
        if (!user) {
          return res.status(400).json({
            ok: false,
            message: 'Credenciales incorrectas',
            errors: 'Credenciales incorrectas',
          })
        }
        // si existe analizamos el password
        if (!bcrypt.compareSync(body.password, user.password)) {
          return res.status(400).json({
            ok: false,
            message: 'Credenciales incorrectas',
            errors: 'Credenciales incorrectas',
          })
        }
        // Crear un token
        // expira en 4hs
        user.password = ':P'
        const token = jwt.sign({ user: user }, config.authJwtSecret, { expiresIn: 3600 })
        res.status(200).json({
          ok: true,
          user,
          token,
          id: user.id
        })
      })
      .catch(err => {
        res.status(400).json({ message: RESPONSES.DB_CONNECTION_ERROR.message + err })
      })
  }
}
export default AuthController
