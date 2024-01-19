'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../../../public/assets/logo.png'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import MenuIcon from '@mui/icons-material/Menu'
import useLogoSection from '@src/layout/sidebarMenu/logoSection/useLogoSection'
import { ExpandedProps } from '@src/types/expandedProps'

const LogoSection = ({ expanded }: ExpandedProps) => {
    const { toggleExpanded } = useLogoSection(expanded)

    return (
        <>
            {expanded ? (
                <>
                    <div className='lg:flex justify-center items-start w-16'>
                        <Link href={'/'}>
                            <Image
                                src={Logo}
                                alt='Kanban logo'
                                quality={100}
                                height={60}
                            />
                        </Link>
                    </div>
                    <FirstPageIcon
                        fontSize='large'
                        className='cursor-pointer'
                        onClick={() => toggleExpanded()}
                    />
                </>
            ) : (
                <MenuIcon
                    fontSize='large'
                    className='cursor-pointer'
                    onClick={() => toggleExpanded()}
                />
            )}
        </>
    )
}

export default LogoSection
