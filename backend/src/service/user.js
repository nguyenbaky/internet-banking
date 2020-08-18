const UserModel = require('../model/users')
const httpSttCode = require('http-status-codes')
const createError = require('http-errors')
const sequelize = require('../model/index')
const UserRoles = require('../model/user_roles')
const crypto = require('../utils/crypto')
const generator = require('../utils/generator')
const consts = require('../consts/index')
const utils = require('./utils')
const nodemailer = require("nodemailer");
const Otp = require('../model/otp')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: consts.USER,
      pass: consts.PASS
    }
  });

module.exports = {
    createUser: async (user) => {
        // hash password
        user.password = crypto.encryptSHA3(user.password)
        user.account_number = generator.uid()
        user.bank_code = consts.BANK_CODE

        // create user with transaction
        await sequelize.transaction(t => {
            return UserModel.create(user, {transaction: t})
                .then(u => {  
                    return UserRoles.create({
                        user_id: u.id,
                        role_id: user.role,
                    }, {transaction: t})
                })
        }).catch(err => {
            throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err.toString())
        })

        delete user.password
        return user
    },

    checkRoleUser: async (userID, role) => {
        await UserModel.findOne({where: {id: userID}})
            .then(u => {
                if (u === null) {
                    throw createError(httpSttCode.NOT_FOUND, 'user not exists')
                }
            })
            .catch(err => {
                throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
            })

        const userRoles = await UserRoles.findAll({where: {user_id: userID}})
            .catch(err => {
                throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
            })

        if ( userRoles.role_id >= role) 
            throw createError(httpSttCode.NOT_ACCEPTABLE, "access denied")
    },

    getListStaff: async() => {
        const staffs = await UserRoles.findAll({where:{role_id : consts.ROLE.STAFF}})
            .catch(err => {
                throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
            })
        const staffinfo = staffs.map(async(s) => {
            await utils.getUserByCondition({id : s.user_id},'Không tìm thấy nhân viên')
        })
            return staffinfo
    } ,

    deleteStaff: async(staffID) => {
        UserModel.destroy({
            where:{
                id: staffID
            }
        }).catch(err =>{
            throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
        })
    },

    sendOTP: async(id) => {
        const u = await utils.getUserByCondition({
            id:id
        },'Không tìm thấy user')
        const k = generator.uid()
        const mailOptions = {
            from: 'tq237006@gmail.com',
            to: u.email,
            subject: 'Verify OTP BANK',
            text: 'Mã xác thực của quý khách là ' + k
        };
        // Tạo mã OTP
        const found = await Otp.findOne({where: {
            email:u.email
        }})

        if (found){
            await Otp.update({otp:k},{where :{
                email:u.email
            }})
        }else{
            console.log(`********** not found **************`)
            otp = {}
            otp.email=u.email
            otp.otp = k
            await Otp.create(otp)
        }

        transporter.sendMail(mailOptions)
        .then(_ => {
            console.log(`******* email sent *********`)
        })
        .catch(err => {
            console.log(`************************` ,err)
            throw createError(httpSttCode.INTERNAL_SERVER_ERROR)
        })
    },

    checkOTP : async(id,otp) => {
        const u = await utils.getUserByCondition({id})
        console.log(`******email OTP `,u.email)
        const o = await Otp.findOne({where: {email:u.email}})
        if(!o) throw createError(httpSttCode.UNAUTHORIZED)

        console.log(`*********`,o.otp == otp)
        if(o.otp == otp) return true
        else return false
    }

}