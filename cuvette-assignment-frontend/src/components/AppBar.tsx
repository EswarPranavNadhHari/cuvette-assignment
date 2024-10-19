import logo from "./../assets/icons/logo.svg";

export const AppBar = ({loggedIn = false}) => {

    const name = localStorage.getItem("name")

    return (
        <div className="flex justify-between w-[91.4%] min-h-[3.84%] mx-[3.18%] relative top-[4%]">
            <a href="/" className="w-[9.54%] h-[3.84%]">
                <img src={logo} alt="Cuvette Logo" />
            </a>
            <div className="flex items-end gap-4">
                <span className="text-[#576474] text-2xl font-medium">
                    <a href="#contact">Contact</a>
                </span>
                {loggedIn ? <div className="cursor-pointer flex gap-3 text-2xl font-medium px-5 border rounded-xl">
                    <div className="flex w-6 h-6 bg-gray-400 rounded-full mt-1">

                    </div>
                    <div className="">
                        {name}
                    </div>
                </div> : null}
            </div>
        </div>
    );
}
