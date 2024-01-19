import { cookies } from 'next/headers'

const useSidebarMenu = () => {
    const isSidebarExpanded = cookies().get('isSidebarExpanded')?.value

    const expanded = isSidebarExpanded ? JSON.parse(isSidebarExpanded) : true

    return {
        expanded,
    }
}

export default useSidebarMenu
