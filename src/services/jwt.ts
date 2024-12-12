import JWT from 'jsonwebtoken';
import {User} from "@prisma/client";
import { JWTUser } from '../app/interfaces';

const jwtSecret = process.env.JWT_SECRET as string;

 class JWTServices {
    public static genrateTokenForUser(User : User){
        const payload = {
            id : User.id,
            email : User.email,
        }
        const token = JWT.sign(payload, jwtSecret );
        return token
    }

    public static decodeToken(token : string){
       try {
        const payload = JWT.verify(token , jwtSecret) as JWTUser;
        return payload;
       } catch (error) {
          console.log(error);
          return null;
       }
    }
}

export default JWTServices; 