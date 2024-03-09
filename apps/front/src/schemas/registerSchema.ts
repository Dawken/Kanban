import { object, string, TypeOf } from 'zod'

const registerSchema = object({
    login: string().trim().min(3, 'Login requires 3 characters'),
    name: string().trim().min(3, 'Require 3 characters'),
    lastName: string().trim().min(3, 'Require 3 characters'),
    password: string()
        .trim()
        // Check password includes at least 1 capital letter, 1 special symbol and has at least 8 symbols
        .regex(
            /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
            "Password isn't strong enough!"
        )
        .min(8),
    repeatPassword: string()
        .trim()
        .regex(
            /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
            'Passwords do not match!'
        ),
}).refine((data) => data.password.trim() === data.repeatPassword.trim(), {
    path: ['repeatPassword'],
    message: 'Passwords do not match',
})

export type RegisterInput = TypeOf<typeof registerSchema>

export default registerSchema
