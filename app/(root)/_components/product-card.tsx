import Image from 'next/image';
import React from 'react';
import CustomButton from './button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    id: string;
    imageUrl: string;
    name: string;
    description: string;
    price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, imageUrl, name, description, price }) => {
    return (
        <div key={id} className="relative aspect-video border p-4 rounded-lg shadow-md flex flex-col items-center">
            <div className='relative rounded-xl overflow-hidden hover:scale-[1.3] transition duration-500 ease-out'>
                <Image
                    src={imageUrl}
                    alt={name}
                    width={130}
                    height={130}
                    className='object-cover w-[200px] h-[200px]'
                />
                <div className='absolute bg-sky-600 top-0 left-0 right-0 bottom-0 opacity-[0.15]'></div>
            </div>
            <div className='mt-2 self-start flex flex-col'>
                <div>
                    <h2 className="text-lg font-light">{name}</h2>
                    <p className='w-fit max-w-[170px] line-clamp-1 text-sm'>{description}</p>
                    <p className="text-gray-500">
                        ${price !== undefined && price !== null ? price.toFixed(2) : '0.00'}
                    </p>
                </div>
                <CustomButton label="Add to cart" icon={ShoppingCart} className='relative mt-4 sm:mt-0 sm:absolute right-2 bottom-2 hover:bg-[hsl(16,76%,45%)] text-[12px]' />
            </div>
        </div>
    );
}

export default ProductCard;
