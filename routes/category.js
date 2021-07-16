import express from 'express';
import { create, list, categoryById, read, update, remove } from '../controllers/category';

const router = express.Router();


//Danh sách danh mục
router.get('/categories', list);
//Chi tiết danh mục
router.get('/category/:categoryId', read);
//Thêm mới danh mục
router.post('/category', create);
//Cập nhật danh mục
router.put('/category/:categoryId', update);
//Xoá danh mục
router.delete('/category/:categoryId', remove);
//Lấy param
router.param('categoryId', categoryById);


module.exports = router;