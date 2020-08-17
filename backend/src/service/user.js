const UserModel = require('../model/users')
const httpSttCode = require('http-status-codes')
const createError = require('http-errors')
const sequelize = require('../model/index')
const UserRoles = require('../model/user_roles')
const crypto = require('../utils/crypto')
const generator = require('../utils/generator')
const consts = require('../consts/index')
const utils = require('./utils')

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
        const staffinfo = staffs.map(s => {
            utils.getUserByCondition({id : s.user_id},'Không tìm thấy nhân viên')
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
    }
}