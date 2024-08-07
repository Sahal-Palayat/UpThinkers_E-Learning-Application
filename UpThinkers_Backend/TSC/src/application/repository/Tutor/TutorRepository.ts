import { Tutor } from "../../entities/tutor";
import TutorModel from "../../../frameworks/database/models/tutor";
import { TutorRepository } from "../../interfaces/repositories/tutor-repository";
import { SignupDataTutor } from "../../entities/signUpDataTutor";
import { genAccessToken, genRefreshToken } from "../../functions/CommonFunctions";
import otpModel from "../../../frameworks/database/models/otp";
import CourseModel from "../../../frameworks/database/models/course";
import { Course } from "../../entities/course";
import { Category } from "../../entities/category";
import CategoryModel from "../../../frameworks/database/models/category";
import { Lesson } from "../../entities/lesson";
import LessonModel from "../../../frameworks/database/models/lesson";
import mongoose from "mongoose";
import { User } from "../../entities/user";
import UserModel from "../../../frameworks/database/models/user";
import OrderModel from "../../../frameworks/database/models/order";
import { Order } from "../../entities/order";
import { CourseDetails, RevenueDetails, studCourse } from "../../interfaces/customInterfaces/customInterface";
import { compare } from "bcrypt";



export class TutorRepositoryImpl implements TutorRepository {
    async save(user: Tutor): Promise<{ tutor: Tutor | null, tutorToken: string | null, refreshToken: string | null }> {

        try {


            console.log('repositoryy');

            const { Name, Email, Mobile, Password } = user
            console.log(user, 'lasttt');


            const newTutor = new TutorModel({ Name, Email, Mobile, Password })
            console.log(newTutor, 'new userrrrrrrrrrrrrrrrrr');

            await newTutor.save()

            let tutorToken = await genAccessToken(user, 'tutor')
            let refreshToken = await genRefreshToken(user, 'tutor')
            console.log('tokennn', tutorToken);
            return { tutor: newTutor ? newTutor.toObject() as Tutor : null, tutorToken, refreshToken }
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async tutorExists(email: string): Promise<boolean> {
        const tutorExists = await TutorModel.findOne({ Email: email });
        return !!tutorExists;
    }

    async saveToDB(signupData: SignupDataTutor, otp: string): Promise<boolean> {
        try {
            console.log('redyyy');

            const { name, email, password, mobile } = signupData
            console.log(signupData);

            const isAddedToDb = await otpModel.insertMany({ Name: name, Email: email, Password: password, Mobile: mobile, otp: otp })
            return isAddedToDb ? true : false

        } catch (error) {
            console.error("Error saving data to database:", error);
            return false;
        }
    }

    async verifyotp(otp: string): Promise<Tutor | null> {
        try {
            console.log('3', otp);

            const tutor = await otpModel.findOne({ otp: otp });
            console.log('user', tutor);

            return tutor ? tutor as unknown as Tutor : null;
        } catch (error) {
            console.error('Error verifying OTP from database:', error);
            return null;
        }
    }

    async findCredentials(email: string, password: string): Promise<{ tutor: Tutor | null, tutorToken: string | null, message: string }> {


        try {

            console.log('user repositoryyyy');
            console.log(email, password);

            const tutor = await TutorModel.findOne({ Email: email })

            console.log(tutor)

            let message = ''
            let tutorToken = null


            if (!tutor) {
                message = ' invalid user'
            } else {
                if (!await compare(password,tutor.Password)) {
                    console.log('invalid password');
                    message = 'Invalid Password'
                } else {
                    tutorToken = await genAccessToken(tutor, 'tutor')
                    console.log('token', tutorToken);
                }
            }

            if (tutor && !message) {
                return { tutor: tutor.toObject() as Tutor, message, tutorToken }
            } else {
                console.log('message222', message);

                return { tutor: null, message, tutorToken };
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async getUsers(): Promise<Tutor[] | []> {
        try {
            const tutors: Tutor[] = await TutorModel.find();
            return tutors
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }

    async updateOTP(emailId: string, newOtp: string): Promise<boolean> {
        try {
            const isUpdateOTP = await otpModel.findOneAndUpdate(
                { Email: emailId },
                { $set: { otp: newOtp } }
            );
            return isUpdateOTP != null;
        } catch (error) {
            console.log(error);
            throw new Error();
        }
    }

    async addCourse(course: Course): Promise<{ course: Course | null }> {
        try {

            const newCourse = new CourseModel(course)
            await newCourse.save()
            return { course: newCourse as Course | null };
        } catch (error) {
            console.log(error);
            throw error
        }
    }


    async getCategory(): Promise<Category[] | []> {
        try {
            const category: Category[] = await CategoryModel.find();
            return category

        } catch (error) {
            console.log(error);
            throw error

        }
    }

    async getCourse(tutorId:string): Promise<Course[] | []> {
        try {
            const courses: Course[] = (await CourseModel.find({isDeleted: false})).filter(item => item.TutorId+"" === tutorId);
            return courses

        } catch (error) {
            console.log(error);
            throw error
 
        }

    }


    async editCourse(id: string, course: Course): Promise<{ course: Course | null; }> {
        try {

            const updatedCourse = await CourseModel.findOneAndUpdate({ _id: id }, { $set: course }, { new: true });
            return { course: updatedCourse as Course | null };

        } catch (error) {
            console.log(error);
            throw error

        }
    }

    async deleteCourse(id: string): Promise<Course | null> {
        try {
            const deletedCourse = await CourseModel.findOneAndUpdate(
                { _id: id },
                { isDeleted: true, deletedAt: new Date() },
                { new: true }
              );
              return deletedCourse as Course | null;
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async addLesson(lesson: Lesson): Promise<{ lesson: Lesson }> {
        try {
            const newLesson = new LessonModel(lesson)
            await newLesson.save()
            return { lesson: newLesson as Lesson }

        } catch (error) {
            console.log(error);
            throw error

        }
    }

    async getLessons(id: string): Promise<Course | null> {
        try {
            // const lessons: Lesson[] = await LessonModel.aggregate([
            //     {
            //         $lookup: {
            //             from: 'courses', 
            //             localField: 'Course', 
            //             foreignField: '_id', 
            //             as: 'courseDetails'
            //         }
            //     },
            //     {
            //         $match: {
            //             'courseDetails._id': new mongoose.Types.ObjectId(id) 
            //         }
            //     },
            //     {
            //         $unwind: '$courseDetails' 
            //     }
            // ]);
            // return lessons
            const [data]: Course[] = await CourseModel.aggregate([{
                $match: { _id: new mongoose.Types.ObjectId(id) },
            },
            {
                $lookup: {
                    from: "lessons",
                    localField: "_id",
                    foreignField: "Course",
                    as: "lessons"
                }
            }
            ])
            return data
        } catch (error) {
            console.log(error);
            return null
        }
    }



    async getStudents(courseId: string): Promise<studCourse[] | []> {
        try {
            const order = await OrderModel.find({ CourseId: courseId })
            const data = await Promise.all(order.map(async (item) => {
                const student = await UserModel.findById(item.StudentId);
                const course = await CourseModel.findById(item.CourseId)
                return {
                    studentName: student?.Name + "",
                    courseName: course?.Name + "",
                    studentId:student?._id+""
                }
            }))
            return data
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }

    async getTutorById(tutorId: string): Promise<Tutor|null>{
        try {
            return await TutorModel.findById(tutorId);
            
        } catch (error) {
            console.log(error);
            return null   
        }

    }



     async  getRevenueDetails(tutorId: string): Promise<RevenueDetails | null> {
      try {
        
        const orders = await OrderModel.find({ TutorId: tutorId });
        
       
        const countOrder = orders.length;
        if (countOrder === 0) return null;
    
        let totalRevenue = 0;
        let weeklySales = 0;
        let monthlySales = 0;
        
        const currentDate = new Date();
        const oneWeekAgo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
        const oneMonthAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
    
        const courseDetails: CourseDetails[] = [];
        const studentDetails: User[] = [];
        const studentIds = new Set<string>();
    
        for (const order of orders) {
          const orderDate = new Date(order.CreatedAt);
          const price = Number(order.Price);
    
          totalRevenue += price;
    
          if (orderDate >= oneWeekAgo) {
            weeklySales += price;
          }
    
          if (orderDate >= oneMonthAgo) {
            monthlySales += price;
          }
    
       
          studentIds.add(order.StudentId.toString());
    


         const student=await UserModel.findById(order.StudentId);
          if(student){
            studentDetails.push({
              _id: student._id,
              Name: student.Name,
              Password: student.Password,
              Email: student.Email,
              Mobile: student.Mobile,
              Image: student.Image,
              CreatedAt: student.CreatedAt,
            });
          }


          const course = await CourseModel.findById(order.CourseId);
          if (course) {
            courseDetails.push({
              Name: course.Name,
              Description: course.Description,
              Price: course.Price,
              Duration: course.Duration,
              CreatedAt: course.CreatedAt,
              UpdatedAt: course.UpdatedAt,
            });
          }
        }
    
        const uniqueStudentCount = studentIds.size;
        const tutorsCount = await TutorModel.countDocuments();

    
        return {
          countOrder,
          totalRevenue,
          weeklySales,
          monthlySales,
          courses: courseDetails,
          uniqueStudentCount,
          students: studentDetails,
          tutorsCount
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    }

   
}