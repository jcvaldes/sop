import db from '../../models'
import RESPONSES from '../../utils/responses'

class DistributionStatusController {
  static async Fetch(req, res) {
    const attrs = [
      'id',
      'code',
      'description'
    ]
    db.DistributionStatus.findAll({
      attributes: attrs,
      order: [['id']]
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
}
export default DistributionStatusController
