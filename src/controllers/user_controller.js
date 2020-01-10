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

        if (!DataUtils.isHasValue(userName.trim()) || !DataUtils.isValidUserName(userName.trim())) {
            errors.push(new ApiError(ErrorCode.INVALID_PARAM, "Invalid userName", LocationType.BODY, "/userName"));
        }
        if (!DataUtils.isHasValue(firstName.trim()) || !DataUtils.isValidName(firstName.trim())) {
            errors.push(new ApiError(ErrorCode.INVALID_PARAM, "Invalid firstName", LocationType.BODY, "/firstName"));
        }
        if (!DataUtils.isHasValue(lastName.trim()) || !DataUtils.isValidName(lastName.trim())) {
            errors.push(new ApiError(ErrorCode.INVALID_PARAM, "Invalid lastName", LocationType.BODY, "/lastName"));
        }
        if (!DataUtils.isHasValue(email.trim()) || !DataUtils.isValidEmailAddress(email.trim())) {
            errors.push(new ApiError(ErrorCode.INVALID_PARAM, "Invalid email", LocationType.BODY, "/email"));
        }
        if (!DataUtils.isHasValue(phone.trim()) || !DataUtils.isValidPhoneNumber(phone.trim())) {
            errors.push(new ApiError(ErrorCode.INVALID_PARAM, "Invalid phone number", LocationType.BODY, "/phone"));
        }
        if (!DataUtils.isHasValue(password.trim()) || !DataUtils.isValidPassword(password.trim())) {
            errors.push(new ApiError(ErrorCode.INVALID_PARAM, "Invalid password", LocationType.BODY, "/password"));
        }
        if (!DataUtils.isHasValue(address.trim())) {
            errors.push(new ApiError(ErrorCode.INVALID_PARAM, "Invalid address", LocationType.BODY, "/address"));
        }

        if (errors.length) {
            throw errors
        }
    }
}

export default UserController
