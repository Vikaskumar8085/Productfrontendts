import React from 'react'
import Layout from '../../../component/Layout/Layout'
import Breadcrumb from '../../../Common/BreadCrumb/BreadCrumb';

const Profile: React.FC = () => {
    const url: string | null = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    ;
   
    return (
        <>
            <Layout>
                <Breadcrumb pageName='Profile' />

                <section className='profileheader border shadow-md flex h-auto w-full p-4'>
                    <img src={url} alt="" className='rounded-full hover:shadow-lg w-56 h-56  p-2 border' />
                    <div className="profile_details p-4 w-screen">
                        <div className="flex mb-3 py-1">
                            <span>FirstName :-</span>
                            <span>John</span>
                        </div>
                        <div className="flex mb-3 py-1">
                            <span>LastName -:</span>
                            <span>Doe</span>
                        </div>
                        <div className="flex mb-2 py-1">
                            <span>Email -:</span>
                            <span>JhonDoe@gmail.com</span>
                        </div>
                        <div className="flex mb-2 py-1">
                            <span>Phone :-</span>
                            <span>+918085621934</span>
                        </div>
                    </div>
                </section>
            </Layout></>
    )
}

export default Profile