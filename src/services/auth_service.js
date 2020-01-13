import UserDAO from "../daos/user_dao";
import CommonError from "../commons/errors/common_error";
import { ResponseCode, ResponseBodyCode } from "../commons/const/response_consts";


const userDAO = new UserDAO()

class AuthService {

    async authenticateNormalUser(resquestBody) {
        const {email, password} = resquestBody;
        const user = await userDAO.getUserByEmail(email);

        if (!user) {
            throw new CommonError(ResponseCode.UNAUTHORIZED, ResponseBodyCode.LOGIN.USER_NOT_FOUND, 'email do not exists!')
        }
        if (!user.) {
            
        }
        if (user.password !== password) {
            throw new CommonError(ResponseCode.UNAUTHORIZED, ResponseBodyCode.LOGIN.PASSWORD_INCORRECT, 'Password incorrect')
        }


    }

    async authenticateSSOUser(resquestBody, userType) {

    }

}