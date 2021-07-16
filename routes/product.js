import express from 'express';
import { list, read, create, update, remove, productById } from '../controllers/product'

const router = express.Router();

//Danh sách sản phẩm
router.get('/products', list); 
//Chi tiết sản phẩm
router.get('/product/:productId', read); 
//Thêm mới sản phẩm 
router.post('/product', create);
//Cập nhật sản phẩm
router.put('/product/:productId', update);
//Xoá sản phẩm
router.delete('/product/:productId', remove);
//Lấy param
router.param('productId', productById);


module.exports = router;
