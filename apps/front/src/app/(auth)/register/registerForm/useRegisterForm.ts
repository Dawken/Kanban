import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import registerSchema, {
    RegisterInput,
} from '../../../../schemas/registerSchema'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '@src/graphQL/auth/mutations'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const useRegisterForm = () => {
    const router = useRouter()

    const [createUser, { loading }] = useMutation(CREATE_USER, {
        onCompleted: () => {
            toast.success('Register succeed')
            router.push('/login')
        },
        onError: (error) => {
            if (error.message === 'user-exist') {
                toast.error('User already exist')
            } else {
                toast.error('Register failed')
            }
        },
    })

    const addUser = () => {
        return methods.handleSubmit((registerFormData) => {
            createUser({
                variables: registerFormData,
            })
        })
    }

    const methods = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    })

    const password = methods.watch('password')

    return {
        methods,
        password,
        addUser,
        loading,
    }
}

export default useRegisterForm
