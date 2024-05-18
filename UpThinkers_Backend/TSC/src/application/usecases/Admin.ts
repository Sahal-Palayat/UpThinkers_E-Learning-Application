import { AdminRepository } from "../interfaces/repositories/admin-repository";
import { genRefreshToken } from "../functions/CommonFunctions";
import { User } from "../entities/user";
import { AdminInteractor } from "../interfaces/usecases/AdminInteractor";





export class AdminInteractorImpl implements AdminInteractor {
    constructor(private readonly Repository: AdminRepository) {
        // this.Repository.save()
    }


    
    async login(credentials: { email: string, password: string }): Promise<{ user: User | null, message: string, token: string | null, refreshToken: string | null }> {
        try {



            const { user, message, token }: {
                user: User | null,
                message: string,
                token: string | null
            } = await this.Repository.findCredentials(credentials.email, credentials.password)
            console.log(user, token, message, 'loggggg');


            const refreshToken = user ? await genRefreshToken(user) : ''

            return { user, message, token, refreshToken }

        } catch (error) {
            console.log(error);
            throw error
        }
    }

}