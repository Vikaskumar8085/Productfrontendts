interface CardProps {
    title: string;
    description: string;
    imageUrl?: string;
    buttonText?: string;
    onButtonClick?: () => void;
    className?: string;
}

const Card: React.FC<CardProps> = ({
    title,
    description,
    imageUrl,
    buttonText,
    onButtonClick,
    className = '',
}) => {
    return (
        <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`}>
            {/* Image Section */}
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="Card Image"
                    className="w-full h-48 object-cover"
                />
            )}

            {/* Content Section */}
            <div className="p-4">
                <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                <p className="text-gray-600 mt-2">{description}</p>
            </div>

            {/* Button Section */}
            {buttonText && onButtonClick && (
                <div className="p-4">
                    <button
                        onClick={onButtonClick}
                        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                    >
                        {buttonText}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Card;
