import BaseService from './base_service'
import UserDAO from '../daos/user_dao'
import CommonError from './../commons/errors/common_error'
import { ResponseCode } from '../commons/const/response_consts'
import DateTimeUtils from '../utils/data_time_utils'
import DataUtils from '../utils/data_utils'
import EmailUtils from '../utils/email_utils'
import configData from '../utils/config'

class UserService extends BaseService {
    constructor() {
        super(new UserDAO())
    }

    async createNormalUser(userData) {
        const { email, phone } = userData;
        const userEmail = await this.dao.getUserByEmail(email);
        const userPhoneNumber = await this.dao.getUserByPhoneNumber(phone);
        
        if (userEmail) {
            throw new CommonError(
                ResponseCode.CONFLICT,
                undefined,
                'This is email alredy exists!'
            )
        }
        if (userPhoneNumber) {
            throw new CommonError(
                ResponseCode.CONFLICT,
                undefined,
                'This is phone number alredy exists!'
            )
        }

        const activeCode = DataUtils.randomKey();

        const currentMsTime = DateTimeUtils.getCurrentMsTime();
        const insertedUser = await this.dao.insertRecord(Object.assign(userData, {activeCode: { code: activeCode, createAt: currentMsTime }}));
        setTimeout(this.sendNewUserEmail, 1000, insertedUser, activeCode);
        return insertedUser
    }

    sendNewUserEmail(user, activeCode) {
        const { email, firstName, lastName } = user
        const subject = `Active user`
        const content = `Hi ${firstName}, your active code is ${activeCode}`
        const emailToSend = {
            subject: subject,
            content: content
        }

        EmailUtils.sendOneMail(email, emailToSend)
    }

    async activeNormalUser(email, activeCode) {
        const user = await this.dao.getUserByEmail(email)

        if(!user) {
            throw new CommonError(ResponseCode.NOT_FOUND, undefined, "User not found!")
        }

        if (user.activeCode.code !== activeCode) {
            const errors = [new ApiError(ErrorCode.INVALID_PARAM, "Code not match", LocationType.BODY, "/code")]
            throw new CommonError(ResponseCode.VALIDATION_FAILED, ResponseBodyCode.ACTIVE_USER.CODE_NOT_MATCH, ErrorMessage.VALIDATION_FAILED, errors)
        }

        const codeCreatedAt = user.activeCode.createdAt
        const currentMsTime = DateTimeUtils.getCurrentMsTime()
        const codeLifeTimes = configData.code_lifetimes

        if (codeCreatedAt + codeLifeTimes < currentMsTime) {
            const errors = [new ApiError(ErrorCode.INVALID_PARAM, "Code has expired", LocationType.BODY, "/code")]
            throw new CommonError(ResponseCode.VALIDATION_FAILED, ResponseBodyCode.ACTIVE_USER.CODE_EXPIRED, ErrorMessage.VALIDATION_FAILED, errors)
        }

        user.isActive = true
        user.activeCode = {
            code: null,
            createdAt: 0
        }

        await this.dao.updateRecord(user)

        return user

    }
}

export default UserService
