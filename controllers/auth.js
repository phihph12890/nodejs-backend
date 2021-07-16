import User from '../models/user';
import jwt from 'jsonwebtoken';
const nodemailer = require('nodemailer');

const expressJwt = require('express-jwt');


export const signup = (req, res) => {
    const user = new User(req.body);
    // console.log(user);
    user.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Thêm tài khoản không thành công"
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json(data)
    })
    // const { name, email, hashed_password } = new User(req.body);
    // console.log(name);
    // console.log(email);
    // console.log(hashed_password);
    // User.findOne({ email }).exec(async (err, user) => {
    //     if (user) {
    //         return res.status(400).json({
    //             error: "Email đã tồn tại!"
    //         });
    //     }
    //     const token = jwt.sign({ name, email, hashed_password }, process.env.JWT_ACCOUNT_ACTIVATION, {expiresIn: '10m'});

    //     let testAccount = await nodemailer.createTestAccount();

    //     let transporter = nodemailer.createTransport({
    //         host: "smtp.ethereal.email",
    //         port: 587,
    //         secure: false,
    //         auth: {
    //             user: testAccount.user, // tạo user
    //             pass: testAccount.pass, // tạo mật khẩu
    //         },
    //     });


    //     let info = await transporter.sendMail({
    //         from: process.env.EMAIL_FROM,
    //         to: email,
    //         subject: `Account activation link`,
    //         html: `
    //             <h1>Please use the following link to activate your account</h1>
    //             <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
    //             <hr />
    //             <p>This email may contain sensetive information</p>
    //             <p>${process.env.CLIENT_URL}</p>
    //         `
    //     });
    //     console.log("Message sent: %s", info.messageId);
    //     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // })
}
exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'Email không tồn tại'
            })
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Mật khẩu chưa chính xác'
            })
        }
        // Tự động tạo ra một mã cùng với user và mã secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with  
        res.cookie('t', token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res.json(
            {
                token,
                user: { _id, email, name, role }
            }
        )
    })
};
export const signout = (req, res) => {
    res.clearCookie('t');
    res.json({
        message: 'Đăng xuất thành công'
    })
}
// export const list = (req, res) => {
//     User.find()
//         .exec((err, data) => {

//         })
// }