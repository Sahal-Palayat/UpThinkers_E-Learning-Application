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
exports.adminAuth = exports.tutorAuth = exports.userAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
const Functions_1 = require("../../frameworks/database/Functions");
const CommonFunctions_1 = require("../../application/functions/CommonFunctions");
(0, dotenv_1.config)();
const getPayload = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET + '');
};
const userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ error: 'No token found' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token found' });
        }
        // let decoded: any = null
        const secret = process.env.JWT_SECRET || '';
        jsonwebtoken_1.default.verify(token, secret, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    console.log(err);
                    return res.status(401).json({ error: 'Invalid token' });
                }
                else if (err.name === 'TokenExpiredError') {
                    const userData = yield (0, Functions_1.getUsers)(data === null || data === void 0 ? void 0 : data._id);
                    const refresh = getPayload(userData.RefreshToken);
                    if (refresh && typeof refresh !== 'string' && (refresh === null || refresh === void 0 ? void 0 : refresh.exp)) {
                        const currentTime = Math.floor(Date.now() / 1000);
                        if (refresh.exp < currentTime) {
                            console.log("Token is expired");
                            return res.status(206).json({});
                        }
                        else {
                            const token = (0, CommonFunctions_1.genAccessToken)(userData.RefreshToken, 'user');
                            return res.status(205).json({ accessToken: token, user: userData });
                        }
                    }
                    else {
                        console.error("Invalid token payload");
                    }
                    // return res.status(402).json({ error: 'Token expired' });
                }
                else {
                    console.log(err);
                    return res.status(403).json({ error: 'Token verification failed' });
                }
            }
            if (!data || data.role !== "user" || !(0, Functions_1.checkobjectId)(data === null || data === void 0 ? void 0 : data.id)) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const user = yield (0, Functions_1.getUsers)(data === null || data === void 0 ? void 0 : data.id);
            console.log(user);
            if (!user || user.isBlocked) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            // req.user = user
            return next();
        }));
        // return res.status(401).json({ error: 'Unauthorized' })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.userAuth = userAuth;
const tutorAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ error: 'No token found' });
        }
        const tutorToken = authHeader.split(' ')[1];
        console.log(tutorToken, 'tutorrtokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
        if (!tutorToken) {
            return res.status(401).json({ error: 'No token found' });
        }
        let decoded = null;
        const secret = process.env.JWT_SECRET || '';
        jsonwebtoken_1.default.verify(tutorToken, secret, (err, data) => {
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    console.log(err);
                    return res.status(401).json({ error: 'Invalid token' });
                }
                else if (err.name === 'TokenExpiredError') {
                    console.log(err);
                    return res.status(309).json({ error: 'Token expired' });
                }
                else {
                    console.log(err);
                    return res.status(403).json({ error: 'Token verification failed' });
                }
            }
            if (data && (data === null || data === void 0 ? void 0 : data.role) === 'tutor') {
                console.log(data);
                data;
                next();
            }
            else {
                return res.status(401).json({ error: 'Unauthorized' });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.tutorAuth = tutorAuth;
const adminAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader, 'tokenano');
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ error: 'No token found' });
        }
        const adminToken = authHeader.split(' ')[1];
        console.log(adminToken, 'adminntokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
        if (!adminToken) {
            return res.status(401).json({ error: 'No token found' });
        }
        let decoded = null;
        const secret = process.env.JWT_SECRET || '';
        jsonwebtoken_1.default.verify(adminToken, secret, (err, data) => {
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    console.log(err);
                    return res.status(401).json({ error: 'Invalid token' });
                }
                else if (err.name === 'TokenExpiredError') {
                    console.log(err);
                    return res.status(402).json({ error: 'Token expired' });
                }
                else {
                    console.log(err);
                    return res.status(403).json({ error: 'Token verification failed' });
                }
            }
            if (data && (data === null || data === void 0 ? void 0 : data.role) === 'admin') {
                console.log(data);
                data;
                next();
            }
            else {
                return res.status(401).json({ error: 'Unauthorized' });
            }
        });
        // const user =await findUserById(decoded._id)
        // if(!user){
        //     return res.status(401).json({ error: 'Admin Details Not Found' });
        // }
    }
    catch (error) {
        console.log(error);
    }
});
exports.adminAuth = adminAuth;
