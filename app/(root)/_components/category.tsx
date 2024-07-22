"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import ProductCard from './product-card';
import { Category as CategoryType } from '@/types';

interface CategoryProps {
    categories: CategoryType[];
}

const Category: React.FC<CategoryProps> = ({ categories }) => {
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>(categories[0]);

    return (
        <div className='my-[40px] category'>
            <div className='flex items-center justify-between w-full'>
                {categories.map((item) => (
                    <div
                        key={item.category}
                        onClick={() => setSelectedCategory(item)}
                        className={cn('w-full hover:text-[hsl(16,76%,45%)] transition-all duration-150 ease-in p-2 cursor-pointer', selectedCategory.category === item.category && 'text-[hsl(16,76%,45%)] border-b-2 border-sky-400 bg-black/10')}
                    >
                        <h1 className='text-center text-[10px] sm:text-sm md:text-lg font-bold'>
                            {item.category === "men" && "Men's clothing"}
                            {item.category === "women" && "Women's clothing"}
                            {item.category === "accessories" && "Accessories"}
                        </h1>
                    </div>
                ))}
            </div>
            <h1 className='w-full text-center my-10 font-light text-xl px-4 leading-[20px] text-orange-900'>{selectedCategory.description}</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {selectedCategory.products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        imageUrl={product.images[0]}  // Ensure the imageUrl is passed correctly
                        name={product.name}
                        description={product.description}
                        price={product.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default Category;
