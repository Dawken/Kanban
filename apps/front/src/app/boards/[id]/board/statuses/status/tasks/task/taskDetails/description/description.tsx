import React from 'react'
import { CircularProgress, TextareaAutosize } from '@mui/material'
import CopyToClipboard from '@src/components/ui/copyToClipboard'
import useTextState from '@src/hooks/useTextState'
import useDescription from '@src/app/boards/[id]/board/statuses/status/tasks/task/taskDetails/description/useDescription'

type DescriptionProps = {
    description: string
    taskId: string
}
const Description = ({ description, taskId }: DescriptionProps) => {
    const { text, handleChange } = useTextState(description)

    const { isDescriptionUpdating, updateTaskDescription } =
        useDescription(taskId)

    return (
        <>
            <div className='flex items-end gap-2 w-full'>
                <TextareaAutosize
                    minRows={3}
                    spellCheck={false}
                    placeholder={'Edit description'}
                    value={text}
                    onChange={(event) => handleChange(event.target.value)}
                    className={`${
                        !text ? 'text-disabled' : 'text-white'
                    } w-full outline-none p-1.5 rounded border-2 border-[#474747] focus:border-blue-600 transition-colors duration-500 font-normal bg-transparent resize-none`}
                />
                <div className='flex justify-center mr-2'>
                    <CopyToClipboard text={text} />
                </div>
            </div>
            <div className='flex justify-start items-center gap-2 text-sm'>
                <button
                    className='w-16 h-8 hover:bg-blue-500 bg-blue-600 transition-all duration-500 rounded flex items-center justify-center'
                    onClick={() => updateTaskDescription(text)}
                >
                    {isDescriptionUpdating ? (
                        <CircularProgress size={15} className='text-white' />
                    ) : (
                        <div>Save</div>
                    )}
                </button>
            </div>
        </>
    )
}

export default Description
