import { User } from "../../entities/user";
import { SignupData } from "../../entities/signupData";
import { Category } from "../../entities/category";
import { Course } from "../../entities/course";
import { Order } from "../../entities/order";
import { Tutor } from "../../entities/tutor";
import { Lesson } from "../../entities/lesson";

export interface UserRepository{
    save(user: User): Promise<{ user: User | null, token: string | null,refreshToken:string|null }>;
    userExists(email: string): Promise<boolean>;
    saveToDB(signupData: SignupData, otp: string): Promise<boolean>;
    verifyotp(otp: string): Promise<User | null>;
    googleAuth(user:User):Promise<{user:User | null ,token : string |null,refreshToken:string |null}>
    findCredentials (email : string,password: string): Promise <{user:User | null,message:string, token : string | null}> 
    getUsers():Promise<User[] | [] >;
    updateOTP(emailId: string,newOtp:string) : Promise<boolean>;
    getCategory():Promise<Category[] | []>
    getCourse():Promise<Course[] | []>
    placeOrder(order:Order):Promise<{order:Order | null}>
    getTutors():Promise<Tutor[] | [] >;
    getTutorCourse(tutorId:string):Promise<Course[]|[]>
    getEnrolledCourse(studentId:string):Promise<Course[]|[]>
    addImage(studentId:string,image:string):Promise<User[]|[]>
    getAllOrder():Promise<Order[] | []>
    getCourseById(id: string): Promise<Course | null>
    getUserById(userId:string):Promise<User|null>
    videoSeen(userId:string,lessonId:string):Promise<{lesson:Lesson|null,message:string}>
    getCertificate(userId:string,courseId:string): Promise<{ unseenCount: number }>

}