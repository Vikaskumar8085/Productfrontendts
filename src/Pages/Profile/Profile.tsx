import React from 'react'
import Layout from '../../component/Layout/Layout'

const Profile: React.FC = () => {
    return (
        <>
            <Layout>

                <section className='profileheader border shadow-md grid justify-center h-auto w-full p-4'>
                    <img src="" alt="" className='rounded-full bg-yellow-900 w-56 h-56  p-2 border' />
                </section>
                <section className="profile_details mt-3">
                    profile details
                </section>

            </Layout></>
    )
}

export default Profile