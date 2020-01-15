import UserDAO from "../daos/user_dao";
import CommonError from "../commons/errors/common_error";
import { ResponseCode, ResponseBodyCode } from "../commons/const/response_consts";
import { UserType } from "../commons/const/user_consts";
import UserSchema from "../schemas/user_schema";


const userDAO = new UserDAO()

class AuthService {

    async authenticateNormalUser(resquestBody) {
        const {email, password} = resquestBody;
        const user = await userDAO.getUserByEmail(email);

        if (!user) {
            throw new CommonError(ResponseCode.UNAUTHORIZED, ResponseBodyCode.LOGIN.USER_NOT_FOUND, 'Email do not exists!')
        }
        if (user.isActive === false) {
            throw new CommonError(ResponseCode.UNAUTHORIZED, ResponseBodyCode.LOGIN.USER_NOT_ACTIVE, 'User is not active!')
        }
        const isMatchPassword = await user.isMatchPasswordSync(password)
        if (!isMatchPassword) {
            throw new CommonError(ResponseCode.UNAUTHORIZED, ResponseBodyCode.LOGIN.PASSWORD_INCORRECT, 'Password incorrect')
        }

        const result = this.getResult(user);
        return result;
    }

    //Login new user follow Fb, Gg
    async authenticateSSOUser(resquestBody, userType) {
        const {email} = resquestBody;
        const user = await userDAO.getUserByEmail(email);

        const userTypeStr = userType === UserType.FB_LOGIN_USER ? 'Facebook' : 'Google';
        if (user) {
            if (user.type !== userTypeStr) {
                throw new CommonError(ResponseCode.UNAUTHORIZED, undefined, `This is not ${userTypeStr} user!`)
            }
            var newUser = new UserSchema(Object.assign(user, resquestBody));
        } else {
            newUser = new UserSchema(Object.assign({type: userType}, resquestBody));
        }
        await userDAO.insertRecord(newUser);
        const result = await this.getResult(newUser)
        return result;
    }

    getResult(user) {
        const { email, firstName, lastName } = user;
        const accessToken = user.generateAccessToken();

        const result = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            access_token: accessToken
        }

        return result;
    }


}

export default AuthService;