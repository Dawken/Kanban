'use client'
import React from 'react'
import useLogout from '@src/layout/sidebarMenu/logout/useLogout'
import LogoutIcon from '@mui/icons-material/Logout'
import { ExpandedProps } from '@src/types/expandedProps'
import { CircularProgress } from '@mui/material'
import ToolTip from '@src/components/ui/toolTip'

const Logout = ({ expanded }: ExpandedProps) => {
    const { logoutUser, loading } = useLogout()

    return (
        <ToolTip name={'Logout'}>
            <button
                className='w-full h-[10%] px-4'
                onClick={() => logoutUser()}
            >
                <div
                    className={`w-full h-12 bg-zinc-900 rounded-md gap-2 flex ${
                        loading ? 'justify-center' : 'justify-start'
                    } items-center font-bold hover:bg-zinc-800 transition-all`}
                >
                    {loading ? (
                        <CircularProgress size={25} />
                    ) : (
                        <>
                            <LogoutIcon className='ml-5 text-xl' />
                            {expanded && (
                                <span className='overflow-ellipsis'>
                                    Logout
                                </span>
                            )}
                        </>
                    )}
                </div>
            </button>
        </ToolTip>
    )
}

export default Logout
