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
        const { email } = userData
        const user = await this.dao.getUserByEmail(email)
        if (user) {
            throw new CommonError(
                ResponseCode.CONFLICT,
                undefined,
                'This is email alredy exists!'
            )
        }

        const currentMsTime = DateTimeUtils.getCurrentMsTime()
        const insertedUser = await this.dao.insertRecord(userData)

        

        return insertedUser
    }
}

export default UserService
