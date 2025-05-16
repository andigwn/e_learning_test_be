export class RegisterUsersRequest {
    username: string;
    password: string;
    id_role: number
}

export class UsersResponse {
    id_users?: number;
    username: string;
    id_role: number;
    token?: string;
}

export class LoginUsersRequest {
    username: string;
    password: string;
}

export class UpdateUserRequst {
    id_role?: number 
    password?: string
}