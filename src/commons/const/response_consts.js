export const ErrorCode = {
    INVALID_PARAM: "Invalid parameter",
    CONFLICT: 'Conflict',
}

export const ErrorMessage = {
    VALIDATION_FAILED: "Validation failed",
    UNAUTHORIZED: "Unauthorized",
    FORBIDDEN: "Forbidden",
    NOT_FOUND: "Not found",
    CONFLICT: "Conflict"
}


export const LocationType = {
    BODY: 'body',
    QUERY: 'query',
}

export const ResponseCode = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    VALIDATION_FAILED: 400,
    MISS_FIELD: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
}

export const ResponseBodyCode = {
    COMMON: {
        OK: "ok"
    },
    LOGIN: {
        USER_NOT_FOUND: 'user not found',
        USER_NOT_ACTIVE: 'user not active',
        PASSWORD_INCORRECT: 'password incorrect'
    },
    TOKEN_AUTH: {
        NO_TOKEN: 'no token',
        INVALID_TOKEN: 'invalid token'
    },
    ACTIVE_USER: {
        CODE_NOT_MATCH: 'code not match',
        CODE_EXPIRED: 'code expired' 
    }
}
