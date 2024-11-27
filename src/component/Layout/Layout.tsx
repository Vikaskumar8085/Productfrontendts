import React, { ReactNode, useState } from 'react'
import Sidebar from './Sidebar'
import { TfiAlignLeft, TfiAlignRight } from "react-icons/tfi";
import Header from './Header';
import useEffect from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Hooks/Reduxhook/hooks';
import { getUserapiCall } from '../../Services/UserApiSerice';
import { setUserRole } from '../../Redux/UserSlice';
import toast from 'react-hot-toast';

interface LayoutProps {
    children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [collable, setcollable] = useState<Boolean>(false);
    const dispatch = useAppDispatch();
    const Roletype: any = useAppSelector(state => state.user.Role);


    const getUserRoleType = async () => {
        try {
            const response: any = await getUserapiCall();
            if (response.success) {
                dispatch(setUserRole(response.result))
                // toast.success(response.message)
            }

        } catch (error: any) {
            toast.error(error?.message)


        }
    }

    // const navigate = useNavigate();
    // React.useEffect(() => {

    //     if (!localStorage.getItem('token')) {
    //         navigate('/login')
    //     }
    // })

    React.useEffect(() => {
        getUserRoleType();
    }, [0])
    return (
        <>
            <div className="flex block">
                <Sidebar collable={collable} Roletype={Roletype} />
                <div className="main block w-screen overflow-hidden h-screen ">

                    {/* <header className='bg-gray-300 py-2 rounded-md '>
                        <button className='p-4' onClick={(): void => setcollable(!collable)}>
                            {collable ? <TfiAlignLeft className='md:text-1xl ' /> : <TfiAlignRight className='md:text-1xl' />}
                        </button>
                    </header> */}


                    <Header collable={collable} setcollable={setcollable} />
                    <div className="content p-4  min-h-screen">
                        {children}
                    </div>
                </div>
            </div>

        </>

    )
}

export default Layout