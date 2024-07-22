import Image from 'next/image';
import React from 'react';

const DropDownItems = [
    { url: '/1.jpeg', id: 'logo1' },
    { url: '/2.jpeg', id: 'logo2' },
    { url: '/3.jpeg', id: 'logo3' },
    { url: '/4.jpeg', id: 'logo4' },
    { url: '/5.jpeg', id: 'logo5' },
    { url: '/6.jpeg', id: 'logo6' },
    { url: '/OIP.jpg', id: 'logo7' },
];

const Slides = () => {
    const duplicatedItems = [...DropDownItems, ...DropDownItems];
    const duplicatedItem = [...DropDownItems, ...DropDownItems];

    return (
        <main className='space-y-4 mb-5'>
            <div className='relative flex overflow-hidden w-full'>
                <div className='flex gap-5 animate-slideLeft'>
                    {duplicatedItems.map((dropDownItem, index) => (
                        <div className='relative w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] aspect-video bg-sky-400 rounded-[25px] overflow-hidden' key={index}>
                            <Image
                                fill
                                className='object-cover'
                                src={dropDownItem.url}
                                alt="photo"
                            />
                            <div className='absolute bg-sky-600 top-0 left-0 right-0 bottom-0 opacity-[0.15]'></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='relative flex overflow-hidden w-full'>
                <div className='flex gap-5 animate-slideRight'>
                    {duplicatedItem.map((dropDownItem, index) => (
                        <div className='relative w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] aspect-video bg-sky-400 rounded-[25px] overflow-hidden' key={index}>
                            <Image
                                fill
                                className='object-cover'
                                src={dropDownItem.url}
                                alt="photo"
                            />
                            <div className='absolute bg-sky-600 top-0 left-0 right-0 bottom-0 opacity-[0.15]'></div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Slides;
