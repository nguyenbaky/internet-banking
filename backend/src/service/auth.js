const RoleModel = require('../model/roles')
const UserModel = require('../model/users')
const UserRoleModel = require('../model/user_roles')
const httpSttCode = require('http-status-codes')
const createError = require('http-errors')
const crypto = require('../utils/crypto')
const generator = require('../utils/generator')
const uuidv4  = require('uuid/v4');


module.exports = {
    login: async (username, password) => {
        const errUsernamePassword = createError(httpSttCode.UNAUTHORIZED,
            'username and password do not match any accounts')
        let user = await UserModel.findOne({where: {email: username}})
            .then(u => {
                if (u === null) {
                    throw errUsernamePassword
                }
                return u
            })
            .catch(err => {
                throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
            })

        const hashPassword = crypto.encryptSHA3(password)

        if (user.password !== hashPassword) {
            throw errUsernamePassword
        }

        const roles = await RoleModel.findAll()
            .catch(err => {
                throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
            })

        const userRoles = await UserRoleModel.findAll({
            where: {
                user_id: user.id,
            }
        }).catch(err => {
            throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
        })
        const mapRoles = userRoles.map(role => {
            const r = roles.find(r => r.id === role.role_id)
            return {
                id: r.id,
                role: r.role,
            }
        })    

        console.log(`auth backend service login maprole `,mapRoles)

        const refreshToken = uuidv4()
        await user.update({
            refresh_token: refreshToken
        }).catch(err => {
            console.error(err)
            throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
        })
        // gen token
        const jwtToken = generator.jwtToken(user.id)
        return {
            token: jwtToken,
            refresh_token: refreshToken,
            roles: mapRoles,
        }
    },

    refreshToken: (userID, refreshToken) => {
        let user = UserModel.findOne({id: userID})
            .then(u => {
                if (u === null) {
                    throw createError(httpSttCode.BAD_REQUEST, 'user not found')
                }
            })
            .catch(err => {
                throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
            })

        if (user.refresh_token !== refreshToken) {
            throw createError(httpSttCode.UNAUTHORIZED,
                'token invalid, please login!')
        }

        // gen token
        const jwtToken = generator.jwtToken(userID)
        return {
            token: jwtToken,
        }
    }
}
