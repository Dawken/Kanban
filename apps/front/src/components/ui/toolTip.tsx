import { ReactElement } from 'react'
import { Tooltip, Zoom } from '@mui/material'

type ToolTipProps = {
    name: string
    children: ReactElement
}
const ToolTip = ({ name, children }: ToolTipProps) => {
    return (
        <Tooltip TransitionComponent={Zoom} title={name} placement='right'>
            {children}
        </Tooltip>
    )
}

export default ToolTip
