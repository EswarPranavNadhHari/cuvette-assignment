import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar"
import { GridLayout } from "../components/GridLayout"
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import phoneIcon from "./../assets/icons/vector.svg"
import mailIcon from "./../assets/icons/mail.svg"

export const Verify = () => {

    const id = localStorage.getItem("id") || ""

    const [formData, setFormData] = useState({
        phoneOtp: "",
        phoneVerified: false,
        emailOtp: "",
        emailVerified: false
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (formData.phoneVerified && formData.emailVerified) {
            const verify = async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/isverified`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'id': id,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    const token = data.token;
                    localStorage.setItem("token", token);

                    navigate('/dashboard');
                } catch (error) {
                    console.error('Error during verification:', error);
                }
            };

            verify();
        }
    }, [formData.phoneVerified, formData.emailVerified, navigate, formData.emailOtp, id]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEmailVerification = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify/email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otp: formData.emailOtp, id }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
            setFormData({ ...formData, emailVerified: true })
        } catch (error) {
            alert("incorrect otp")
            console.error('Error:', error);
        }
    };

    const handleMobileVerification = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify/phone`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otp: formData.phoneOtp, id }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setFormData({ ...formData, phoneVerified: true })
            console.log('Success:', data);
        } catch (error) {
            alert("incorrect otp")
            console.error('Error:', error);
        }
    };

    return (
        <div className="h-dvh w-full ">
            <AppBar />
            <GridLayout title="Sign Up">

                <InputBox
                    icon={mailIcon}
                    placeholder="Email OTP"
                    name="emailOtp"
                    value={formData.emailOtp}
                    onChange={handleChange}
                    verified={formData.emailVerified}
                />

                {!formData.emailVerified && <Button title="Verify" onSubmit={handleEmailVerification} className={""} />}

                <InputBox
                    icon={phoneIcon}
                    placeholder="Mobile OTP"
                    name="phoneOtp"
                    value={formData.phoneOtp}
                    onChange={handleChange}
                    verified={formData.phoneVerified}
                />

                {!formData.phoneVerified && <Button title="Verify" onSubmit={handleMobileVerification} className={""} />}
            </GridLayout>
        </div>
    )
}