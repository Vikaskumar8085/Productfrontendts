import React from 'react'
import Layout from '../../../component/Layout/Layout'
import Breadcrumb from '../../../Common/BreadCrumb/BreadCrumb';
import {profileapicall} from '../../../Services/UserApiSerice/index';
interface Profile {
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: string;
}
const Profile: React.FC = () => {
    const url: string | null = "https://www.shutterstock.com/image-photo/portrait-young-investor-banker-workplace-260nw-2364566447.jpg";
    const [profile, setProfile] = React.useState<Profile | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response:any = await profileapicall();
                if (response && response.result) {
                    setProfile(response.result);
                } else {
                    setError('Profile data is missing or malformed');
                }
            } catch (err:any) {
                setError('Failed to fetch profile: ' + err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [setProfile, setLoading, setError]);

    
   
    return (
        <>
            <Layout>
                <Breadcrumb pageName='Profile' />

                <section className='profileheader border shadow-md flex h-auto w-full p-4'>
                    <img src={url} alt="" className='rounded-full hover:shadow-lg w-56 h-56  p-2 border' />
                    {profile && (
                        <div className="profile_details p-4 w-screen">
                            <div className="flex mb-3 py-1">
                                <span>FirstName :-</span>
                                <span>{profile.FirstName}</span>
                            </div>
                            <div className="flex mb-3 py-1">
                                <span>LastName -:</span>
                                <span>{profile.LastName}</span>
                            </div>
                            <div className="flex mb-2 py-1">
                                <span>Email -:</span>
                                <span>{profile.Email}</span>
                            </div>
                            <div className="flex mb-2 py-1">
                                <span>Phone :-</span>
                                <span>{profile.Phone}</span>
                            </div>
                        </div>
                    )}
                </section>
            </Layout></>
    )
}

export default Profile