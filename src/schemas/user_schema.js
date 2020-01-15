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
    date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getUTCFullYear()

const UserSchema = new Schema(
    {
        typeLogin: {
            type: Number,
            default: UserType.NORMAL_LOGIN_USER,
        },
        userName: String,
        firstName: String,
        lastName: String,
        email: {
            type: String,
            unique: true,
        },
        phone: {
            type: String,
            unique: true,
        },
        password: String,
        age: Number,
        aboutMe: String,
        address: String,
        isActive: {
            type: Boolean,
            default: false,
        },
        activeCode: {
            code: {
                type: String,
                default: null
            },
            createAt: {
                type: Number,
                default: 0
            }
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
        changePasswordCode: {
            code: {
                type: String,
                default: null
            },
            createdAt: {
                type: Number,
                default: 0
            }
        }
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

//match pass sử dụng cho login
UserSchema.methods.isMatchPasswordSync = async function(plainText) {
    const { password } = this
    const isMatch = await bcrypt.compareSync(plainText, password)
    return isMatch
}

//Xác thực mã token dùng cho login
UserSchema.methods.generateAccessToken = function() {
    const { _id, email } = this;
    const payload = {
        id: _id,
        email: email
    }
    const options = {
        expiresIn: configData.token.lifetimes
    }
    const secret = configData.token.secret_key
    const token = jwt.sign(payload, secret, options)

    return token;
};




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



export default mongoose.model('UserSchema', UserSchema)
