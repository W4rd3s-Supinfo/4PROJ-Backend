import warehousesmodel from '../models/Warehouse.model';
import productitemsModels from '../models/ProductItem.model';

function feedDB() {
  productitemsModels.getProductItems()
    .then((data) => {
      const tmpArray: Array<any> = [];
      // @ts-ignore
      data.forEach((single) => {
        tmpArray.push({ productId: single._id, quantity: Math.floor(Math.random() * 1000) });
      });
      warehousesmodel.updateWarehouseById('60dc3d86903e4149240cfc4f', {
        productList: tmpArray,
      });
    });
}

export default feedDB;
