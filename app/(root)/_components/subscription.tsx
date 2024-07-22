import React from 'react'

const Subscription = () => {
    return (
        <div className='my-8 flex flex-col items-center justify-center space-y-5 shadow-2xl w-full bg-slate-200 py-4'>
            <h1 className='text-xl sm:text-2xl font-bold'>sign up now!</h1>
            <div className='flex flex-col items-center justify-center'>
                <p className='text-sm text-center'>
                    For exclusive discount, opportunities and new product announcements-plus a few surprises.
                </p>
                <div className='h-10 w-fit flex items-center gap-2 rounded-[0px_0px_20px_0px] overflow-hidden mt-5'>
                    <input type='email' placeholder="Enter your email..." className='h-full bg-transparent outline-none px-2 border-b-[1px] border-orange-700' />
                    <button className='h-full bg-sky-700 text-white px-4'>subscribe</button>
                </div>
            </div>
        </div>
    )
}

export default Subscription;