import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { setUser } from '@/slices/userSlice';

export const useCurrentUser = () => {
    const dispatch = useDispatch();
    const { data: session } = useSession();
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        if (session?.user) {
            dispatch(setUser(session.user));
        }
    }, [session, dispatch]);

    return user;
};
