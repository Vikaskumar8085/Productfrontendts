// CandidateFormModal.tsx
import React, { useState } from 'react';
// import Modal from './Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CandidateForm } from '../../Types';

const CandidateFormModal: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const formik = useFormik<CandidateForm>({
        initialValues: {
            Candidate_Name: '',
            Resume_Title: '',
            Contact_Number: '',
            Email: '',
            Work_Exp: '',
            Current_Ctc: 0,
            Salary: '',
            Current_Location: '',
            State: '',
            Region: '',
            UserId: 0,
        },
        validationSchema: Yup.object({
            Candidate_Name: Yup.string().required('Required'),
            Resume_Title: Yup.string().required('Required'),
            Contact_Number: Yup.string().required('Required'),
            Email: Yup.string().email('Invalid email address').required('Required'),
            Work_Exp: Yup.string().required('Required'),
            Current_Ctc: Yup.number().min(0, 'CTC must be a positive number').required('Required'),
            Salary: Yup.string().required('Required'),
            Current_Location: Yup.string().required('Required'),
            State: Yup.string().required('Required'),
            Region: Yup.string().required('Required'),
            UserId: Yup.number().min(0, 'User ID must be a positive number').required('Required'),
        }),
        onSubmit: (values) => {
            console.log(values); // Handle form submission logic here
            setModalOpen(false); // Close modal on submit
        },
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <button
                onClick={() => setModalOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Open Candidate Form
            </button>

            {/* <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} children={undefined}>
             
            </Modal> */}
        </div>
    );
};

export default CandidateFormModal;
