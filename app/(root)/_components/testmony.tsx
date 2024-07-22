import { TestimonyType } from '@/types';
import Image from 'next/image';
import React from 'react';

const users = [
    {
        name: "Ema W",
        url: '/p1.png',
        Location: "New York, NY",
        Testimonial:
            "I absolutely love shopping at TrendyThreads! The variety of styles and the quality of the clothes are fantastic. I recently bought a summer dress, and it fits perfectly. The customer service is also very responsive and helpful. I highly recommend this store!"
    },
    {
        name: "Jason M.",
        url: '/p2.png',
        Location: "Los Angeles, CA",

        Testimonial:
            "TrendyThreads has become my go-to online store for all my fashion needs. The website is easy to navigate, and I always find something I like. My latest purchase was a pair of jeans, and they are incredibly comfortable and stylish. Fast shipping and great prices too!"
    },
    {
        name: "Sarah T.",
        url: '/p4.png',
        Location: "Chicago, IL",

        Testimonial:
            "I had an amazing shopping experience with TrendyThreads. The clothes are trendy and affordable. I recently bought a jacket, and it exceeded my expectations in terms of quality and fit. Plus, the checkout process was smooth and straightforward. Will definitely shop here again!"
    },
    {
        name: "Michael B.",
        url: '/p3.png',
        Location: "Austin, TX",

        Testimonial:
            "TrendyThreads offers excellent customer service and a wide range of fashionable clothing. I purchased a couple of shirts and was impressed by how quickly they arrived and the quality of the fabric. The sizes are accurate, and the website has great sales. Highly satisfied!"
    }
]

interface TestimonyProps {
    testimonies: TestimonyType[];
}

const Testimony: React.FC<TestimonyProps> = ({ testimonies }) => {
    return (
        <div>
            <h1 className='text-center text-4xl font-light capitalize'>our client says:</h1>
            <div className='m-auto mb-2 w-10 h-1 bg-orange-500 rounded-xl' />
            <div className='grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-5 p-2'>
                {testimonies.map((testimony) => (
                    <div className='h-[200px] overflow-y-auto p-5 space-y-2 shadow-2xl border-1 bg-slate-300 rounded-sm' key={testimony.id}>
                        <div className='flex items-center gap-3'>
                            <div className='relative w-[50px] h-[50px] object-cover bg-orange-700 rounded-full overflow-hidden'>
                                <Image
                                    src={(testimony as any).user.imageUrl}
                                    alt={testimony.location}
                                    fill
                                    className='w-[50px] h-[50px] object-cover'
                                />
                            </div>
                            <div className=''>
                                <p className='font-bold'>
                                    {testimony.user?.firstName} {testimony.user?.lastName?.charAt(0).toUpperCase()}
                                </p>
                                <p className='text-[12px] -mt-[5px] text-slate-400'>{testimony.location}</p>
                            </div>
                        </div>
                        <p className='text-sm font-light leading-5'>{testimony.testimony}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimony