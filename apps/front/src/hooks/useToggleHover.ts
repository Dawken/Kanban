import { useState } from 'react'

const useToggleHover = () => {
    const [isHover, setIsHover] = useState(false)

    const handleHover = () => {
        setIsHover(true)
    }
    const handleUnhover = () => {
        setIsHover(false)
    }

    return { isHover, handleHover, handleUnhover }
}
export default useToggleHover
