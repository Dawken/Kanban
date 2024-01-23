import { useState } from 'react'

const useTextState = (defaultText?: string) => {
    const [text, setText] = useState(defaultText ?? '')

    const handleChange = (value: string) => {
        setText(value)
    }

    return {
        text,
        handleChange,
    }
}
export default useTextState
