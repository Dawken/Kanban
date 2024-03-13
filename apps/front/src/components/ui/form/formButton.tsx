import React from 'react'
import { CircularProgress } from '@mui/material'

type FormButtonProps = {
    text: string
    loading?: boolean
}
const FormButton = ({ loading, text }: FormButtonProps) => {
    return (
        <button className='w-full flex justify-center items-center text-black text-sm font-bold h-12 border-none rounded uppercase bg-gradient-to-r from-[#00dffc] to-[#00ff82]'>
            {loading ? <CircularProgress size={25} /> : text}
        </button>
    )
}

export default FormButton
