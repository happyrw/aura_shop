import SignUpForm from '@/components/sign-up-form';
import Link from 'next/link'
import React from 'react'

const SignUpPage = () => {
    return (
        <main className='w-full md:w-[700px] bg-black/70 px-8 py-4 rounded-md text-white space-y-5 shadow-2xl'>
            <div className='flex justify-between px-5 items-center mt-5'>
                <div>Sign up</div>
                <Link href="/sign-in" className='capitalize px-4 py-[5px] bg-black text-white rounded-lg text-sm'>login</Link>
            </div>
            <SignUpForm />
        </main>
    )
}

export default SignUpPage;