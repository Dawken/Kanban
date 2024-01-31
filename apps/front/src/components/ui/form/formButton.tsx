import React from 'react'
import { CircularProgress } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { ApolloError } from '@apollo/client'

type FormButtonProps = {
    loading: boolean
    isError?: boolean | ApolloError
    text: string
}
const FormButton = ({ loading, isError, text }: FormButtonProps) => {
    return (
        <button className='w-full flex justify-center items-center text-black text-sm font-bold h-12 border-none rounded uppercase bg-gradient-to-r from-[#00dffc] to-[#00ff82]'>
            {loading ? (
                <CircularProgress size={25} />
            ) : !isError ? (
                text
            ) : (
                <ClearIcon />
            )}
        </button>
    )
}

export default FormButton
