import React from 'react'
import Layout from '../../../component/Layout/Layout'
import Breadcrumb from '../../../Common/BreadCrumb/BreadCrumb'

const ClientSecurity: React.FC = () => {

    // 
    {/* <tbody>
            {designationfetch?.map((item: any, index: number) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>
                  <div className="flex gap-2">
                    <MdOutlineEdit
                      className="text-blue-500 cursor-pointer text-2xl"
                      onClick={() => handleEdit(item.id)}
                    />
                    <div className="flex items-center justify-center bg-gray-100">
                      <MdDelete
                      className="text-red-500 cursor-pointer text-2xl"
                      onClick={() => setDialogOpen(true)}
                      />
                      <DeleteDialog
                        isOpen={isDialogOpen}
                        onClose={() => setDialogOpen(false)}
                        onDelete={() => handleDelete(item.id)}
                      />
                    </div>
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody> */}


    return (
        <Layout>
            <Breadcrumb pageName={"Client Security"} />


            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 bg-white rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>


                </table>
            </div>
        </Layout>
    )
}

export default ClientSecurity