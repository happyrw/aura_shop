"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import CustomButton from './button';
import { LoaderPinwheel } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const images = [
    {
        url: '/no1.png',
        id: 'logo1',
        category: "Women's clothing",
        description: "Shop the newest arrivals in women's fashion.",
    },
    {
        url: '/no2.png',
        id: 'logo2',
        category: "Men's clothing",
        description: "Discover comfortable and stylish men's clothing.",
    },
    {
        url: '/no3.png',
        id: 'logo3',
        category: "Accessories",
        description: "Explore our latest collection of trendy accessories.",
    },
];

const NewArrival = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const { toast } = useToast();

    const handleNext = () => {
        setIsVisible(false);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setIsVisible(true);
        }, 5000);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='grid grid-cols-2 background mb-10'>
            <div className='relative p-2 md:p-20'>
                <h1 className='flex items-center gap-2 font-bold'><LoaderPinwheel className='w-5 h-5 text-orange-600' />New Arrival</h1>
                <div className='space-y-0 sm:space-y-3 mt-10'>
                    <p className='text-xl sm:text-2xl md:text-4xl lg:text-5xl uppercase'>New Arrival</p>
                    <p className='text-xl sm:text-2xl md:text-4xl lg:text-5xl uppercase text-orange-600'>sales offer</p>
                    <br />
                    <div className='w-20 h-2 bg-orange-600 rounded-md' />
                    <br />
                    <CustomButton label="Shop now" text='outline' />
                    <div className='absolute hidden md:flex flex-col gap-1 top-20 right-10'>
                        <div className='flex gap-2'>
                            <div className='w-[3x] h-[3px] bg-orange-600 rounded-full'></div>
                            <div className='w-[3px] h-[3px] bg-orange-600 rounded-full'></div>
                            <div className='w-[3px] h-[3px] bg-orange-600 rounded-full'></div>
                            <div className='w-[3px] h-[3px] bg-orange-600 rounded-full'></div>
                        </div>
                        <div className='flex gap-2 ml-5'>
                            <div className='w-[3px] h-[3px] bg-orange-600 rounded-full'></div>
                            <div className='w-[3px] h-[3px] bg-orange-600 rounded-full'></div>
                            <div className='w-[3px] h-[3px] bg-orange-600 rounded-full'></div>
                            <div className='w-[3px] h-[3px] bg-orange-600 rounded-full'></div>
                        </div>
                    </div>
                    <div className='absolute hidden md:flex flex-col gap-1 bottom-20 right-10'>
                        <div className='flex gap-2 ml-5'>
                            <div className='w-[3x] h-[3px] bg-black rounded-full'></div>
                            <div className='w-[3px] h-[3px] bg-black rounded-full'></div>
                            <div className='w-[3px] h-[3px] bg-black rounded-full'></div>
                            <div className='w-[3px] h-[3px] bg-black rounded-full'></div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='w-[3px] h-[3px] bg-black rounded-full'></div>
                            <div className='w-[3px] h-[3px] bg-black rounded-full'></div>
                            <div className='w-[3px] h-[3px] bg-black rounded-full'></div>
                            <div className='w-[3px] h-[3px] bg-black rounded-full'></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <div className='relative w-[200px] sm:w-[250px] md:w-[300px] lg:w-[300px] xl:w-[400px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[300px] xl:h-[400px] rounded-2xl'>
                    <Image
                        className={`image-transition ${isVisible ? 'visible' : ''}`}
                        fill
                        src={images[currentIndex].url}
                        alt={images[currentIndex].description}
                    />
                    <div className='absolute -bottom-[15px] md:-bottom-[50px] space-y-1'>
                        <p className='text-orange-800 font-bold text-sm sm:text-xl md:text-2xl'>{images[currentIndex].category}</p>
                    </div>
                    {/* <div className='absolute top-0 right-0 bottom-0 left-0 bg-sky-400 opacity-[0.2]'></div> */}
                </div>
            </div>
        </div>
    );
};

export default NewArrival;
