"use client";
import { Circle, CircleDashed, Diff, MoveRight, Sparkles, Triangle } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const images = [
    {
        url: '/no1.png',
    },
    {
        url: '/no2.png',
    },
    {
        url: '/no3.png',
    },
];

const Discount = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const handleNext = () => {
        setIsVisible(false);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setIsVisible(true);
        }, 1000); // Shortened to 1 second for smooth transition
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 mb-10 p-2 sm:p4 md:p-3 bg-orange-600 gap-10 items-center discount mx-2 rounded-2xl'>
            <div className='relative flex items-center justify-center my-3'>
                <Image
                    src={images[currentIndex].url}
                    alt='logo1'
                    width={130}
                    height={130}
                    className={`w-[200px] sm:w-[270px] md:w-[300px] h-[200px] sm:h-[270px] md:h-[300px] rounded-lg object-cover image-transition ${isVisible ? 'visible' : ''}`}
                />
                <div className='hidden sm:flex'>
                    <Sparkles className='absolute top-7 left-8 text-white' />
                    <Sparkles className='absolute bottom-7 right-8 text-white' />
                </div>
            </div>
            <div className='relative space-y-4'>
                <p className='uppercase text-2xl sm:text-4xl'>special</p>
                <p className='uppercase text-white text-3xl sm:text-5xl'>discount</p>
                <div className='h-[2px] w-[200px] rounded-lg bg-black' />
                <div className='flex gap-10 items-center'>
                    <p className='text-[11px] leading-3'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum rem reiciendis veritatis natus consequatur laboriosam reprehenderit voluptate, accusamus a. Unde odit id voluptas. Saepe quo sint inventore iusto dolorem! Repellendus?
                    </p>
                    <button className='uppercase bg-orange-700 shadow-2xl border-2 border-orange-700 px-2 py-1 rounded-md font-bold'><span className='text-white font-sans text-2xl mr-2'>50%</span>save</button>
                </div>
                <div className='flex gap-3 items-center text-sm cursor-pointer'>
                    <button className='bg-black text-white rounded-[30px_0px_0px_30px] px-4 py-1'>buy now</button>
                    <div className='bg-black text-white py-[5px] px-2 rounded-[0px_30px_30px_0px]'>
                        <MoveRight className='w-5 h-5' />
                    </div>
                </div>
                <Triangle className='absolute text-white text top-2 right-0 rotate-45' />
                <Diff className='absolute text-white bottom-0  md:top-[10rem] right-[10rem] md:right-[15rem]' />
                <Circle className='absolute text-white top-[7rem] right-0' />
                <CircleDashed className='absolute text-white top-[100px] right-[10rem] animate-bounce' />
            </div>
        </div>
    );
}

export default Discount;
