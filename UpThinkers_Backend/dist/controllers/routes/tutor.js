"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tutorRouter = (0, express_1.Router)();
const TutorController_1 = require("../controller/TutorController");
const mailer_1 = require("../../application/external-lib/mailer");
const Tutor_1 = require("../../application/usecases/Tutor");
const TutorRepository_1 = require("../../application/repository/Tutor/TutorRepository");
const authmiddleware_1 = require("../middlewares/authmiddleware");
const CourseController_1 = require("../controller/CourseController");
const repository = new TutorRepository_1.TutorRepositoryImpl();
const mailer = new mailer_1.MailerImp();
const interactor = new Tutor_1.TutorInteractorImpl(repository, mailer);
const controller = new TutorController_1.TutorController(interactor);
const courseController = new CourseController_1.CourseController(interactor);
tutorRouter.post('/register', controller.register.bind(controller));
tutorRouter.post('/sendMail', controller.sendMail.bind(controller));
tutorRouter.post('/verifyOtp', controller.verifyOtp.bind(controller));
tutorRouter.post('/resendMail/:emailId', controller.resendMail.bind(controller));
tutorRouter.post('/login', controller.login.bind(controller));
tutorRouter.get('/categorylist', authmiddleware_1.tutorAuth, controller.getCategory.bind(controller));
tutorRouter.post('/addcourse', courseController.addCourse.bind(courseController));
tutorRouter.get('/courselist', courseController.getCourse.bind(courseController));
tutorRouter.delete('/deletecourse/:id', authmiddleware_1.tutorAuth, courseController.deleteCourse.bind(courseController));
tutorRouter.put('/editcourse/:id', authmiddleware_1.tutorAuth, courseController.editCourse.bind((courseController)));
tutorRouter.post('/addlesson/:id', authmiddleware_1.tutorAuth, courseController.addLesson.bind(courseController));
tutorRouter.get('/getlessons/:id', authmiddleware_1.tutorAuth, courseController.getLessons.bind(courseController));
tutorRouter.get('/getstudents', courseController.getStudents.bind(courseController));
exports.default = tutorRouter;
