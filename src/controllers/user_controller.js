import BaseController from './base_controller'
import UserService from '../services/user_service'
import SuccessResponse from '../commons/response_models/success_response'
import { ResponseCode } from '../commons/const/response_consts'

class UserController extends BaseController {
    constructor() {
        super(new UserService())
        this.createNormallUser = this.createNormallUser.bind(this)
    }

    async createNormallUser(req, res, next) {
        const requestBody = req.body
        const user = await this.service.createNormalUser(requestBody)
        const responseBody = new SuccessResponse(
            ResponseCode.CREATED,
            'Create new user success',
            user
        )
        res.status(ResponseCode.CREATED).json(responseBody)
    }
}

export default UserController
