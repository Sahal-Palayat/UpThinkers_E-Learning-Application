import { Request, Response, NextFunction } from "express"
import { TutorInteractor } from "../../application/interfaces/usecases/TutorInteractor"


export class CourseController {
    constructor(private readonly interactor: TutorInteractor) { }


    async addCourse(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body);
            const { name, description, price, duration, selectedCategory, img,tutorId} = req.body
                
            console.log( name, description, price, duration, selectedCategory, img,tutorId);
            const success = await this.interactor.addCourse({Name:name,Description:description,Duration:duration,Price:price,Category:selectedCategory,Image:img,OfferPrice:price,lessons:[],Status:true,CreatedAt:new Date,UpdatedAt:new Date,TutorId:tutorId})
            if (success) {
                res.status(200).json({ success: true, message: 'Category added successfully.' });
            } else {
                res.status(302).json({ success: false, message: 'Failed to add category.' });
            }
        } catch (error) {
            console.error('Error adding category:', error);
            res.status(500).json({ success: false, message: 'Internal server error.' });
        }

    }


    
    async getCourse(req:Request, res: Response, next: NextFunction) {
        
        try {
            console.log('coursilek keri');
            const course = await this.interactor.getCourse(req.query.tutorId as string);
            res.status(200).json(course);
            
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
            
        }

    
    }


    async editCourse(req:Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { name, description, price, duration, category, img } = req.body;
            console.log(id, name, description, price, duration, category, img);
            const success = await this.interactor.editCourse(id, {
                Name: name, Description: description, Duration: duration, Price: price, Category: category, Image: img, OfferPrice: price, Status: true, CreatedAt: new Date, UpdatedAt: new Date,
                lessons: [],
                Tutor: ""
            });
            if (success) {
                res.status(200).json({ success: true, message: 'Category updated successfully.' });
            } else {
                res.status(302).json({ success: false, message: 'Failed to update category.' });
            }
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error.' });
            
        }
    }

    async deleteCourse(req: Request, res: Response,next: NextFunction) {
        try {
            const { id } = req.params;
            console.log(id);
            const success = await this.interactor.deleteCourse(id);
            if (success) {
                console.log('deleted success');
                
                res.status(200).json({ success: true, message: 'Category deleted successfully.' });
            } else {
                res.status(302).json({ success: false, message: 'Failed to delete category.' });
            }
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error.' });
            
        }
    }


    async addLesson (req:Request, res: Response, next: NextFunction) {
        try {

            console.log('lesonnnnnnnn');
            const {id}= req.params
            const {title,content,img,vdo,pdf}= req.body  

            console.log(id,title,content,img,vdo,pdf);
            const success = await this.interactor.addLesson({Title:title,Content:content,Image:img,Video:vdo,Documents:pdf,Course:id});
            if (success) {
                res.status(200).json({ success: true, message: 'Lesson added successfully.' });
            } else {
                res.status(302).json({ success: false, message: 'Failed to add lesson.' });
            }
        } catch (error) {
            console.log();
            res.status(500).json({ success: false, message: 'Internal server error.' });
            
        } 
    }

    async getLessons( req:Request,res:Response,next:NextFunction){
        try {

            const {id}= req.params
            console.log(id);
            const lessons = await this.interactor.getLessons(id);
            res.status(200).json(lessons);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message:'internal server error'})
            
        }
    }



    async getStudents(req:Request,res:Response,next:NextFunction){
        try {
            console.log(req.params);
            
            const {courseId,tutorId}=req.params
            const students = await this.interactor.getStudents(courseId);
            
            res.status(200).json(students);
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message:'internal server error'})
            
        }
    }

}