import React from 'react'
import { CircularProgress } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { ApolloError } from '@apollo/client'

type FormButtonType = {
    loading: boolean
    error?: ApolloError
    text: string
}
const FormButton = ({ loading, error, text }: FormButtonType) => {
    return (
        <button className='w-full flex justify-center items-center text-black font-bold h-12 border-none rounded uppercase bg-gradient-to-r from-[#00dffc] to-[#00ff82]'>
            {loading ? (
                <CircularProgress size={25} />
            ) : !error ? (
                text
            ) : (
                <ClearIcon />
            )}
        </button>
    )
}

export default FormButton
