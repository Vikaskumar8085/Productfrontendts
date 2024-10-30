// src/components/Welcome.tsx

import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './Welcome.css'

const Welcome: React.FC = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <div className='container'>
            <h1>Welcome</h1>
            {isSignIn ? (
                <SignIn onSwitch={toggleForm} />
            ) : (
                <SignUp onSwitch={toggleForm} />
            )}
        </div>
    );
};

export default Welcome;
