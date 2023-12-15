import React, { ReactNode, Fragment } from 'react'

const arrayFrom = (length: number, skeleton: ReactNode) => {
    return Array.from({ length }, (_, i) => (
        <Fragment key={i}>{skeleton}</Fragment>
    ))
}
export default arrayFrom
