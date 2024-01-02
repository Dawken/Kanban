import React from 'react'

type DeleteButtonsProps = {
    handleClose: () => void
    remove: () => void
}
const DeleteDialogButtons = ({ handleClose, remove }: DeleteButtonsProps) => {
    return (
        <>
            <button
                className='hover:bg-zinc-600 transition-all rounded'
                onClick={handleClose}
            >
                <div className='my-1.5 mx-3'>Cancel</div>
            </button>
            <button
                className='hover:bg-[#ff6c6c] bg-[#ff4f4d] transition-all rounded'
                onClick={remove}
            >
                <div className='my-1.5 mx-5 text-black'>Delete</div>
            </button>
        </>
    )
}

export default DeleteDialogButtons
