"use client";

import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp, CircleDashed, X } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../../_components/product-card';
import Image from 'next/image';
import { categories, SimpleSubcategory, NestedSubcategory, Subcategories } from '@/constants/categories';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'qs';

const isNestedSubcategory = (subcategory: SimpleSubcategory | NestedSubcategory): subcategory is NestedSubcategory => {
    return (subcategory as NestedSubcategory).items !== undefined;
};

interface AllProductsProps {
    products: {
        id: string;
        name: string;
        description: string;
        price: number;
        category: string;
        subcategory: string;
        item: string;
        size: string;
        stock: number;
        images: string[];
    }[];
}

const AllProducts: React.FC<AllProductsProps> = ({ products }) => {
    const [visibleCategory, setVisibleCategory] = useState<string | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [showItems, setShowItems] = useState(false);
    const [itemsToShow, setItemsToShow] = useState(products.slice(0, 12));
    const [loading, setLoading] = useState(false);
    const [showNoItemsMessage, setShowNoItemsMessage] = useState(false);

    // const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Setting Initial State from URL
    useEffect(() => {
        const currentCategoryName = searchParams.get("category");
        const currentSubcategoryName = searchParams.get("subcategory");
        const currentItemName = searchParams.get("item");

        if (currentCategoryName) {
            setVisibleCategory(currentCategoryName);
            if (currentSubcategoryName) {
                setSelectedSubcategory(currentSubcategoryName);
                if (currentItemName) {
                    setSelectedItem(currentItemName);
                }
            }
        }
    }, [searchParams]);

    // Updating the URL
    const updateUrl = (category: string | null, subcategory: string | null, item: string | null) => {
        const url = new URL(window.location.href);
        if (category) {
            url.searchParams.set('category', category);
        } else {
            url.searchParams.delete('category');
        }

        if (subcategory) {
            url.searchParams.set('subcategory', subcategory);
        } else {
            url.searchParams.delete('subcategory');
        }

        if (item) {
            url.searchParams.set('item', item);
        } else {
            url.searchParams.delete('item');
        }

        router.push(url.toString());
    };

    // Toggle Subcategories Function
    const toggleSubcategories = (categoryKey: string) => {
        if (categoryKey === "") {
            setVisibleCategory(null);
            setSelectedSubcategory(null);
            setSelectedItem(null);
            updateUrl(null, null, null);  // Update the URL with no category, subcategory, or item
            return;
        }

        if (!categories[categoryKey]) {
            console.error(`Category ${categoryKey} does not exist.`);
            return;
        }

        if (visibleCategory === categoryKey) {
            setVisibleCategory(null);
            setSelectedSubcategory(null);
            setSelectedItem(null);
            updateUrl(null, null, null);
        } else {
            setVisibleCategory(categoryKey);

            const subcategories = categories[categoryKey].subcategories;
            if (!subcategories) {
                console.error(`Category ${categoryKey} does not have subcategories.`);
                return;
            }

            const firstSubcategory = Object.keys(subcategories)[0];
            setSelectedSubcategory(firstSubcategory);
            setSelectedItem(null);
            updateUrl(categoryKey, firstSubcategory, null);
        }
    };

    // Update URL on Subcategory Change:
    useEffect(() => {
        setSelectedItem(null);
        updateUrl(visibleCategory, selectedSubcategory, null);
    }, [selectedSubcategory, visibleCategory]);

    const handleItemClick = (item: string) => {
        setSelectedItem(item);
        updateUrl(visibleCategory, selectedSubcategory, item);
    };

    // Filter products by category
    const filterItems = () => {
        if (!visibleCategory) {
            return products;
        }
        return products.filter(item =>
            item.category === visibleCategory &&
            (!selectedSubcategory || item.subcategory === selectedSubcategory) &&
            (!selectedItem || item.item === selectedItem)
        );
    };

    const filteredItems = filterItems();

    // Handle No item message
    useEffect(() => {
        if (filteredItems.length === 0) {
            const timer = setTimeout(() => setShowNoItemsMessage(true), 3000);
            return () => clearTimeout(timer); // Clear timer on component unmount
        } else {
            setShowNoItemsMessage(false); // Hide the message if there are items
        }
    }, [filteredItems]);

    // Infinite Scrolling
    const loader = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting) {
                loadMoreItems();
            }
        }, {
            root: null,
            rootMargin: '20px',
            threshold: 1.0
        });

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, [products]);

    const loadMoreItems = () => {
        if (loading) return;

        setLoading(true);

        setTimeout(() => {
            setItemsToShow((prev) => [
                ...prev,
                ...products.slice(prev.length, prev.length + 12)
            ]);
            setLoading(false);
        }, 5000);
    };

    return (
        <div className="relative enableScroll">
            <div className="sticky top-[5.7rem] flex items-center flex-nowrap overflow-x-auto bg-white z-50 border-b-2 border-slate-200">
                <p className={cn('font-light border-b-2 px-4 hover:pl-5 rounded-xl text-center cursor-pointer w-fit text-nowrap border-black', !visibleCategory && 'border-orange-600 py-[2px]')} onClick={() => toggleSubcategories("")}>All products</p>
                {Object.keys(categories).map(categoryKey => {
                    const category = categories[categoryKey];
                    return (
                        <div key={categoryKey} className={`flex flex-col p-4 ${visibleCategory === categoryKey ? 'hidden' : ''}`}>
                            <h2
                                className='font-light border-b-2 border-black px-4 hover:pl-5 hover:border-orange-600 py-[2px] rounded-xl text-center cursor-pointer text-nowrap'
                                onClick={() => toggleSubcategories(categoryKey)}
                            >
                                {category.name}
                            </h2>
                        </div>
                    );
                })}
            </div>

            {visibleCategory && (
                <div className="sticky left-0 top-[9.8rem] right-0 w-screen bg-white z-10 p-4 border border-gray-300">
                    <h2 className='relative font-bold border-b-2 border-orange-600 px-2 py-[2px] rounded-2xl text-center'>
                        {categories[visibleCategory].name}
                        <div className='absolute top-[5px] right-[5px]' onClick={() => toggleSubcategories("")}>
                            <X className='w-4 h-4 cursor-pointer' />
                        </div>
                    </h2>
                    <div className="mt-1 flex items-center gap-2 md:gap-5 overflow-x-auto">
                        {Object.keys(categories[visibleCategory].subcategories).map(subcategoryKey => {
                            const subcategories = categories[visibleCategory].subcategories as Subcategories;
                            const subcategory = subcategories[subcategoryKey];
                            return (
                                <div key={subcategoryKey} className="mt-1">
                                    <h3
                                        className={`px-4 md:py-[5px] rounded-2xl cursor-pointer text-sm md:text-[17px] font-light hover:bg-[#f2f2f2] ${selectedSubcategory === subcategoryKey ? 'border-[1px] border-red-600 hover-me' : 'border-[1px] border-gray-400'}`}
                                        onClick={() => setSelectedSubcategory(subcategoryKey)}
                                    >
                                        {isNestedSubcategory(subcategory) ? subcategory.name : (subcategoryKey.charAt(0).toUpperCase() + subcategoryKey.slice(1))}
                                    </h3>
                                </div>
                            );
                        })}
                    </div>
                    {selectedSubcategory && (
                        <>
                            <div className={cn("relative mt-4 flex flex-wrap gap-3 overflow-x-auto", showItems && "hidden")}>
                                {isNestedSubcategory((categories[visibleCategory].subcategories as Subcategories)[selectedSubcategory])
                                    ? ((categories[visibleCategory].subcategories as Subcategories)[selectedSubcategory] as NestedSubcategory).items.map((item, index) => (
                                        <li key={index} className={`underline hover:text-orange-600 cursor-pointer text-sm leading-[13px] ${selectedItem === item ? 'font-bold' : ''}`} onClick={() => handleItemClick(item)}>{item}</li>
                                    ))
                                    : ((categories[visibleCategory].subcategories as Subcategories)[selectedSubcategory] as SimpleSubcategory).map((item, index) => (
                                        <li key={index} className={`underline hover:text-orange-600 cursor-pointer text-sm leading-[13px] ${selectedItem === item ? 'font-bold' : ''}`} onClick={() => handleItemClick(item)}>{item}</li>
                                    ))
                                }
                            </div>
                            <div className='absolute right-2 -bottom-5 text-[11px]'>
                                <button className='bg-[#95D2B3] flex items-center p-[2px] rounded-md' onClick={() => setShowItems((current) => !current)}>
                                    {showItems ? (
                                        <>
                                            <ArrowDown className='w-3 h-3' />
                                            <p>show items</p>
                                        </>
                                    ) : (
                                        <>
                                            <ArrowUp className='w-3 h-3' />
                                            <p>hide items</p>
                                        </>
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}

            <div className="mt-5 md:mt-10">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 z-0">
                    {filteredItems.length > 0 && filteredItems.slice(0, itemsToShow.length).map((item) => (
                        <ProductCard
                            key={item.id}
                            id={item.id}
                            imageUrl={item.images[0]}  // Adjusted to use images array
                            name={item.name}
                            description={item.description}
                            price={Number(item.price)}
                        />
                    ))}
                </div>
                {showNoItemsMessage && filteredItems.length === 0 && (
                    <div className='flex flex-col items-center justify-center w-full text-center'>
                        <p className="text-center text-gray-600">No items found matching your search criteria.</p>
                        <Image
                            src="/nofound.png"
                            alt="not found icon"
                            width={200}
                            height={200}
                        />
                    </div>
                )}
                {itemsToShow.length < filteredItems.length && (
                    <div ref={loader} className="loader h-10 flex justify-center items-center mt-4">
                        {loading && <CircleDashed className='w-10 h-10 animate-spin' />}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllProducts;
