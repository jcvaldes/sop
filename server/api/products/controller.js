import db from '../../models'
import RESPONSES from '../../utils/responses'

class ProductsController {
  static async Fetch(req, res) {
    const attrs = [
      'id',
      'code',
      'pgCatCode',
      'description'
    ]
    db.Product.findAll({
      attributes: attrs,
      order: [['id']]
    })
      .then((data) => {
        res.status(200).json({payload: data})
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message + err })
      })
  }
}
export default ProductsController
