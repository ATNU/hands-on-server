export interface CreateUserDto  {
    readonly username: string;
    readonly email: string;
    password: string;
    furthestPage: number;
}
