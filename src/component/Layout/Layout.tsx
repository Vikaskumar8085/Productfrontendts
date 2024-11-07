import React, { ReactNode, useState } from 'react'
import Sidebar from './Sidebar'
import { TfiAlignLeft, TfiAlignRight } from "react-icons/tfi";
import Header from './Header';

interface LayoutProps {
    children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [collable, setcollable] = useState<Boolean>(false);


    return (
        <>
            <div className="flex block">
                <Sidebar collable={collable} />
                <div className="main block w-screen overflow-hidden h-screen ">

                    {/* <header className='bg-gray-300 py-2 rounded-md '>
                        <button className='p-4' onClick={(): void => setcollable(!collable)}>
                            {collable ? <TfiAlignLeft className='md:text-1xl ' /> : <TfiAlignRight className='md:text-1xl' />}
                        </button>
                    </header> */}


                    <Header collable={collable} setcollable={setcollable} />
                    <div className="content p-4  bg-yellow-800 min-h-screen">
                        {children}
                    </div>
                </div>
            </div>

        </>

    )
}

export default Layout