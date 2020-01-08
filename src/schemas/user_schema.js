import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import configData from './../utils/config'
import { Collections } from './../commons/const/database_consts'
import { UserType } from './../commons/const/user_consts'

const Schema = mongoose.Schema
const SALT_ROUND = 10
const date = new Date()
const fomartDate =
    date.getDate() + '/' + date.getMonth() + '/' + date.getUTCFullYear()

const UserSchema = new Schema(
    {
        typeLogin: {
            type: Number,
            default: UserType.NORMAL_LOGIN_USER,
        },
        name: {
            type: String,
            default: 'unknow',
        },
        email: {
            type: String,
            unique: true,
        },
        phone: {
            type: Number,
            unique: true,
        },
        password: {
            type: String,
        },
        age: {
            type: Number,
        },
        address: {
            type: String,
        },
        isActive: {
            type: Number,
            default: 0,
            createdAt: {
                type: Number,
                default: 0,
            },
        },
        cart: {
            type: Array,
            default: [],
        },
        createdRawAt: {
            type: String,
            default: date,
        },
        createAt: {
            type: String,
            default: fomartDate,
        },
    },
    { collection: Collections.USERS }
)
//Add password, "pre" use crypt pass before save  dùng cho signup
UserSchema.pre('save', async function(next) {
    const user = this
    if (user.isDirectModified('password')) {
        const salt = await bcrypt.genSaltSync(SALT_ROUND)
        const hashedWord = await bcrypt.hashSync(user.password, salt)
        user.password = hashedWord
    }
    next()
})
//Check pass dùng cho login
// UserSchema.methods.isMatchPasswordSync = async function(myPlaintextPassword) {
//     try {
//         const { password } = this
//         const isMatch = await bcrypt.compareSync(myPlaintextPassword, password)
//         return isMatch
//     } catch (error) {
//         throw error
//     }
// }
//Xác thực mã token dùng cho login
// UserSchema.methods.generateAccessToken = async function() {
//     const { _id, email } = this
//     const payload = {
//         id: _id,
//         email: email,
//     }
//     const secret_sign = configData.token.secret_key
//     const options = {
//         expiresIn: configData.token.lifetimes,
//     }
//     const token = await jwt.sign(payload, secret_sign, options)
//     return token
// }

// UserSchema.plugin(timestamps)

export default mongoose.model('UserSchema', UserSchema)
