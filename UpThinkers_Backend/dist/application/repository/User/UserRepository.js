"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryImpl = void 0;
const user_1 = __importDefault(require("../../../frameworks/database/models/user"));
const CommonFunctions_1 = require("../../functions/CommonFunctions");
const otp_1 = __importDefault(require("../../../frameworks/database/models/otp"));
const jwt = require('jsonwebtoken');
class UserRepositoryImpl {
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('repositoryy');
                const { Name, Email, Mobile, Password } = user;
                console.log(user, 'lasttt');
                const newUser = new user_1.default({ Name, Email, Mobile, Password });
                console.log(newUser, 'new userrrrrrrrrrrrrrrrrr');
                yield newUser.save();
                let token = yield (0, CommonFunctions_1.genAccessToken)(user, 'user');
                let refreshToken = yield (0, CommonFunctions_1.genRefreshToken)(user, 'user');
                console.log('tokennn', token);
                return { user: newUser ? newUser.toObject() : null, token, refreshToken };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    userExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield user_1.default.findOne({ Email: email });
            return !!userExists;
        });
    }
    saveToDB(signupData, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('redyyy');
                const { name, email, password, mobile } = signupData;
                console.log(signupData);
                const isAddedToDb = yield otp_1.default.insertMany({ Name: name, Email: email, Password: password, Mobile: mobile, otp: otp });
                return isAddedToDb ? true : false;
            }
            catch (error) {
                console.error("Error saving data to database:", error);
                return false;
            }
        });
    }
    verifyotp(otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('3', otp);
                const user = yield otp_1.default.findOne({ otp: otp });
                console.log('user', user);
                return user ? user : null;
            }
            catch (error) {
                console.error('Error verifying OTP from database:', error);
                return null;
            }
        });
    }
    findCredentials(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('user repositoryyyy');
                console.log(email, password);
                const user = yield user_1.default.findOne({ Email: email });
                console.log(user);
                let message = '';
                let token = null;
                if (!user) {
                    message = ' invalid user';
                }
                else if (user.isBlocked === true) {
                    message = 'user blocked';
                }
                else {
                    if (password !== user.Password) {
                        console.log('invalid password');
                        message = 'Invalid Password';
                    }
                    else {
                        token = yield (0, CommonFunctions_1.genAccessToken)(user, 'user');
                        console.log('token', token);
                    }
                }
                if ((user === null || user === void 0 ? void 0 : user.isBlocked) === false && !message) {
                    return { user: user.toObject(), message, token };
                }
                else {
                    console.log('message222', message);
                    return { user: null, message, token };
                }
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.find();
                return users;
            }
            catch (error) {
                console.error('Error fetching users:', error);
                return [];
            }
        });
    }
    updateOTP(emailId, newOtp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isUpdateOTP = yield otp_1.default.findOneAndUpdate({ Email: emailId }, { $set: { otp: newOtp } });
                return isUpdateOTP != null;
            }
            catch (error) {
                console.log(error);
                throw new Error();
            }
        });
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
