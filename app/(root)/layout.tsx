import React from 'react';
import NavigationBar from './_components/navigation-bar';
import Footer from './_components/footer';
import { checkBusiness } from '@/lib/data';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    const business = await checkBusiness();
    return (
        <main>
            <NavigationBar business={business} />
            {children}
            <Footer />
        </main>
    );
};

export default RootLayout;