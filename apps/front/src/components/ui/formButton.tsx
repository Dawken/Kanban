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
        <button className='w-full m-5 flex justify-center items-center text-black font-bold h-12 border-none rounded uppercase [transition:0.5s] [background-size:220%_auto] bg-[linear-gradient(to_right,_#00dffc_0%,_#00ff82_51%,_#00dffc_100%)] hover:bg-[right_center]'>
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
