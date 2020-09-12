import db from '../../models'
import RESPONSES from '../../utils/responses'

class Menu {
  static async Fetch(req, res) {
    const attrs = [
      'id',
      'title',
      'icon',
      'uri',
      'ParentId'
    ]
    db.Menu.findAll({
      attributes: attrs,
      order: [['ParentId']]
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
export default Menu
