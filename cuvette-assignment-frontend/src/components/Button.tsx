export const Button = ({title, className, onSubmit}: {title: string, className: string, onSubmit: (React.MouseEventHandler<HTMLButtonElement>)
}) => {
    return <div>
        <button
            type="submit"
            className={`w-full px-2 font-bold py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none ${className}`}
            onClick={onSubmit}
        >
            {title}
        </button>
    </div>
}