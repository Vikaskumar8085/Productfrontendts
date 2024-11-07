interface ButtonProps {
    text: string;
    click: () => void;
    classname?: string;
    type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
    classname = 'px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition', // Default styling
    text,
    click,
    type = 'button', // Default button type
}) => {
    return (
        <button className={classname} onClick={click} type={type}>
            {text}
        </button>
    );
};

export default Button;
