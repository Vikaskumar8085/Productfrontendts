import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Layout from '../../../component/Layout/Layout';
import Breadcrumb from '../../../Common/BreadCrumb/BreadCrumb';
import { profileapicall, updateprofileapicall } from '../../../Services/UserApiSerice/index';
import { useAppDispatch, useAppSelector } from "../../../Hooks/Reduxhook/hooks";
import { setProfile, setUpdateProfile } from '../../../Redux/ProfileSlice/index';
import toast from 'react-hot-toast';
const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const profile = useAppSelector((state: any) => state.profile.values);

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response: any = await profileapicall();
                dispatch(setProfile(response.result));
            } catch (error: any) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, [0]);

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            const response: any = await updateprofileapicall(values);
            dispatch(setProfile(response.result));
            setIsEditing(false);
            console.log("upd",response);
            toast.success(response.message);
        } catch (error: any) {
            console.error("Error updating profile:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object({
        FirstName: Yup.string().required('First Name is required'),
        LastName: Yup.string().required('Last Name is required'),
        Email: Yup.string().email('Invalid email format').required('Email is required'),
        Phone: Yup.string()
            .matches(/^[0-9]+$/, 'Phone must contain only numbers')
            .min(10, 'Phone must be at least 10 characters')
            .required('Phone is required'),
    });

    return (
        <Layout>
            <Breadcrumb pageName='Profile' />
            <section className='profileheader border shadow-md flex h-auto w-full p-4'>
                <img
                    src={profile.ProfileImage}
                    alt="Profile"
                    className='rounded-full hover:shadow-lg w-56 h-56 p-2 border'
                />
                <div className="profile_details p-4 w-screen">
                    {isEditing ? (
                        <Formik
                            initialValues={{
                                FirstName: profile.FirstName || '',
                                LastName: profile.LastName || '',
                                Email: profile.Email || '',
                                Phone: profile.Phone || '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form className="space-y-4">
                                    <div className="flex flex-col mb-3 py-1">
                                        <label htmlFor="FirstName" className="mr-2">First Name:</label>
                                        <Field
                                            type="text"
                                            name="FirstName"
                                            className="border rounded px-2"
                                        />
                                        <ErrorMessage
                                            name="FirstName"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                    <div className="flex flex-col mb-3 py-1">
                                        <label htmlFor="LastName" className="mr-2">Last Name:</label>
                                        <Field
                                            type="text"
                                            name="LastName"
                                            className="border rounded px-2"
                                        />
                                        <ErrorMessage
                                            name="LastName"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                    <div className="flex flex-col mb-3 py-1">
                                        <label htmlFor="Email" className="mr-2">Email:</label>
                                        <Field
                                            type="email"
                                            name="Email"
                                            className="border rounded px-2"
                                        />
                                        <ErrorMessage
                                            name="Email"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                    <div className="flex flex-col mb-3 py-1">
                                        <label htmlFor="Phone" className="mr-2">Phone:</label>
                                        <Field
                                            type="text"
                                            name="Phone"
                                            className="border rounded px-2"
                                        />
                                        <ErrorMessage
                                            name="Phone"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                    <div className="flex space-x-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                        >
                                            {isSubmitting ? "Saving..." : "Save"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="bg-gray-300 px-4 py-2 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    ) : (
                        <>
                            <div className="flex mb-3 py-1">
                                <span>First Name:</span>
                                <span>{profile.FirstName}</span>
                            </div>
                            <div className="flex mb-3 py-1">
                                <span>Last Name:</span>
                                <span>{profile.LastName}</span>
                            </div>
                            <div className="flex mb-2 py-1">
                                <span>Email:</span>
                                <span>{profile.Email}</span>
                            </div>
                            <div className="flex mb-2 py-1">
                                <span>Phone:</span>
                                <span>{profile.Phone}</span>
                            </div>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Edit Profile
                            </button>
                        </>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default Profile;
