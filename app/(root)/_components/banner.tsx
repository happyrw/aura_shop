import { Button } from '@/components/ui/button'
import React from 'react'
import CustomButton from './button'

const BannerPage = () => {
    return (
        <main className='flex flex-col items-center w-full my-10 sm:my-15 md:my-20 lg:my-32 space-y-4 sm:space-y-8'>
            <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold capitalize'>discover the latest trends</h1>
            <p className='text-[10px] sm:text-[12px] md:text-[15px] lg:text-xl'>Shop our collection of trendy and fashionable clothing for all occasions.</p>
            <div className='flex flex-col gap-5 sm:gap-0 sm:flex-row sm:space-x-10'>
                <CustomButton label='Shop Now' />
                <CustomButton label='Discover More' text='outline' />
            </div>
        </main>
    )
}

export default BannerPage;