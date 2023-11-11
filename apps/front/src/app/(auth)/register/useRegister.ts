import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TypeOf } from 'zod'
import registerSchema from './registerSchema'

const useRegisterForm = () => {
    type RegisterInput = TypeOf<typeof registerSchema>

    const methods = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    })

    return {
        methods,
    }
}

export default useRegisterForm
