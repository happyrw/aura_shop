import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className='auth-layout overflow-y-scroll h-auto md:h-[100vh]'>
            {children}
        </main>
    );
}

export default AuthLayout;
