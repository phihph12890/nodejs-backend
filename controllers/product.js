import Product from '../models/product'
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';

export const create = (req, res) => {
    // let form = new formidable.IncomingForm();
    // form.keepExtensions = true;
    // form.parse(req, (err, fields, files) => {
    //     if (err) {
    //         return res.status(400).json({
    //             error: "Add product failed"
    //         })
    //     }
    //     const { name, description, price } = fields;
    //     if (!name || !description || !price) {
    //         return res.status(404).json({
    //             error: "Bạn cần nhập đầy đủ thông tin!"
    //         })
    //     }
    //     let product = new Product(fields);
    //     if (files.photo) {
    //         if (files.photo.size > 2000000) {
    //             res.status(404).json({
    //                 error: "Ảnh quá nặng, upload ảnh dưới 1 MB"
    //             })
    //         }
    //         product.photo.data = fs.readFileSync(files.photo.path);
    //         product.photo.contentType = files.photo.type;
    //     }
    //     product.save((err, data) => {
    //         if (err) {
    //             return res.status(400).json({
    //                 error: "Add product failed"
    //             });
    //         }
    //         res.json(data);
    //     })
    // });

    const product = new Product(req.body);
    console.log(product);
    product.save((err, data) => {
        if(err){
            console.log(err);
            return res.status(400).json({
                error: "Add product failed"
            })
        }
        res.json(data)
    })
}
export const list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? +req.query.limit : 6;

    Product.find()
        // .select("-image")
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
export const productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            res.status(404).json({
                error: "Không tìm thấy sản phẩm!"
            })
        }
        req.product = product;
        next();
    })
}
export const read = (req, res) => {
    return res.json(req.product);
}
export const remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: "Không xoá được sản phẩm!"
            });
        }
        res.json({
            deletedProduct,
            message: "Xoá sản phẩm thành công"
        })
    })
}
export const update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Update product failed"
            })
        }
        const { name, description, price } = fields;
        if (!name || !description || !price) {
            return res.status(404).json({
                error: "Bạn cần nhập đầy đủ thông tin!"
            })
        }
        // let product = new Product(fields);
        let product = req.product;
            product = _.assignIn(product, fields)
        if (files.photo) {
            if (files.photo.size > 2000000) {
                res.status(404).json({
                    error: "Ảnh quá nặng, upload ảnh dưới 1 MB"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        product.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Update product failed"
                });
            }
            res.json(data);
        })
    });
}