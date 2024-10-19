import { useState } from "react";
import { AppBar } from "../components/AppBar"
import { GridLayout } from "../components/GridLayout"
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";

export const Verify = () => {

    const token = localStorage.getItem("token") || ""

    const [formData, setFormData] = useState({
        phoneOtp: "",
        phoneVerified: false,
        emailOtp: "",
        emailVerified: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEmailVerification = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/verify/email', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({otp: formData.emailOtp}),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
            setFormData({...formData, emailVerified: true})
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleMobileVerification = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/verify/phone', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({otp: formData.phoneOtp}),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setFormData({...formData, phoneVerified: true})
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="h-dvh w-full ">
            <AppBar />
            <GridLayout title="Sign Up">

                <InputBox
                    icon="&#9993;" 
                    placeholder="Email OTP"
                    name="emailOtp"
                    value={formData.emailOtp}
                    onChange={handleChange}
                    verified={formData.emailVerified}
                />

                {!formData.emailVerified && <Button title="Verify" onSubmit={handleEmailVerification} className={""}/>}

                <InputBox
                    icon="&#128222;" 
                    placeholder="Mobile OTP"
                    name="phoneOtp"
                    value={formData.phoneOtp}
                    onChange={handleChange}
                    verified={formData.phoneVerified}
                />

                {!formData.phoneVerified && <Button title="Verify" onSubmit={handleMobileVerification} className={""}/>}
            </GridLayout>
        </div>
    )
}