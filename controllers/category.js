import Category from '../models/category';

export const create = (req, res) => {
    console.log(req.body);
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Add Category failed!"
            });
        }
        res.json(data);
    })
}
export const list = (req, res) => {
    // let order = req.query.order ? req.query.order : 'asc';
    // let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    // let limit = req.query.limit ? +req.query.limit : 6;

    Category.find()
        // .select("-photo")
        // .populate('category')
        // .sort([[order, sortBy]])
        // .limit(limit)
        .exec((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Product not found"
                })
            }
            res.json(data)
        })
}
export const categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            res.status(404).json({
                error: "Không tìm thấy danh mục sản phẩm!"
            })
        }
        req.category = category;
        next();
    })
}
export const read = (req, res) => {
    return res.json(req.category);
}
export const remove = (req, res) => {
    let category = req.category;
    category.remove((err, deletedCategory) => {
        if (err) {
            return res.status(400).json({
                error: "Không xoá được danh mục!"
            });
        }
        res.json({
            deletedCategory,
            message: "Xoá danh mục thành công"
        })
    })
}
export const update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) =>{
        if (err) {
            return res.status(400).json({
                error: "Cập nhật danh mục không thành công!"
            });
        }
        res.json(data);
    })
}