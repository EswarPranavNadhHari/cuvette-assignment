import { useState } from "react";
import { Button } from "../components/Button"
import { DashboardLayout } from "../components/DashboardLayout"
import { useNavigate } from "react-router-dom";
import { TagInput } from "../components/TagInput";


export const CreatePost = () => {

    const token = localStorage.getItem("token") || ""
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        experienceLevel: '',
        candidates: [],
        endDate: '',
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleTagChange = (tags: any) => {
        setFormData({ ...formData, candidates: tags });
    };

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e: { preventDefault: () => void; } ) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/post`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error)
                throw new Error('Network response was not ok');
            }

            console.log('Success:', data);
            alert(data.message)

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <DashboardLayout>
                <div className="flex justify-start text-xl">
                    <div className="px-6 w-[60%]">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 flex ">
                                <label className="flex min-w-44 justify-end mr-10 items-center">Job Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Enter Job Title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full p-2 border  rounded text-black focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="flex mb-4">
                                <label className="flex min-w-44 justify-end mr-10 items-start pt-2">Job Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Enter Job Description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full p-2  border  rounded text-black focus:outline-none focus:border-blue-500"
                                    rows={4}
                                    required
                                ></textarea>
                            </div>

                            <div className="flex mb-4">
                                <label className="flex min-w-44 justify-end mr-10 items-center">experienceLevel</label>
                                <select
                                    name="experienceLevel"
                                    value={formData.experienceLevel}
                                    onChange={handleChange}
                                    className="w-full p-2  border  rounded text-black focus:outline-none focus:border-blue-500"
                                    required
                                >
                                    <option value="" disabled>Select Experience Level</option>
                                    <option value="junior">Junior</option>
                                    <option value="mid">Mid</option>
                                    <option value="senior">Senior</option>
                                </select>
                            </div>

                            <div className="flex mb-4">
                                <label className="flex min-w-44 justify-end mr-10 items-center">Add Candidate</label>
                                <TagInput tags={formData.candidates} setTags={handleTagChange} />
                            </div>

                            <div className="flex mb-4">
                                <label className="flex min-w-44 justify-end mr-10 items-center">End Date</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    className="w-full p-2  border  rounded text-black focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="flex justify-end font-medium">
                                <Button
                                    title="send"
                                    className="w-32 mt-10"
                                    onSubmit={() => {
                                        navigate("/createpost")
                                    }}
                                >
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </DashboardLayout>
        </div>
    )
}