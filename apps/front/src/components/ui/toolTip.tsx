import { ReactElement } from 'react'
import { Tooltip, Zoom } from '@mui/material'

type ToolTipProps = {
    name: string
    children: ReactElement
    placement?: 'top' | 'bottom' | 'bottom-start'
    open?: boolean
}
const ToolTip = ({ name, children, placement, open }: ToolTipProps) => {
    return (
        <Tooltip
            TransitionComponent={Zoom}
            title={name}
            placement={placement ?? 'right'}
            open={open ?? false}
        >
            {children}
        </Tooltip>
    )
}

export default ToolTip
