import { IsString } from 'class-validator'

interface Login {
    login: string
    password: string
}

export class LoginDTO implements Login {
    @IsString()
    login: string

    @IsString()
    password: string
}
