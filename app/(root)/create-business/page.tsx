import React from 'react'
import BusinessForm from './_components/business-form'

const BusinessPage = () => {
    return (
        <main>
            <div className='w-full mx-auto bg-slate-200 p-10'>
                <h1 className='text-xl sm:2xl border-b-2 w-fit border-orange-700 uppercase my-5 ml-5'>create business</h1>
                <BusinessForm />
            </div>
        </main>
    )
}

export default BusinessPage;