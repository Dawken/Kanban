import { IsString, Length, Matches } from 'class-validator'

interface Register {
  login: string
  password: string
  name: string
  lastName: string
}

export class RegisterDTO implements Register {
  @Length(3, 16)
  @IsString()
  login: string

  // Check password includes at least 1 capital letter, 1 special symbol and has at least 8 symbols
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/)
  password: string

  @Length(3)
  @IsString()
  name: string

  @Length(3)
  @IsString()
  lastName: string
}
