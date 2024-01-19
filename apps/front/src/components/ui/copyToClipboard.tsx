'use client'
import React, { useEffect, useState } from 'react'
import { IconButton, Tooltip, Zoom } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const ClipBoardCopy = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false)
            }, 2000)
        }
    }, [copied])

    return (
        <Tooltip
            TransitionComponent={Zoom}
            title={copied ? 'Copied!' : 'Copy to clipboard'}
            placement='top'
        >
            <IconButton
                edge='end'
                onClick={() => {
                    setCopied(true)
                }}
            >
                <CopyToClipboard text={text}>
                    {copied ? <DoneIcon /> : <ContentCopyIcon />}
                </CopyToClipboard>
            </IconButton>
        </Tooltip>
    )
}

export default ClipBoardCopy
