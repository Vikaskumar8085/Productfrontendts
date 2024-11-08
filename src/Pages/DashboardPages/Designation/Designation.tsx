import React from 'react'
import Layout from '../../../component/Layout/Layout'
import Breadcrumb from '../../../Common/BreadCrumb/BreadCrumb'

const Designation = () => {
    return (
        <Layout>
            <Breadcrumb pageName='Designation' />


            <div className="designation_header">
                <button className='p-2 bg-yellow-200'>add Designation</button>
            </div>

        </Layout>
    )
}

export default Designation