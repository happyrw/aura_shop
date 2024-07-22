import React from 'react';
import AllProducts from './_components/all-products';
import { fetchProducts } from '@/lib/data';

// Define the type for searchParams
interface SearchParams {
    category?: string;
    subcategory?: string;
    item?: string;
    searchQuery?: string;
}

interface ProductsPageProps {
    searchParams: SearchParams;
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
    const category = searchParams?.category || undefined;
    const subcategory = searchParams?.subcategory || undefined;
    const item = searchParams?.item || undefined;
    const searchQuery = searchParams?.searchQuery || undefined;

    const products = await fetchProducts(category, subcategory, item, searchQuery);

    return (
        <AllProducts products={products} />
    );
};

export default ProductsPage;
