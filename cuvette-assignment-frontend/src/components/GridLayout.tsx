import { Text } from "./Text"
import { Form } from "./Form"
import { ReactNode } from "react"

interface props {
    title: string,
    children: ReactNode
}

export const GridLayout = ({title, children}: props) => {
    
    return (
        <div>
            <div className="grid grid-rows-5 grid-cols-12 my-16">
                <div className="col-start-1 col-end-7 row-start-3 w-3/4 relative ml-20">
                    <Text/>
                </div>
                <div className="flex col-start-7 col-end-13 row-start-1 row-end-6 relative justify-center p-2">
                    <Form title={title}>
                        {children}
                    </Form>
                </div>
            </div>
        </div>
    )
}