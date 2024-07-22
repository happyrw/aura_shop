import React from 'react'
import ProductForm from '../../_components/form'
import { checkBusiness } from '@/lib/data';

const CreateProductPage = async ({ params }: { params: { businessId: string, memberId: string } }) => {
    const businesses = await checkBusiness();

    // Find the business by businessId
    const business = businesses.find(b => b.id === params.businessId);
    if (!business) return null;

    // Find the member within that business by memberId
    const member = business.members.find(m => m.userId === params.memberId);
    const memberRole = member?.role || '';

    return (
        <main className='bg-slate-200 py-10'>
            <h1 className='text-xl sm:2xl border-b-2 w-fit border-orange-700 uppercase my-5 ml-5'>upload your product here</h1>
            <ProductForm businessId={params.businessId} memberId={params.memberId} memberRole={memberRole} />
        </main>
    )
}

export default CreateProductPage;
