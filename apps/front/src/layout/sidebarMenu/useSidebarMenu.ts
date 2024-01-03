import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const useSidebarMenu = () => {
    const router = useRouter()

    const searchParams = useSearchParams()

    const isSidebarExpanded = searchParams.get('sidebar')

    const [expanded, setExpanded] = useState(
        (isSidebarExpanded && JSON.parse(isSidebarExpanded)) || false
    )

    useEffect(() => {
        router.push(`?sidebar=${expanded}`)
    }, [router, expanded])

    const toggleExpanded = () => {
        setExpanded((prevState: boolean) => !prevState)
    }

    return {
        expanded,
        toggleExpanded,
    }
}

export default useSidebarMenu
