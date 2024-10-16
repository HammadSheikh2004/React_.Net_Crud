import React from 'react'

const Heading = ({title}) => {
    return (
        <>
            <div className='text-center my-3 text-white bg-primary py-2 rounded shadow' style={{ fontSize: '30px', fontWeight: 'bold' }}>{title}</div>
        </>
    )
}

export default Heading