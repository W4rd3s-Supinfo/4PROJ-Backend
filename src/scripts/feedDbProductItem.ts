import productDetailModel from '../models/ProductDetail.model';
import productItemModel from '../models/ProductItem.model';

function feedDB() {
  productDetailModel.getProductDetails(NaN, 0)
    .then((data) => {
    // @ts-ignore
      data.forEach((mSingle) => {
        productItemModel.addProductItem({
          totalCarbon: mSingle.baseCarbon,
          expirationDate: new Date('10/10/2021'),
          marketPrice: 0,
          detailId: mSingle._id,
        });
      });
    });
}
export default feedDB;
