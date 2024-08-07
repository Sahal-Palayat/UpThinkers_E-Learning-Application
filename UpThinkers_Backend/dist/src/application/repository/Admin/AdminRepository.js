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
exports.AdminRepositoryImpl = void 0;
const user_1 = __importDefault(require("../../../frameworks/database/models/user"));
const CommonFunctions_1 = require("../../functions/CommonFunctions");
const tutor_1 = __importDefault(require("../../../frameworks/database/models/tutor"));
const mongoose_1 = require("mongoose");
const category_1 = __importDefault(require("../../../frameworks/database/models/category"));
const order_1 = __importDefault(require("../../../frameworks/database/models/order"));
const course_1 = __importDefault(require("../../../frameworks/database/models/course"));
class AdminRepositoryImpl {
    findCredentials(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('user repositoryyyy');
                console.log(email, password);
                const user = yield user_1.default.findOne({ Email: email, isAdmin: true });
                console.log(user);
                let message = '';
                let adminToken = null;
                if (!user) {
                    message = ' invalid user';
                }
                else {
                    if (password !== user.Password) {
                        console.log('invalid password');
                        message = 'Invalid Password';
                    }
                    else {
                        adminToken = yield (0, CommonFunctions_1.genAccessToken)(user, 'admin');
                        console.log('token', adminToken);
                    }
                }
                if (user && !message) {
                    return { user: user.toObject(), message, adminToken };
                }
                else {
                    console.log('message222', message);
                    return { user: null, message, adminToken };
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
    getTutors() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tutors = yield tutor_1.default.find();
                return tutors;
            }
            catch (error) {
                console.error('Error fetching users:', error);
                return [];
            }
        });
    }
    blockUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (0, mongoose_1.isObjectIdOrHexString)(id);
                if (!result) {
                }
                const user = yield user_1.default.findById(id);
                if (!user) {
                }
                if (user) {
                    user.isBlocked = !user.isBlocked;
                    yield user.save();
                }
                return user ? user.toObject() : null;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    blockTutor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (0, mongoose_1.isObjectIdOrHexString)(id);
                if (!result) {
                }
                const tutor = yield tutor_1.default.findById(id);
                if (!tutor) {
                }
                if (tutor) {
                    tutor.isBlocked = !tutor.isBlocked;
                    yield tutor.save();
                }
                return tutor ? tutor.toObject() : null;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    addCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Name, Description } = category;
                const newCategory = new category_1.default({ Name, Description });
                yield newCategory.save();
                return { category: newCategory.toObject() };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_1.default.find();
                return category;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    editCategory(id, category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Name, Description } = category;
                const updateCategory = yield category_1.default.findByIdAndUpdate(id, { Name, Description }, { new: true });
                return updateCategory;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    categoryExists(Name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield category_1.default.find();
        });
    }
    getRevenueDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield order_1.default.find();
                const countOrder = orders.length;
                if (countOrder === 0)
                    return null;
                let totalRevenue = 0;
                let weeklySales = 0;
                let monthlySales = 0;
                const currentDate = new Date();
                const oneWeekAgo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
                const oneMonthAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
                const courseDetails = [];
                const studentDetails = [];
                const studentIds = new Set();
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
                    const student = yield user_1.default.findById(order.StudentId);
                    if (student) {
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
                    const course = yield course_1.default.findById(order.CourseId);
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
                const tutorsCount = yield tutor_1.default.countDocuments();
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
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
}
exports.AdminRepositoryImpl = AdminRepositoryImpl;
