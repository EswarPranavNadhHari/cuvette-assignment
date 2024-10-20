import React, { useState } from 'react';

// Define props types for TagInput component
interface TagInputProps {
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

// Function to validate email format
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return emailRegex.test(email);
};

// TagInput Component
export const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            const trimmedInput = inputValue.trim();

            // Check if the input is a valid email and not already tagged
            if (isValidEmail(trimmedInput) && !tags.includes(trimmedInput)) {
                setTags([...tags, trimmedInput]);
                setInputValue(''); // Clear input field on successful tagging
            } else if (!isValidEmail(trimmedInput)) {
                // Clear input field if the email is invalid
                setInputValue('');
            }
        }

        // Allow removing a tag when Backspace is pressed if the input is empty
        if (event.key === 'Backspace' && !inputValue && tags.length) {
            setTags(tags.slice(0, -1)); // Remove the last tag
        }
    };

    const handleTagRemove = (tagToRemove: string): void => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="flex items-center border border-gray-300 rounded-lg p-2 flex-wrap w-full">
            {tags.map((tag, index) => (
                <div
                    key={index}
                    className="border border-gray-400 text-black rounded-full px-2 py-2 m-1 cursor-pointer text-sm flex items-center"
                    onClick={() => handleTagRemove(tag)}
                >
                    <div className="flex w-4 h-4 bg-gray-400 rounded-full mr-1">

                    </div>
                    {tag} <span className="ml-1">&times;</span> {/* Remove icon */}
                </div>
            ))}
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={!inputValue ? "Add email and press Enter" : ''}
                className={`flex-1 p-1 border-none outline-none min-w-0 ${tags.length > 0 ? 'w-full' : 'w-auto'}`}
            />
        </div>
    );
};
