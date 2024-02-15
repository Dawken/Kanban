import React, { useEffect, useRef } from 'react'
import { CircularProgress, TextField } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import useTextState from '@src/hooks/useTextState'

type AddContentTextFieldProps = {
    closeNewStatus: () => void
    createContent: (text: string, parentId: string) => void
    parentId: string
    isCreating: boolean
    multiline?: boolean
    defaultText?: string
    isSmallField?: boolean
    fontSize?: number
}
const AddContentTextField = ({
    closeNewStatus,
    createContent,
    parentId,
    isCreating,
    multiline,
    defaultText,
    isSmallField,
    fontSize,
}: AddContentTextFieldProps) => {
    const { text, handleChange } = useTextState(defaultText)

    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        inputRef.current && inputRef.current.focus()
    }, [])

    const addContent = () => {
        createContent(text, parentId)
        closeNewStatus()
    }

    return (
        <div className='relative w-full'>
            <TextField
                fullWidth
                inputRef={inputRef}
                value={text}
                onChange={(event) => handleChange(event.target.value)}
                size={isSmallField ? 'small' : 'medium'}
                multiline={multiline}
                inputProps={{
                    style: {
                        fontSize: fontSize ? fontSize : isSmallField ? 11 : 16,
                    },
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        addContent()
                    }
                }}
            />
            <div className='absolute z-10 right-0 bg-black ml-auto w-fit h-12 flex justify-center items-center gap-2 rounded p-2'>
                <button
                    className='bg-zinc-800 p-1 rounded w-8 h-8 hover:bg-zinc-700 flex items-center justify-center'
                    onClick={() => {
                        addContent()
                    }}
                >
                    {isCreating ? (
                        <CircularProgress size={15} className='text-white' />
                    ) : (
                        <DoneIcon className='text-sm' />
                    )}
                </button>
                <button
                    className='bg-zinc-800 p-1 rounded w-8 h-8 hover:bg-zinc-700'
                    onClick={closeNewStatus}
                >
                    <CloseIcon className='text-base' />
                </button>
            </div>
        </div>
    )
}

export default AddContentTextField
