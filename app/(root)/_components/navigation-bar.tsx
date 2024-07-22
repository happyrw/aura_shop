"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Logo from './logo'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import CustomButton from './button'
import { AlignJustify, CircleFadingPlusIcon, Facebook, Group, Instagram, LoaderIcon, LogOut, LucideChevronRight, MoveLeftIcon, Search, Twitter, User, X } from 'lucide-react'
import DropDownMenu from './dropdown-menu'
import { useCurrentUser } from '@/hooks/use-current-user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Business, MemberRole } from '@prisma/client'
import { useDebounce } from '@/hooks/use-debounce'
import axios from 'axios'
import { logout } from '@/hooks/logout'
import { useDispatch } from 'react-redux'
import { useToast } from '@/components/ui/use-toast'

interface NavigationBarProps {
    business: (Business & { members: { userId: string }[] })[];
}

const NavigationBar: React.FC<NavigationBarProps> = ({ business }) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [showModel, setShowModel] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [testimony, setTestimony] = useState(false);
    const [inputs, setInputs] = useState({
        location: '',
        testimony: '',
    });

    const pathname = usePathname();
    const user = useCurrentUser();
    const debouncedValue = useDebounce(searchQuery);
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const { toast } = useToast();


    useEffect(() => {
        const params = new URL(window.location.href);
        if (debouncedValue) {
            params.searchParams.set('searchQuery', debouncedValue);
        } else {
            params.searchParams.delete('searchQuery');
        }
        router.push(params.toString());
    }, [debouncedValue, pathname, router, searchParams]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        })
    }

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();
        try {
            await axios.post("/api/testimony", inputs);
            setLoading(false);
            setTestimony(false);
            router.refresh();
        } catch (error: any) {
            confirm(error);
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        await logout(dispatch);
        window.location.reload;
        setLoading(false);
    };

    const handleClick = () => {
        toast({
            title: 'Not yet implemented',
            description: 'We are still working on this project',
        })
    }

    return (
        <nav className='sticky top-0 p-2 z-50 bg-slate-900/20'>
            {showModel && (
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-black z-40 h-screen bg-opacity-[0.4] flex items-center justify-center'>
                    <div className='bg-white w-full md:w-[600px] h-[200px] p-4 rounded-2xl'>
                        {business.length === 0 ? (
                            <div className='relative w-full mx-auto'>
                                <div className='bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm cursor-pointer' onClick={() => setShowModel((current) => !current)}>
                                    <X className='w-4 h-4' />
                                </div>
                                <h1 className='font-bold text-2xl text-center pt-16'>You do not belong to any business</h1>
                                <h4 className='text-center mb-5'>To create a product, you need to create/belong to a business profile first.</h4>
                                <Link href="/create-business" className="bg-black text-white p-2 rounded-md" onClick={() => setShowModel((current) => !current)}>Create business</Link>
                            </div>
                        ) : (
                            <div className='relative mx-auto w-full'>
                                <div className='bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm cursor-pointer' onClick={() => setShowModel((current) => !current)}>
                                    <X className='w-4 h-4' />
                                </div>
                                <h1 className='text-orange-500 font-bold'>Choose your business</h1>
                                <div className='h-[9rem] overflow-y-auto pt-9 space-y-3'>
                                    {business.map((b) => {
                                        const memberId = b.members[0]?.userId || ''; // Adjust as needed
                                        return (
                                            <div key={b.id} className='flex items-center justify-between'>
                                                <h1 className='font-bold text-md text-center'>{b.businessName}</h1>
                                                <Link href={`/create-product/${b.id}/${memberId}`} className='bg-black px-2 py-1 text-white rounded-md text-sm' onClick={() => setShowModel((current) => !current)}>Continue</Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {pathname !== '/all-products' && !pathname.startsWith("/create-product") && pathname !== "/create-business" && (
                <main className='flex items-center justify-between px-3 w-full rounded-md bg-white'>
                    {
                        testimony && (
                            <div className="absolute h-screen bg-black/30 top-0 bottom-0 right-0 left-0 z-30 md:flex md:items-center md:justify-center">
                                <div className="relative bg-white md:p-2 py-3 rounded-lg space-y-4 mt-5 md:mt-0 w-full md:w-[600px]">
                                    <button className='bg-rose-500 text-white p-1 rounded-full absolute top-2 right-2 shadow-sm cursor-pointer' onClick={() => setTestimony(false)}>
                                        <X className='w-4 h-4' />
                                    </button>
                                    <h1 className='text-bold mt-4'>Leave a testimony to us <span className='underline'>
                                        {(user as any)?.firstName.toUpperCase()}!
                                    </span></h1>
                                    <form onSubmit={handleOnSubmit} className='w-full space-y-4 flex flex-col'>
                                        <textarea
                                            placeholder="Write a testimony..."
                                            className="w-full p-2 rounded-md focus:outline-none outline-none border-0 border-t-[2px] border-b-2 border-black focus:border-b-4 focus:border-orange-700"
                                            rows={5}
                                            name="testimony"
                                            onChange={handleOnChange}
                                        />
                                        <input
                                            type="text"
                                            placeholder="What's your location..."
                                            className="w-full p-2 rounded-md focus:outline-none outline-none border-0 border-t-[2px] border-b-2 border-black focus:border-b-4 focus:border-orange-700"
                                            name="location"
                                            onChange={handleOnChange}
                                        />
                                        <button type="submit" disabled={!inputs.location || !inputs.testimony || loading} className="w-full py-2 capitalize bg-orange-800 text-white rounded-sm">
                                            {loading ? <LoaderIcon className="animate-spin w-full text-center" /> : "Submit"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )
                    }
                    <div className="flex items-center gap-2 md:gap-5">
                        <Logo />
                        <div className="hidden sm:flex items-center justify-between gap-3 md:gap-0 text-[18px] md:text-[20px] md:space-x-4">
                            <button onClick={handleClick} className={cn('hover:pb-[10px] hover:text-[hsl(16,76%,45%)] transition-all duration-200 ease-in', pathname === "/" && 'text-[hsl(16,76%,45%)]')}>Home</button>
                            <button onClick={handleClick} className={cn('hover:pb-[10px] hover:text-[hsl(16,76%,45%)] transition-all duration-200 ease-in', pathname.startsWith("/shop") && 'text-[hsl(16,76%,45%)]')}>Shop</button>
                            <button onClick={handleClick} className={cn('hover:pb-[10px] hover:text-[hsl(16,76%,45%)] transition-all duration-200 ease-in', pathname.startsWith("/about-us") && 'text-[hsl(16,76%,45%)]')}>About Us</button>
                            <button onClick={handleClick} className={cn('hover:pb-[10px] hover:text-[hsl(16,76%,45%)] transition-all duration-200 ease-in', pathname.startsWith("/contact") && 'text-[hsl(16,76%,45%)]')}>Contact</button>

                            <LucideChevronRight className={cn('h-5 w-5 mt-1 cursor-pointer z-10', showDropDown && 'rotate-90')} onClick={() => setShowDropDown((current) => !current)} />
                            <div className='transition-all duration-500 ease-in bg-transparent'>
                                {showDropDown && <DropDownMenu />}
                            </div>
                        </div>
                    </div>
                    <div className='hidden sm:flex items-center gap-10'>
                        {!user && <Link href="/sign-up">
                            <CustomButton label='Register' />
                        </Link>}
                        {user && user && (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar className='bg-orange-700'>
                                        <AvatarImage src={(user as any).imageUrl} className='object-cover' />
                                        <AvatarFallback>
                                            <User className='text-white w-[50px] h-[50px] bg-sky-500 p-2' />
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='w-[200px]'>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className='cursor-pointer'>
                                        {/* <Link href={`/profile/${user.id}`}>Profile</Link> */}
                                        <Link href='/'>Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className='cursor-pointer'>
                                        <Link href="/">Billing</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className='cursor-pointer'>
                                        <button onClick={() => setShowModel((current) => !current)}>Add products</button>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className='cursor-pointer'>
                                        <button onClick={() => setTestimony((current) => !current)}>Testimony</button>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <button onClick={handleLogout} className='flex items-center w-full justify-center text-[15px] bg-orange-400 p-2 text-white rounded-xl'>
                                            <LogOut className='w-[17px] h-[17px] mr-2' /> Logout
                                        </button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                        <div className="hidden xhd">
                            <Link href="/all-products">
                                <CustomButton label='Shop Tour' text='outline' />
                            </Link>
                        </div>
                    </div>
                    <div className='flex sm:hidden items-center gap-10'>
                        <button onClick={() => setShowMobileNav((current) => !current)}>
                            {showMobileNav ? <X className="w-10 h-10 cursor-pointer" /> : <AlignJustify className="w-10 h-10 cursor-pointer" />}
                        </button>
                    </div>
                    {showMobileNav &&
                        <div className="absolute flex flex-col sm:hidden top-20 right-0 left-0 bottom-0 bg-white h-[calc(100vh-80px)] overflow-auto pb-10 mx-2">
                            <div className="flex flex-col mt-[20px] pl-10 text-[20px] space-y-3">
                                <Link href="/" className={cn('hover:pl-[10px] hover:text-[hsl(16,76%,45%)] transition-all duration-200 ease-in', pathname.startsWith("/") && 'text-[hsl(16,76%,45%)]')}>Home</Link>
                                <Link href="/shop" className={cn('hover:pl-[10px] hover:text-[hsl(16,76%,45%)] transition-all duration-200 ease-in', pathname.startsWith("/shop") && 'text-[hsl(16,76%,45%)]')}>Shop</Link>
                                <Link href="/about-us" className={cn('hover:pl-[10px] hover:text-[hsl(16,76%,45%)] transition-all duration-200 ease-in', pathname.startsWith("/about-us") && 'text-[hsl(16,76%,45%)]')}>About Us</Link>
                                <div className="flex items-center gap-10">
                                    <Link href="/contact" className={cn('hover:pl-[10px] hover:text-[hsl(16,76%,45%)] transition-all duration-200 ease-in', pathname.startsWith("/contact") && 'text-[hsl(16,76%,45%)]')}>Contact</Link>
                                    <LucideChevronRight className={cn('h-5 w-5 mt-1 cursor-pointer z-10', showDropDown && 'rotate-90')} onClick={() => setShowDropDown((current) => !current)} />
                                </div>
                                <div className={cn('bg-transparent relative hidden sm:hidden', showDropDown && 'flex')}>
                                    {showDropDown && <DropDownMenu />}
                                </div>
                                <div className='flex items-center gap-5 -ml-[40px]'>
                                    <CustomButton label='Main Action' />
                                    <CustomButton label='Secondary Action' text='outline' />
                                </div>
                            </div>
                            <div className='relative -bottom-10 flex items-center mb-5 ml-10 gap-10'>
                                <Link href='http://www.tweeter.com' target='_blank'><Twitter className='w-6 h-6 text-sky-600' /></Link>
                                <Link href='http://www.instagram.com' target='_blank'><Instagram className='w-6 h-6 text-red-500' /></Link>
                                <Link href='http://www.facebook.com' target='_blank'><Facebook className='w-6 h-6 text-blue-700' /></Link>
                            </div>
                            {user && (
                                <>
                                    <button onClick={() => setShowModel((current) => !current)} className='mt-10 w-full flex items-center justify-center bg-orange-400 p-2 rounded-lg mb-5'>
                                        <CircleFadingPlusIcon className='w-4 h-4 mr-2' /> Add products
                                    </button>
                                    <button onClick={handleLogout} className='flex items-center w-full justify-center text-[15px] bg-orange-400 p-2 text-white rounded-xl'>
                                        <LogOut className='w-[17px] h-[17px] mr-2' /> Logout
                                    </button>
                                </>
                            )}
                        </div>}
                </main>
            )}

            {pathname === '/all-products' && (
                <main className='relative flex items-center justify-between px-3 w-full rounded-md bg-white'>
                    <Logo />
                    <div className='hidden sm:flex border-b-2 border-l-2 border-slate-400 h-[50px] sm:w-[250px] md:w-[350px] rounded-[30px] overflow-hidden hover:border-orange-700'>
                        <input
                            type='text'
                            placeholder='What are you looking for'
                            className='px-4 py-2 placeholder:text-[12px] h-full w-full outline-none border-none text-[12px]'
                            onChange={handleInputChange}
                            value={searchQuery}
                        />
                    </div>
                    {showInput && (
                        <div className='flex sm:hidden absolute top-[7px] w-[calc(100%-70px)] border-b-2 border-l-2 border-slate-400 h-[50px] rounded-[30px] overflow-hidden hover:border-orange-700'>
                            <input
                                type='text'
                                placeholder='What are you looking for'
                                className='px-4 py-2 placeholder:text-[12px] h-full w-full outline-none border-none text-[12px]'
                                onChange={handleInputChange}
                                value={searchQuery}
                            />
                        </div>
                    )}
                    <button className='flex sm:hidden' onClick={() => setShowInput((current) => !current)}>
                        {!showInput ? <Search className='w-10 h-10 cursor-pointer' /> : <X className='w-10 h-10 cursor-pointer' />}
                    </button>
                </main>
            )}

            {pathname.startsWith('/create-product') && (
                <main className='relative flex items-center justify-between px-3 w-full rounded-md bg-white'>
                    <Logo />
                    <button onClick={() => {
                        window.location.replace("/")
                    }} className='flex items-center justify-center gap-3 bg-black text-white cursor-pointer px-2 py-1 rounded-md'><MoveLeftIcon className='w-4 h-4' />Back</button>
                </main>
            )}
        </nav>
    )
}

export default NavigationBar;
