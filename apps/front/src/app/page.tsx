import React from 'react'
import Layout from '@src/layout/layout'
import Image from 'next/image'
import HomePageImage from '../../public/assets/homePage.png'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import TaskIcon from '@mui/icons-material/Task'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import CreateBoardButton from '@src/app/home/createBoardButton'
import 'animate.css'

const Home = () => {
    return (
        <div className='h-full xl:flex justify-center items-center font-sans text-gray-400 boardsVerticalScrollbar animate__animated animate__fadeIn'>
            <div className='flex justify-center items-center max-xl:flex-col xl:h-5/6 gap-5 m-5'>
                <div className='space-y-8 max-lg:text-base flex flex-col items-center'>
                    <h1 className='text-5xl max-lg:text-4xl text-center xl:text-start'>
                        Welcome in Kanban Board
                    </h1>
                    <div className='font-medium text-xl'>
                        A simple app that helps you with
                    </div>
                    <ul className='list-disc space-y-4 [&>li]:font-medium [&>li]:text-xl max-lg:[&>li]:text-base [&>li>span]:ml-2'>
                        <li>
                            Clear Kanban Boards
                            <span>
                                <DashboardRoundedIcon />
                            </span>
                        </li>
                        <p>
                            Monitor task progress, move cards between columns,
                            and control tasks stages
                        </p>
                        <li>
                            Effortlessly Capture Tasks
                            <span>
                                <TaskIcon />
                            </span>
                        </li>
                        <p>
                            Create tasks and design projects all in one place.
                        </p>
                        <li>
                            Easy access
                            <span>
                                <VpnKeyIcon />
                            </span>
                        </li>
                        <p>
                            Check your tasks from any device with your account
                        </p>
                    </ul>
                    <CreateBoardButton />
                </div>
                <div className='flex justify-center items-end w-full lg:flex-1'>
                    <Image
                        src={HomePageImage}
                        alt={'Home page photo'}
                        className='w-[60vw] min-w-[200px] max-w-[500px]'
                        quality={100}
                    />
                </div>
            </div>
        </div>
    )
}

export default Layout(Home)
