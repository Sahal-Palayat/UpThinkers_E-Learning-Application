import { Document,ObjectId } from "mongoose";

export default interface CourseDocument extends   Document {
  
    Name:string,
    Status:boolean,
    Description:string,
    Image:string,
    Price:number,
    OfferPrice:number,
    Duration:string,
    Category:string,
    Students:string[],
    Lessons:[],
    Rating : number,
    TutorId:ObjectId,
    isApproved : boolean;
    isDeleted:boolean;
    CreatedAt:Date,
    UpdatedAt:Date,
}