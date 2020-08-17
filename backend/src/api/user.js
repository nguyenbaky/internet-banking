const express = require('express')
const userService = require('../service/user')
const httpSttCode = require('http-status-codes')
const validator = require('../validator/user')
const {validationResult} = require('express-validator')
const createError = require('http-errors')
const consts = require('../consts/index')

const router = express.Router()

router.post('/register', validator.postRegister(), async (req, res) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
        throw createError(httpSttCode.BAD_REQUEST, err.array()[0].msg)
    }
    const user = await userService.createUser(req.body)
    res.status(httpSttCode.CREATED)
        .json({
            message: 'success',
            data: {
                user: user,
            }
        })
})

router.get('/staff',async(req,res) => {
    const id = req.userID
    await userService.checkRoleUser(id,consts.ROLE.ADMIN)
    const staffinfo = await userService.getListStaff()
    console.log(`****************** staff info ********************* `, staffinfo)
    res.status(httpSttCode.OK)
        .json({
            message:'Lấy thông tin nhân viên thành công',
            data : staffinfo
        })
})

router.delete('staff/:staffID',async(req,res) => {
    const id = req.userID
    await userService.checkRoleUser(id,consts.ROLE.ADMIN)
    const {staffID} = req.params
    await userService.deleteStaff(staffID)
        .then(_ =>{
            res.status(httpSttCode.OK)
                .json({
                    message : 'Xóa nhân viên thành công '
                })
        })
        .catch(err => {
            res.status(httpSttCode.INTERNAL_SERVER_ERROR)
        })
})

module.exports = router