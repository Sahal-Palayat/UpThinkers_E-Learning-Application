import {Router} from 'express'
const userRouter:Router = Router()
import {UserController} from '../controller/UserController'
import { MailerImp } from '../../application/external-lib/mailer'
import { UserRepositoryImpl } from '../../application/repository/User/UserRepository'
import { UserInteractorImpl } from '../../application/usecases/User'
import { userAuth } from '../middlewares/authmiddleware'
import { CourseController } from '../controller/CourseController'
import * as chatController from '../controller/ChatController'

const repository = new UserRepositoryImpl()
const mailer= new MailerImp()
const interactor= new UserInteractorImpl(repository,mailer)
const controller = new UserController(interactor)

userRouter.post('/register',controller.register.bind(controller))
userRouter.post('/sendMail',controller.sendMail.bind(controller))
userRouter.post('/verifyOtp',controller.verifyOtp.bind(controller))
userRouter.post('/resendMail/:emailId', controller.resendMail.bind(controller));
userRouter.post('/login',controller.login.bind(controller))  
userRouter.post('/googlauth',controller.googleAuth.bind(controller)) 
// userRouter.get('/home',userAuth,controller.getHome.bind(controller))


userRouter.get('/categorylist',controller.getCategory.bind(controller))
userRouter.get('/courselist',controller.getCourse.bind(controller))
userRouter.post('/placeorder',userAuth,controller.placeOrder.bind(controller))
userRouter.get('/tutorslist',userAuth,controller.getTutors.bind(controller))
userRouter.get('/tutorcourses/:tutorId',userAuth,controller.getTutorCourse.bind(controller))  
userRouter.get('/enrolledcourses/:userId',userAuth,controller.getEnrolledCourse.bind(controller))
userRouter.post('/addimage/:userId',userAuth,controller.addImage.bind(controller))
userRouter.get('/getuserbyid',userAuth,controller.getUserById.bind(controller))


//-----------------------------chat -------------------------------------
userRouter.get('/getChatOfUser',userAuth,chatController.getChatOfUser)
userRouter.get('/setAllMessageSeen', userAuth, chatController.setAllMessageSeen)
userRouter.get('/getExistingChatsOfUser',userAuth,chatController.getNewChats)
userRouter.get('/getchats',chatController.getChats)



userRouter.post('/videoseen/:lessonId/:userId',userAuth,controller.videoSeen.bind(controller))
userRouter.get('/getcertificate/:userId/:courseId',userAuth,controller.getCertificate.bind(controller))

export default userRouter;     