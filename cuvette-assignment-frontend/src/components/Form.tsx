import { ReactNode } from "react"; 

interface props {
    title: string,
    children: ReactNode
}

export const Form = ({title, children}: props) => {

    return (
        <div className="flex items-center justify-center bg-white">
            <div className="max-w-lg rounded-3xl p-px bg-gradient-to-b from-[#3F71FF] to-[#AA54FF]">
                <div className="rounded-[calc(1.5rem-1px)] p-7 bg-white">
                    <h2 className="text-2xl font-semibold text-center mb-2">{title}</h2>
                    <p className="text-center text-gray-500 mb-6">
                        Lorem Ipsum is simply dummy text
                    </p>
                    <form className="space-y-4">
                        {children}
                    </form>
                </div>
            </div>
        </div>
    );
};
