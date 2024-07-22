import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <>
            <button onClick={() => window.location.replace("/")}>
                <Image
                    width={130}
                    height={130}
                    src="/logo1.png"
                    alt='shop logo'
                />
            </button>
        </>
    )
}

export default Logo