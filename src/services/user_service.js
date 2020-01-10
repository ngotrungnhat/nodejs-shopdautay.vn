import BaseService from './base_service'
import UserDAO from '../daos/user_dao'
import CommonError from './../commons/errors/common_error'
import { ResponseCode } from '../commons/const/response_consts'
import DateTimeUtils from '../utils/data_time_utils'
import DataUtils from '../utils/data_utils'
import EmailUtils from '../utils/email_utils'

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

        const currentMsTime = DateTimeUtils.getCurrentMsTime()
        const insertedUser = await this.dao.insertRecord(Object.assign(userData, {activeCode: { code: activeCode, createAt: currentMsTime }}))
        setTimeout(this.sendNewUserEmail, 1000, insertedUser, activeCode)
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
}

export default UserService
