require('module-alias/register')
const openpgp = require('openpgp')
const config = require('../../config')

const pgp = {
    generatePGPKey: async data => {
        const {privateKeyArmored, publicKeyArmored} = await openpgp.generateKey({
            userIds: data,
            rsaBits: 4096,
            passphrase: config.PGP_SECRET_KEY
        })

        return {
            privateKeyArmored: privateKeyArmored,
            publicKeyArmored: publicKeyArmored
        }
    },

    encryptPGP: async (data, publicKey) => {
        const dataStr = JSON.stringify(data)

        const encrypted = await openpgp.encrypt({
            message: openpgp.message.fromText(dataStr),
            publicKeys: (await openpgp.key.readArmored(publicKey)).keys,
        })

        return encrypted.data
    },

    decryptPGP: async (encryptedData, privateKey) => {
        const prKey = (await openpgp.key.readArmored([privateKey])).keys[0];
        await prKey.decrypt(config.PGP_SECRET_KEY);
        const decrypted = await openpgp.decrypt({
            message: await openpgp.message.readArmored(encryptedData),
            privateKeys: [prKey]
        })
        return JSON.parse(decrypted.data)
    }
}

module.exports = pgp
