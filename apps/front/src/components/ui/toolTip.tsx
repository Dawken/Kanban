import { ReactElement } from 'react'
import { Tooltip, Zoom } from '@mui/material'

type ToolTipProps = {
    name: string
    children: ReactElement
    placement?: 'top' | 'bottom' | 'bottom-start'
}
const ToolTip = ({ name, children, placement }: ToolTipProps) => {
    return (
        <Tooltip
            TransitionComponent={Zoom}
            title={name}
            placement={placement ?? 'right'}
        >
            {children}
        </Tooltip>
    )
}

export default ToolTip
