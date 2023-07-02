import React from 'react'
import { Header } from './Header'
import { RecordBoard } from './RecordBoard'
import { FormPlayerName } from './FormPlayerName'

export const RecordSection = ({ styleProps }) => {
    return (
        <section
            className="record-section"
            style={styleProps}
        >
            <Header />
            <RecordBoard />
            <FormPlayerName />
        </section>
    )
}
