import { AppBar } from "../components/AppBar"
import homeIcon from "./../assets/icons/home.svg"

export const DashboardLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="h-dvh w-full">
            <div className="border-b p-4">
                <AppBar loggedIn={true}/>
            </div>
            <div className="flex h-[90%]">
                <div className="border-r">
                    <a href="/dashboard"><img src={homeIcon} className="p-4 w-14 h-14 mt-7"/></a>
                </div>
                <div className="py-9 px-6 w-full">
                    {children}
                </div>
            </div>
        </div>
    )
}