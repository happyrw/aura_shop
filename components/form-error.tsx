import React from 'react'

const FormError = ({ message }: { message: string }) => {
    if (!message) {
        return null;
    }
    return (
        <div className='w-full bg-red-400 text-red-900 p-2'>
            {message}!
        </div>
    )
}

export default FormError;