import React from 'react';
import BannerPage from './_components/banner';
import Slides from './_components/slides';
import Category from './_components/category';
import NewArrival from './_components/new-arrival';
import Discount from './_components/discount';
import Testimony from './_components/testmony';
import Subscription from './_components/subscription';
import { db } from '@/lib/db';
import { Product, Category as CategoryType } from '@/types';
import { fetchTestimony } from '@/lib/data';

const HomePage = async () => {
    // Fetch products for each category with a limit of 6
    const fetchProductsForCategory = async (category: string): Promise<Product[]> => {
        const products = await db.product.findMany({
            take: 6,
            where: { category }
        });

        // Map products to include the missing fields
        return products.map(product => ({
            ...product,
            imageUrl: product.images[0] || '', // Use the first image or a placeholder
            SKU: '', // Add a default or fetch from a relevant source
            reviews: [] // Initialize as an empty array or fetch actual reviews
        }));
    };

    // Fetch products for each category
    const [womenProducts, menProducts, accessoriesProducts] = await Promise.all([
        fetchProductsForCategory("women"),
        fetchProductsForCategory("men"),
        fetchProductsForCategory("accessories")
    ]);

    // Define category descriptions
    const categoryDescriptions: { [key: string]: string } = {
        "women": "Explore our latest collection for women.",
        "men": "Discover the best styles for men.",
        "accessories": "Find the perfect accessories for any outfit."
    };

    // Structure categories with products and descriptions
    const categories: CategoryType[] = [
        { category: "women", description: categoryDescriptions["women"], products: womenProducts },
        { category: "men", description: categoryDescriptions["men"], products: menProducts },
        { category: "accessories", description: categoryDescriptions["accessories"], products: accessoriesProducts }
    ];

    const testimonies = await fetchTestimony();

    return (
        <>
            <main>
                <BannerPage />
                <Slides />
                <Category categories={categories} />
                <NewArrival />
                <Discount />
                <Testimony testimonies={testimonies} />
                <Subscription />
            </main>
        </>
    );
}

export default HomePage;
