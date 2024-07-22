import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const DropDownItems = [
    {
        url: '/logo1.png',
        label: 'Home',
        link: '/',
        description: 'Welcome to our online clothing store'
    },
    {
        url: '/logo1.png',
        label: 'Shop',
        link: '/shop',
        description: 'Explore our wide range of clothing products'
    },
    {
        url: '/logo1.png',
        label: 'About Us',
        link: '/about-us',
        description: 'Learn more about our store and mission'
    },
    {
        url: '/logo1.png',
        label: 'Contact Us',
        link: '/contact',
        description: 'Get in touch with us for any inquiries or feedback'
    },
]

const DropDownMenu = () => {
    return (
        <div className='sm:fixed grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 items-center w-[100vw] top-[90px] left-0 right-0 p-0 sm:p-5 space-y-5 pb-4 border-b-2 border-t-2 border-slate-300 shadow-2xl bg-white  dropdown'>
            {DropDownItems.map((item) => (
                <Link key={item.url} href={item.link} className='hover:text-orange-900 sm:pl-0 p-0 sm:p-2 transition ease-in duration-100'>
                    <div className='flex items-center flex-nowrap' key={item.link}>
                        <div className="relative flex items-center">
                            <Image
                                src={item.url}
                                alt="home"
                                width={100}
                                height={100}
                                className='rounded-md object-cover w-[40px] h-[40px] overflow-hidden'
                            />
                            <div className="absolute bg-black top-0 bottom-0 right-0 left-0 opacity-[0.2] rounded-md"></div>
                        </div>
                        <div className='p-2'>
                            <h1 className='font-bold text-[17px]'>{item.label}</h1>
                            <p className='text-[15px]'>{item.description}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default DropDownMenu;