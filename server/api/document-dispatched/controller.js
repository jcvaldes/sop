import db from '../../models'
import RESPONSES from '../../utils/responses'

class DocumentDispatched {
  static async Fetch(req, res) {
    const attrs = [
      'id',
      'dateDocument',
      'unityCompany',
      'distribution',
      'pieceId',
      'status',
      'timeStreet',
      'motiveNotDeliver',
    ]
    db.DocumentDispatched.findAll({
      attributes: attrs,
      order: [['id']],
    })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message + err })
      })
  }
  static FetchOne(req, res) {
    const id = +req.params.id
    db.DocumentDispatched.findOne({
      where: {
        id,
      },
    })
      .then((result) => {
        if (result === 0) {
          res.status(404).json({
            error: RESPONSES.RECORD_NOT_FOUND_ERROR.message,
          })
        } else {
          res.status(200).json({
            ok: true,
            payload: result,
          })
        }
      })
      .catch(Sequelize.ValidationError, (msg) =>
        res.status(422).json({
          message: msg.errors[0].message,
        }),
      )
      .catch((err) => {
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message + err })
      })
  }
  static Create(req, res) {
    // const {
    //   dateDocument,
    //   unityCompany,
    //   distribution,
    //   pieceId,
    //   status,
    //   timeStreet,
    //   motiveNotDeliver,
    // } = req.body
    db.DocumentDispatched.create(req.body)
      .then((role) => {
        res.status(200).json({
          ok: true,
          role,
        })
      })
      .catch(Sequelize.ValidationError, (msg) => {
        res.status(422).json({ message: msg.message })
      })
      .catch((err) =>
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message + err }),
      )
  }
  static Update(req, res) {
    const {
      dateDocument,
      unityCompany,
      distribution,
      pieceId,
      status,
      timeStreet,
      motiveNotDeliver,
    } = req.body
    const id = +req.params.id

    db.DocumentDispatched.update(
      {
        id,
        dateDocument,
        unityCompany,
        distribution,
        pieceId,
        status,
        timeStreet,
        motiveNotDeliver,
      },
      { where: { id } },
    )
      .then((document) => {
        if (document) {
          res.status(200).json(document)
        }
      })
      .catch(Sequelize.ValidationError, (msg) =>
        res.status(422).json({ message: msg.errors[0].message }),
      )
      .catch((err) =>
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message + err }),
      )
  }
  static Delete(req, res) {
    const { id } = req.params
    db.role
      .destroy({ where: { id } })
      .then((result) => {
        if (result === 0) {
          res.status(404).json({
            error: RESPONSES.RECORD_NOT_FOUND_ERROR.message,
          })
        } else {
          res.status(200).json({
            message: RESPONSES.DELETE_RECORD_ERROR.message,
          })
        }
      })
      .catch(Sequelize.ValidationError, (msg) =>
        res.status(422).json({ message: msg.errors[0].message }),
      )
      .catch(Sequelize.ForeignKeyConstraintError, (err) =>
        res.status(400).json({
          message: RESPONSES.RECORD_IN_USE_ERROR.message,
        }),
      )
      .catch((err) =>
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message + err }),
      )
  }
}
export default DocumentDispatched
