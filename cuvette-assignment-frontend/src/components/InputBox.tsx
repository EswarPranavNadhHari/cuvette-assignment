
import verifyIcon  from "../assets/icons/verified.svg"

interface props {
    icon: string,
    placeholder: string,
    type?: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    name: string,
    verified?: boolean
}

export const InputBox = ({ icon, placeholder, type = "text", value, onChange, name, verified = false }: props) => {
    return (
        <div className="relative mb-4">
            <span className="absolute w-3 h-3 left-3 top-4 text-gray-400">
                <img src={icon}></img>
            </span>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-[450px] py-2 pl-10 pr-4 font-normal bg-gray-100 border border-[#CCCCCC] rounded-lg focus:outline-none"
                disabled={verified}
            />
            {verified && (
                <span className="absolute right-3 top-2 text-gray-400">
                  <img src={verifyIcon}/>  
                </span>
            )}
        </div>
    );
};
