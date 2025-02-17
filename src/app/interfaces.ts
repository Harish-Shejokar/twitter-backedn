export interface JWTUser {
    id : string;
    email : string;
} 

export interface GraphqlContext{
    user? : JWTUser;
}

// ?-mark mean that user "can be" or type - JWTUser