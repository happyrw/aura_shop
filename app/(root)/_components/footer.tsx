import { Facebook, Github, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const Footer = () => {
    return (
        <div className='footer text-black p-4 mt-10'>
            <div className='footer2 grid grid-cols-3 mb-2'>
                <div>
                    <h1 className='font-bold'>Company</h1>
                    <div className='flex flex-col gap-1 mt-3'>
                        <Link href="/about-us">About Us</Link>
                        <Link href="/contact-us">Contact Us</Link>
                        <Link href="/faq">FAQs</Link>
                        <Link href="/terms">Terms of Service</Link>
                        <Link href="/policy">Privacy Policy</Link>
                    </div>
                </div>
                <div>
                    <h1 className='font-bold'>Quick Links</h1>
                    <div className='flex flex-col gap-1 mt-3'>
                        <Link href="/blog">Blog</Link>
                        <Link href="/career">careers</Link>
                        <Link href="/support">Support</Link>
                        <Link href="/accessibility">Accessibility</Link>
                    </div>
                </div>
                <div className=''>
                    <h1 className='font-bold'>Follow Us</h1>
                    <div className='flex flex-col gap-1 mt-3'>
                        <Link href='https://twitter.com/'><Twitter className='w-4 h-4' />Tweeter</Link>
                        <Link href='https://www.instagram.com/'><Instagram className='w-4 h-4' />Instagram</Link>
                        <Link href='https://www.facebook.com/'><Facebook className='w-4 h-4' />Facebook</Link>
                        <Link href='https://www.youtube.com/'><Youtube className='w-4 h-4' />YouTube</Link>
                        <Link href='https://www.linkedin.com/'><Linkedin className='w-4 h-4' />LinkedIn</Link>
                        <Link href='https://www.github.com/'><Github className='w-4 h-4' />GitHub</Link>
                    </div>
                </div>
            </div>
            <div className='text-[13px] text-white font-light'>&copy; AURAS&APOS; SHOP. All rights reserved.</div>
            <div className='w-full h-[2px] bg-black rounded-md mt-3 px-5' />
        </div>
    )
}

export default Footer;