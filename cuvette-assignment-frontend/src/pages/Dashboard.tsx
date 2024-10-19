import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button"
import { DashboardLayout } from "../components/DashboardLayout"


export const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <div>
            <DashboardLayout>
                <div className="w-44">
                    <Button className={"px-5"} title="Create Interview" onSubmit={() => {
                        navigate("/createpost")
                    }} />
                </div>
            </DashboardLayout>
        </div>
    )
}