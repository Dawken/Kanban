import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next'

const useLogoSection = (expanded: boolean) => {
    const router = useRouter()
    const toggleExpanded = () => {
        setCookie('isSidebarExpanded', JSON.stringify(!expanded))
        router.refresh()
    }

    return {
        toggleExpanded,
    }
}

export default useLogoSection
