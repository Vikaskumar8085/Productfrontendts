import React from 'react'
import Layout from '../../../component/Layout/Layout'
import Breadcrumb from '../../../Common/BreadCrumb/BreadCrumb'
import useState from 'react';
import Modal from '../../../Common/Modal/Modal';

const Candidate: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState<boolean | null>(false)
    return (
        <Layout>
            <Breadcrumb pageName='Candidate' />
            <section className='product gap-2 flex flex-row mb-3 p-2 bg-gray-200'>
                <button onClick={() => setIsOpen(true)} className='bg-white capitalize border py-1 px-3 '>
                    add candidate
                </button>
                {/* model */}
                {isOpen && <Modal setOpen={setIsOpen}>
                    <div className='form'>

                        <form>

                            <div className="mb-3">
                                <label htmlFor="Name">Name</label>
                                <input type="text" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Email" className='w-100 '>Email</label>
                                <input type="text" className='border' />
                            </div>

                        </form>

                    </div>
                </Modal>}

                {/* model */}
                <select className='p-1'>
                    <option value="bulk action">bulk action</option>
                    <option value="upload csv">csv upload</option>
                    <option value="bulk action">bulk action</option>
                </select>
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

export default Candidate
