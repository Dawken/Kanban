import React, { useEffect, useRef, useState } from 'react'
import { CircularProgress, TextareaAutosize } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import useTextState from '@src/hooks/useTextState'
import ToolTip from '@src/components/ui/toolTip'

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
    const [isTextEmpty, setIsTextEmpty] = useState(false)

    const { text, handleChange } = useTextState(defaultText)

    const addContent = () => {
        if (text.trim() === '') {
            setIsTextEmpty(true)
        } else if (defaultText !== text) {
            createContent(text, parentId)
            closeNewStatus()
        } else {
            closeNewStatus()
        }
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

    return (
        <div className='relative'>
            <ToolTip
                name={isTextEmpty ? 'Text cannot be empty' : ''}
                placement={'bottom-start'}
                open={true}
            >
                <TextareaAutosize
                    ref={textareaRef}
                    value={text}
                    onChange={(event) => {
                        handleChange(event.target.value)
                        if (event.target.value.trim() === '') {
                            setIsTextEmpty(true)
                        } else {
                            setIsTextEmpty(false)
                        }
                    }}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            addContent()
                        }
                        if (event.key === 'Enter' && text.trim() === '') {
                            event.preventDefault()
                        }
                    }}
                    className={`w-full h-full border-2 border-transparent ${
                        isTextEmpty ? 'border-red-600' : 'focus:border-blue-600'
                    } p-1.5 rounded outline-none bg-black ${
                        isSingleRow && 'whitespace-nowrap'
                    } transition-colors duration-500 ease-in-out overflow-x-hidden resize-none`}
                />
            </ToolTip>
            <div className='absolute z-10 right-0 ml-auto h-12 flex justify-center items-center gap-2 rounded'>
                <button
                    className={`${
                        isTextEmpty
                            ? 'cursor-not-allowed text-disabled'
                            : 'cursor-pointer'
                    } bg-black p-1 rounded w-8 h-8 hover:bg-zinc-700 flex items-center justify-center`}
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
                    className='bg-black p-1 rounded w-8 h-8 hover:bg-zinc-700 flex items-center justify-center'
                    onClick={closeNewStatus}
                >
                    <CloseIcon className='text-base' />
                </button>
            </div>
        </div>
    )
}

export default AddContentTextField
