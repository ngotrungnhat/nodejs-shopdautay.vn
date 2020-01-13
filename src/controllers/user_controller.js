import BaseController from './base_controller'
import UserService from '../services/user_service'
import SuccessResponse from '../commons/response_models/success_response'
import { ResponseCode, ErrorCode, LocationType, ErrorMessage } from '../commons/const/response_consts'
import DataUtils from '../utils/data_utils'
import ApiError from '../commons/response_models/api_error'
import ErrorResponse from '../commons/response_models/error_response'

class UserController extends BaseController {
    constructor() {
        super(new UserService())
        this.createNormallUser = this.createNormallUser.bind(this)
        this._validateRequestBodyForCreateNormalUser = this._validateRequestBodyForCreateNormalUser.bind(this)
        this.activeNormalUser = this.activeNormalUser.bind(this)
        this._validateRequestBodyForActiveNormalUser = this._validateRequestBodyForActiveNormalUser.bind(this)
    }

    async createNormallUser(req, res, next) {
        const requestBody = req.body
        try {
            this._validateRequestBodyForCreateNormalUser(requestBody)
        } catch (errors) {
            const responseBody = new ErrorResponse(ErrorMessage.VALIDATION_FAILED, errors)
            return res.status(ResponseCode.VALIDATION_FAILED).json(responseBody)
        }
        const user = await this.service.createNormalUser(requestBody)
        const responseBody = new SuccessResponse(ResponseCode.CREATED, 'Create new user success', user)
        res.status(ResponseCode.CREATED).json(responseBody)
    }

    _validateRequestBodyForCreateNormalUser(userData) {
        const {userName, firstName, lastName, email, phone, password, address} = userData;
        const errors = [];

        if (!DataUtils.isHasValue(userName) || !DataUtils.isValidUserName(userName)) {
            errors.push(new ApiError(ErrorCode.INVALID_PARAM, "Invalid userName", LocationType.BODY, "/userName"));
        }
        if (!DataUtils.isHasValue(firstName) || !DataUtils.isValidName(firstName)) {
            errors.push(new ApiError(ErrorCode.INVALID_PARAM, "Invalid firstName", LocationType.BODY, "/firstName"));
        }
        if (!DataUtils.isHasValue(lastName) || !DataUtils.isValidName(lastName)) {
            errors.push(new ApiError(ErrorCode.INVALID_PARAM, "Invalid lastName", LocationType.BODY, "/lastName"));
        }
        if (!DataUtils.isHasValue(email) || !DataUtils.isValidEmailAddress(email)) {
            errors.push(new ApiError(ErrorCode.INVALID_PARAM, "Invalid email", LocationType.BODY, "/email"));
        }
        if (!DataUtils.isHasValue(phone) || !DataUtils.isValidPhoneNumber(phone)) {
            errors.push(new ApiError(ErrorCode.INVALID_PARAM, "Invalid phone number", LocationType.BODY, "/phone"));
        }
        if (!DataUtils.isHasValue(password) || !DataUtils.isValidPassword(password)) {
            errors.push(new ApiError(ErrorCode.INVALID_PARAM, "Invalid password", LocationType.BODY, "/password"));
        }
        if (!DataUtils.isHasValue(address)) {
            errors.push(new ApiError(ErrorCode.INVALID_PARAM, "Invalid address", LocationType.BODY, "/address"));
        }

        if (errors.length) {
            throw errors
        }
    }

    async activeNormalUser(req, res, next) {
        const requestBody = req.body
        const { email, code } = requestBody

        try {
            this._validateRequestBodyForActiveNormalUser(requestBody)
        } catch (errors) {
            const responseBody = new ErrorResponse(undefined, ErrorMessage.VALIDATION_FAILED, errors)
            return res.status(ResponseCode.VALIDATION_FAILED).json(responseBody)
        }

        const userActive = await this.service.activeNormalUser(email, code)
        const responseBody = new SuccessResponse(ResponseCode.OK, "Active user success", userActive)
        return res.status(ResponseCode.NO_CONTENT).send(responseBody)
    }

    _validateRequestBodyForActiveNormalUser(requestBody) {
        const errors = []
        const { email, code } = requestBody
    
        if (!DataUtils.isHasValue(code)) {
            errors.push(new ApiError(ErrorCode.INVALID_PARAM, `Do not exits code`, LocationType.BODY, "/code"))
        }
    
        if (!DataUtils.isHasValue(email) || !DataUtils.isValidEmailAddress(email)) {
            errors.push(new ApiError(ErrorCode.INVALID_PARAM, `Do not exits email`, LocationType.BODY, "/email"))
        }
    
        if (errors.length) {
            throw errors
        }
    }
}

export default UserController
