import { object, string } from 'zod'

const registerSchema = object({
    login: string()
        .nonempty('Login is required')
        .min(3, 'Login require at least 3 characters')
        .max(16, 'Login cannot be longer than 16 characters'),
    name: string()
        .nonempty('Name is required')
        .min(3, 'Name require at least 3 characters'),
    lastName: string()
        .nonempty('Last name is required')
        .min(3, 'Last name require at least 3 characters'),
    password: string()
        .nonempty('Password is required')
        // Check password includes at least 1 capital letter, 1 special symbol and has at least 8 symbols
        .regex(
            /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
            "Password isn't strong enough!"
        ),
    repeatPassword: string()
        .nonempty('Please confirm your password')
        .regex(
            /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
            'Passwords do not match!'
        ),
}).refine((data) => data.password === data.repeatPassword, {
    path: ['repeatPassword'],
    message: 'Passwords do not match',
})

export default registerSchema