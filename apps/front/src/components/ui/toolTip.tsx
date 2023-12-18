import { ReactElement } from 'react'
import { Tooltip, Zoom } from '@mui/material'

type ToolTipType = {
    name: string
    children: ReactElement
}
const ToolTip = ({ name, children }: ToolTipType) => {
    return (
        <Tooltip TransitionComponent={Zoom} title={name} placement='right'>
            {children}
        </Tooltip>
    )
}

export default ToolTip
