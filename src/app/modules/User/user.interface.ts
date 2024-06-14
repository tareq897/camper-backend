
export type Tuser = {
    name : string;
    email : string;
    role : 'admin' | 'user' ;
    password : string;
    phone : string;
    address : string;
    isDeleted: boolean;


}