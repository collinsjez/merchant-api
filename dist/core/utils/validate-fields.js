"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateFields = exports.REGEX = void 0;
exports.REGEX = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
class ValidateFields {
    static fieldsValidation(data) {
        let errors = {};
        for (const key in data) {
            if (ValidateFields.isFieldEmpty(data[key])) {
                errors[key] = `${key} field is required`;
            }
            else if (key === "email" && !exports.REGEX.test(data[key])) {
                errors[key] = `${key} is invalid`;
            }
        }
        return { errors, isValid: ValidateFields.isFieldEmpty(errors) };
    }
    static isFieldEmpty(value) {
        let returnValue = false;
        if (value === undefined || value === null ||
            typeof value === "object" && Object.keys(value).length === 0 ||
            typeof value === "string" && value.trim().length === 0) {
            returnValue = true;
        }
        return returnValue;
    }
}
exports.ValidateFields = ValidateFields;
