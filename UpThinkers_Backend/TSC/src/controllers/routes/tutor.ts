import {Router} from 'express'
const tutorRouter:Router = Router()
import { TutorController } from '../controller/TutorController';
import { MailerImp } from '../../application/external-lib/mailer';
import { TutorInteractorImpl } from '../../application/usecases/Tutor';
import { TutorRepositoryImpl } from '../../application/repository/Tutor/TutorRepository';
import { tutorAuth } from '../middlewares/authmiddleware';
import { CourseController } from '../controller/CourseController';
import {} from 'util-functions-nodejs'
import * as chatController from '../controller/ChatController'


const repository = new TutorRepositoryImpl()
const mailer= new MailerImp()
const interactor = new TutorInteractorImpl(repository,mailer)
const controller= new TutorController(interactor)
const courseController= new CourseController(interactor)


tutorRouter.post('/register',controller.register.bind(controller))
tutorRouter.post('/sendMail',controller.sendMail.bind(controller)) 
tutorRouter.post('/verifyOtp',controller.verifyOtp.bind(controller))
tutorRouter.post('/resendMail/:emailId', controller.resendMail.bind(controller));
tutorRouter.post('/login',controller.login.bind(controller)) 

 
tutorRouter.get('/categorylist',tutorAuth,controller.getCategory.bind(controller))
tutorRouter.post('/addcourse',courseController.addCourse.bind(courseController))
tutorRouter.get('/courselist',courseController.getCourse.bind(courseController))

tutorRouter.delete('/deletecourse/:id', tutorAuth,courseController.deleteCourse.bind(courseController));
tutorRouter.put('/editcourse/:id',tutorAuth,courseController.editCourse.bind((courseController)))
tutorRouter.post('/addlesson/:id',tutorAuth,courseController.addLesson.bind(courseController))
tutorRouter.get('/getlessons/:id',courseController.getLessons.bind(courseController))
tutorRouter.get('/getstudents/:courseId',tutorAuth,courseController.getStudents.bind(courseController))
tutorRouter.get('/gettutorbyid',controller.getByTutorId.bind(controller))

tutorRouter.get('/getrevuenu',tutorAuth,controller.getRevenueDetails.bind(controller))


tutorRouter.get('/getExistingChatsOfUser',tutorAuth,chatController.getNewChats)
tutorRouter.get('/getChatOfUser',tutorAuth,chatController.getChatOfUser)
tutorRouter.get('/getuserbyid',tutorAuth,chatController.getUserById)
  


export default tutorRouter;  