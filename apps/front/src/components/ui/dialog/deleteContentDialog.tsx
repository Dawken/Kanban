import React from 'react'
import { CircularProgress, Dialog } from '@mui/material'

type DeleteContentDialogProps = {
    handleClose: () => void
    open: boolean
    remove: () => void
    textContent: {
        removedContentName: string
        effectsOfDeletion: string[]
    }
    loading: boolean
}
const DeleteContentDialog = ({
    handleClose,
    open,
    remove,
    textContent,
    loading,
}: DeleteContentDialogProps) => {
    return (
        <Dialog onClose={handleClose} open={open}>
            <div className='my-6 mx-12 font-bold space-y-5'>
                <div className='text-center'>
                    Are you sure you want to delete{' '}
                    {textContent.removedContentName}?
                </div>
                <div className='text-[#ADADB8] text-sm space-y-2'>
                    <hr className='my-4 border-t border-[#474747] w-full' />
                    <p>The removal is associated with:</p>
                    <ul className='list-disc list-inside'>
                        {textContent.effectsOfDeletion.map((effect, index) => {
                            return <li key={index}>{effect}</li>
                        })}
                    </ul>
                </div>
                <div className='flex justify-center items-center gap-2 text-sm'>
                    <button
                        className='hover:bg-zinc-600 transition-all rounded'
                        onClick={handleClose}
                    >
                        <div className='my-1.5 mx-5 text-white w-8 h-5 flex items-center justify-center'>
                            Cancel
                        </div>
                    </button>
                    <button
                        className='hover:bg-[#ff6c6c] bg-delete transition-all rounded'
                        onClick={remove}
                    >
                        <div className='my-1.5 mx-5 text-black w-8 h-5 flex items-center justify-center'>
                            {loading ? (
                                <div className='flex items-center'>
                                    <CircularProgress
                                        size={20}
                                        className='text-black'
                                    />
                                </div>
                            ) : (
                                'Delete'
                            )}
                        </div>
                    </button>
                </div>
            </div>
        </Dialog>
    )
}

export default DeleteContentDialog
