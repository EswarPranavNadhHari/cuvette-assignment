import { useState } from "react";
import { AppBar } from "../components/AppBar"
import { GridLayout } from "../components/GridLayout"
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import personIcon from "./../assets/icons/person.svg"
import phoneIcon from "./../assets/icons/vector.svg"
import mailIcon from "./../assets/icons/mail.svg"
import employeesIcon from "./../assets/icons/employees.svg"

export const Signup = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        companyName: "",
        email: "",
        employeeSize: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault(); // Prevent the default form submission

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const id = data.id;
            localStorage.setItem("id", id);
            localStorage.setItem("name", formData.name);
            console.log('Success:', data);
            navigate('/verify');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="h-dvh w-full ">
            <AppBar />
            <GridLayout title="Sign Up">
                <InputBox
                    icon={personIcon} 
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                {/* Phone Input */}
                <InputBox
                    icon={phoneIcon} // Phone Icon
                    placeholder="Phone no."
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />

                {/* Company Name Input */}
                <InputBox
                    icon={personIcon} // Briefcase Icon
                    placeholder="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                />

                {/* Company Email Input */}
                <InputBox
                    icon={mailIcon} // Mail Icon
                    type="email"
                    placeholder="Company Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                {/* Employee Size Input */}
                <InputBox
                    icon={employeesIcon} // Group Icon
                    type="number"
                    placeholder="Employee Size"
                    name="employeeSize"
                    value={formData.employeeSize}
                    onChange={handleChange}
                />

                {/* Terms and Conditions */}
                <p className="text-center text-gray-400 text-sm mt-4">
                    By clicking on proceed you will accept our{" "}
                    <br />
                    <a href="#terms" className="text-blue-500">
                        Terms & Conditions
                    </a>
                </p>
                <Button title="Submit" onSubmit={handleSubmit} className={""}/>
            </GridLayout>
        </div>
    )
}