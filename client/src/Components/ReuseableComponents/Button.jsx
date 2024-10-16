import React from 'react'

const Button = ({ onclick, btnText }) => {
    return (
        <>
            <button type="submit" className='btn btn-primary' onClick={(e) => { onclick(e) }}>{btnText}</button>
        </>
    )
}

export default Button