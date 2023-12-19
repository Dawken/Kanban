import React, { useState } from 'react'
import Logo from '../../../public/assets/logo.png'
import Image from 'next/image'
import Boards from '@src/layout/sidebarMenu/boards/boards'
import MenuIcon from '@mui/icons-material/Menu'
import FirstPageIcon from '@mui/icons-material/FirstPage'

const SidebarMenu = () => {
    const [expanded, setExpanded] = useState(false)

    return (
        <aside
            className={`${
                expanded ? 'w-72' : 'w-20'
            } transition-all duration-500 h-screen bg-[#0e0e0e] border-r border-[#00dffc] border-opacity-50 text-gray-400 text-sm`}
        >
            <div className='w-full flex place-content-around items-center h-24'>
                {expanded ? (
                    <>
                        <div className='lg:flex justify-center items-start w-16 m-5'>
                            <Image
                                src={Logo}
                                alt='Kanban logo'
                                quality={100}
                                height={60}
                            />
                        </div>
                        <FirstPageIcon
                            fontSize='large'
                            className='cursor-pointer'
                            onClick={() =>
                                setExpanded((prevState) => !prevState)
                            }
                        />
                    </>
                ) : (
                    <MenuIcon
                        fontSize='large'
                        className='cursor-pointer'
                        onClick={() => setExpanded((prevState) => !prevState)}
                    />
                )}
            </div>
            <Boards expanded={expanded} />
        </aside>
    )
}

export default SidebarMenu
