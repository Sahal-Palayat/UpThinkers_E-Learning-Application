"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
const UserController_1 = require("../controller/UserController");
const mailer_1 = require("../../application/external-lib/mailer");
const UserRepository_1 = require("../../application/repository/User/UserRepository");
const User_1 = require("../../application/usecases/User");
const authmiddleware_1 = require("../middlewares/authmiddleware");
const repository = new UserRepository_1.UserRepositoryImpl();
const mailer = new mailer_1.MailerImp();
const interactor = new User_1.UserInteractorImpl(repository, mailer);
const controller = new UserController_1.UserController(interactor);
userRouter.post('/register', controller.register.bind(controller));
userRouter.post('/sendMail', controller.sendMail.bind(controller));
userRouter.post('/verifyOtp', controller.verifyOtp.bind(controller));
userRouter.post('/resendMail/:emailId', controller.resendMail.bind(controller));
userRouter.post('/login', controller.login.bind(controller));
userRouter.post('/googlauth', controller.googleAuth.bind(controller));
// userRouter.get('/home',userAuth,controller.getHome.bind(controller))
userRouter.get('/categorylist', authmiddleware_1.userAuth, controller.getCategory.bind(controller));
userRouter.get('/courselist', authmiddleware_1.userAuth, controller.getCourse.bind(controller));
userRouter.post('/placeorder', authmiddleware_1.userAuth, controller.placeOrder.bind(controller));
userRouter.get('/tutorslist', authmiddleware_1.userAuth, controller.getTutors.bind(controller));
userRouter.get('/tutorcourses/:tutorId', authmiddleware_1.userAuth, controller.getTutorCourse.bind(controller));
exports.default = userRouter;
