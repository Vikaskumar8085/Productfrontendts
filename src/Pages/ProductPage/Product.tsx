import React from 'react'
import Layout from '../../component/Layout/Layout'
import Breadcrumb from '../../Common/BreadCrumb/BreadCrumb'

const Product: React.FC = () => {
    return (
        <Layout>
            <Breadcrumb pageName='Product' />
            <section className='product flex sm:flex-wrap'>

            </section>
            {/* show table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 bg-white rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Position
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Location
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Salary
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b last:border-none hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">John Doe</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Developer</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">New York</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">$80,000</td>
                        </tr>
                        <tr className="bg-gray-50 border-b last:border-none hover:bg-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Jane Smith</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Designer</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">San Francisco</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">$75,000</td>
                        </tr>
                        <tr className="border-b last:border-none hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Bob Johnson</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Manager</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Seattle</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">$90,000</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </Layout>
    )
}

export default Product
