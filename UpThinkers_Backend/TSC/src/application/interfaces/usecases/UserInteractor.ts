import { User } from "../../entities/user";
import { SignupData } from "../../entities/signupData";

export interface UserInteractor {
    register(userData: { FirstName: string, Password: string, Email: string, Mobile: number }): Promise<{ user: User | null, token: string | null }>;
    sendMail(signupData: SignupData): Promise<{ userExists: boolean, isMailSent: boolean }>
    verifyOtp(otp: string): Promise<{ success: boolean, token: string | null }>;

}