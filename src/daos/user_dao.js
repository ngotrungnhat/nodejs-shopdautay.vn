import BaseDAO from './base_dao'
import UserSchema from './../schemas/user_schema'

class UserDAO extends BaseDAO {
    constructor() {
        super(UserSchema)
    }

    async getUserByEmail(email) {
        const conditions = {
            email: email,
        }
        const user = await UserSchema.findOne(conditions)
        return user
    }
}

export default UserDAO
