import db from '../../models'
import { Sequelize } from '../../models';
import RESPONSES from '../../utils/responses'

class DeliveryDocumentController {
  static async Fetch(req, res) {
    const attrs = [
      'id',
      'dateDocument',
      'unityCompany',
      'distribution',
      'piece',
      'status',
      'timeStreet',
      'motiveNotDelivery',
    ]
    db.DeliveryDocument.findAll({
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
    db.DeliveryDocument.findOne({
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
    //   piece,
    //   status,
    //   timeStreet,
    //   motiveNotDelivery,
    // } = req.body
    db.DeliveryDocument.bulkCreate(req.body)
      .then((document) => {
        res.status(200).json({
          ok: true,
          payload: document,
        })
      })
      .catch(Sequelize.ValidationError, (msg) => {
        res.status(422).json({ message: msg.message })
      })
      .catch(Sequelize.ForeignKeyConstraintError, (err) => {

        res.status(400).json({
          message: RESPONSES.RECORD_IN_USE_ERROR.message,
        })

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
      piece,
      status,
      timeStreet,
      motiveNotDelivery,
    } = req.body
    const id = +req.params.id
    db.DeliveryDocument.update(
      {
        id,
        dateDocument,
        unityCompany,
        distribution,
        piece,
        status,
        timeStreet,
        motiveNotDelivery,
      },
      { where: { id } },
    )
      .then((document) => {
        if (document) {
          res.status(200).json(document)
        }
      })
      .catch(Sequelize.ForeignKeyConstraintError, (err) =>
        res.status(400).json({
          message: RESPONSES.RECORD_IN_USE_ERROR.message,
        }),
      )
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
    db.DeliveryDocument
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
      .catch((err) =>
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message + err }),
      )
  }
}
export default DeliveryDocumentController
