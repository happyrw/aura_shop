import SignInForm from '@/components/sign-in-form'
import Link from 'next/link'
import React from 'react'

const SignInPage = () => {
    return (
        <main className='w-[600px] bg-black/70 px-8 py-4 rounded-md text-white space-y-5 shadow-2xl'>
            <div className='flex justify-between px-5 items-center'>
                <div>Sign in</div>
                <Link href="/sign-up" className='capitalize px-4 py-[5px] bg-black text-white rounded-lg text-sm'>register</Link>
            </div>
            <SignInForm />
        </main>
    )
}

export default SignInPage