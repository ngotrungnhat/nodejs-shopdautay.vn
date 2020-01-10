import BaseService from './base_service'
import UserDAO from '../daos/user_dao'
import CommonError from './../commons/errors/common_error'
import { ResponseCode } from '../commons/const/response_consts'
import DateTimeUtils from '../utils/data_time_utils'

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

        const currentMsTime = DateTimeUtils.getCurrentMsTime()
        const insertedUser = await this.dao.insertRecord(userData)

        return insertedUser
    }
}

export default UserService
