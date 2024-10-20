import { useNavigate, useLocation } from "react-router-dom";
import logo from "./../assets/icons/logo.svg";
import { useEffect } from "react";
export const AppBar = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    console.log(currentPath)

    const isValidJwt = (token: string): boolean => {
        const parts = token.split('.');
        if (parts.length !== 3) {
            return false;
        }

        if (token.length <= 15) {
            return false;
        }

        return true;
    };

    let loggedIn = false
    const name = localStorage.getItem("name")
    const token = localStorage.getItem('token') || "";

    if (isValidJwt(token))
        loggedIn = true;
    console.log(loggedIn)
    useEffect(() => {
        if (loggedIn === true && (currentPath === "/" || currentPath === "/verify")) {
            navigate("/dashboard");
        }
    }, [loggedIn, currentPath, navigate]);

    return (
        <div className="flex justify-between w-[91.4%] min-h-[3.84%] mx-[3.18%] relative top-[4%]">
            <a href="/" className="w-[9.54%] h-[3.84%]">
                <img src={logo} alt="Cuvette Logo" />
            </a>
            <div className="flex items-end gap-4">
                <span className="text-[#576474] text-2xl font-medium">
                    <a href="#contact">Contact</a>
                </span>
                {loggedIn ? <div className="cursor-pointer flex items-center gap-3 text-xl font-medium px-5 border rounded-lg py-1">
                    <div className="w-6 h-6 bg-gray-400 rounded-full">

                    </div>
                    <div className="">
                        {name}
                    </div>
                    <select
                        className="focus:outline-none max-w-5 overflow-hidden"
                        onChange={(e) => {
                            if (e.target.value === "logout") {
                                localStorage.removeItem("token");
                                localStorage.removeItem("name");
                                localStorage.removeItem("id");
                                console.log("Logged out");
                                navigate("/")
                            }
                        }}
                    >
                        <option value="">Select</option>
                        <option value="logout">Logout</option>
                    </select>
                </div> : null}
            </div>
        </div>
    );
}
