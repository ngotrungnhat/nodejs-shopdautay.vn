import crypto from "crypto";

const EMAIL_MIN_LENGTH = 6;
const EMAIL_MAX_LENGTH = 128;
const PASS_WORD_MIN_LENGTH = 6;
const PASS_WORD_MAX_LENGTH = 24;
const USER_NAME_MIN_LENGTH = 4;
const USER_NAME_MAX_LENGTH = 16;
const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 128;
const CODE_MIN_LENGTH = 4;
const CODE_MAX_LENGTH = 24;

const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PHONE_NUMBER_REGEX = /((09|03|07|08|05)+([0-9]{8})\b)/g;
const PASSWORD_REGEX = /^[-\w\.\$@\*\!]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9\_\.]+$/;
const NAME_REGEX = new RegExp(
    /^[a-zA-Z0-9\ẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴẮẰẲẴẶĂẤẦẨẪẬÂÁÀẢÃẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒỎÕỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ\ ]+$/,
    "i"
);
const CODE_REGEX = /^[a-zA-Z0-9\_\-]+$/;

class DataUtils {

    static isHasValue(value) {
        return value !== null && value !== "" && value !== undefined &&  !!value.toString().trim();
    };

    static isNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    static isValidCommonText(value) {
        const byteLength = Buffer.byteLength(text, "utf-8");
        return byteLength <= TEXT_MAX_BYTE;
    }

    static isValidEmailAddress(emailAddress) {
        const length = emailAddress ? emailAddress.length : 0;
        return length >= EMAIL_MIN_LENGTH && length <= EMAIL_MAX_LENGTH && EMAIL_REGEX.test(emailAddress);
    }

    static isValidPhoneNumber(phoneNumber) {
        return PHONE_NUMBER_REGEX.test(phoneNumber);
    }

    static isValidPassword(password) {
        const length = password ? password.length : 0;
        return length >= PASS_WORD_MIN_LENGTH && length <= PASS_WORD_MAX_LENGTH && PASSWORD_REGEX.test(password);
    }

    static isValidUserName(username) {
        const length = username ? username.length : 0;
        return length >= USER_NAME_MIN_LENGTH && length <= USER_NAME_MAX_LENGTH && USERNAME_REGEX.test(username);
    }

    static isValidName(name) {
        const length = name ? name.length : 0;
        return length >= NAME_MIN_LENGTH && length <= NAME_MAX_LENGTH && NAME_REGEX.test(name);
    }

    static isValidCode(code) {
        const length = code ? code.length : 0;
        return length >= CODE_MIN_LENGTH && length <= CODE_MAX_LENGTH && CODE_REGEX.test(code);
    }

    static randomKey() {
        const length = length > 0 ? length : 3
        return crypto
                .randomBytes(length)
                .toString("hex")
                .toUpperCase()
    }


}

export default DataUtils; 