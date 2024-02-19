import React, { useEffect, useRef } from 'react'
import { CircularProgress, TextareaAutosize } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import useTextState from '@src/hooks/useTextState'

type AddContentTextFieldProps = {
    closeNewStatus: () => void
    createContent: (text: string, parentId: string) => void
    parentId: string
    isCreating: boolean
    isSingleRow?: boolean
    defaultText?: string
}
const AddContentTextField = ({
    closeNewStatus,
    createContent,
    parentId,
    isCreating,
    isSingleRow,
    defaultText,
}: AddContentTextFieldProps) => {
    const { text, handleChange } = useTextState(defaultText)

    const addContent = () => {
        createContent(text, parentId)
        closeNewStatus()
    }

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus()
            textareaRef.current.setSelectionRange(
                textareaRef.current.value.length,
                textareaRef.current.value.length
            )
        }
    }, [])

    console.log(text, parentId)

    return (
        <div className='relative'>
            <TextareaAutosize
                ref={textareaRef}
                value={text}
                onChange={(event) => handleChange(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        addContent()
                    }
                }}
                className={`w-full h-full border-2 border-transparent focus:border-blue-600 p-1.5 rounded outline-none bg-transparent ${
                    isSingleRow && 'whitespace-nowrap'
                } transition-colors duration-500 ease-in-out overflow-x-hidden resize-none`}
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
                        <DoneIcon className='text-base' />
                    )}
                </button>
                <button
                    className='bg-zinc-800 p-1 rounded w-8 h-8 hover:bg-zinc-700 flex items-center justify-center'
                    onClick={closeNewStatus}
                >
                    <CloseIcon className='text-base' />
                </button>
            </div>
        </div>
    )
}

export default AddContentTextField
