import JWT from 'jsonwebtoken';
import { JWTUser } from '../app/interfaces';
import { User } from '../app/user';

const jwtSecret = process.env.JWT_SECRET as string;

 class JWTServices {
    public static genrateTokenForUser(User : any){
        const payload :JWTUser = {
            id : User?.id,
            email : User?.email,
        }
        const token = JWT.sign(payload, jwtSecret );
        return token
    }

    public static decodeToken(token : string){
       try {
           const payload = JWT.verify(token, jwtSecret) as JWTUser;
        return payload;
       } catch (error) {
          console.log('error in decode',error);
          return null;
       }
    }
}

export default JWTServices; 