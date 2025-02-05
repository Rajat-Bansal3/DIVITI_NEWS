import React from "react";

type FilterOption = {
  label: string;
  value: string;
};

type FilterProps = {
  title?: string;
  options: FilterOption[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
};

const Filter: React.FC<FilterProps> = ({
  title = "Filter",
  options,
  selectedOptions,
  onChange,
}) => {
  const toggleOption = (value: string) => {
    const updatedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((opt) => opt !== value)
      : [...selectedOptions, value];
    onChange(updatedOptions);
  };

  return (
    <div className='mt-8'>
      <h2 className='text-lg font-semibold text-gray-800 mb-4'>{title}</h2>
      <div className='flex flex-wrap gap-3'>
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => toggleOption(option.value)}
            className={`px-4 py-2 rounded-full border text-sm transition-colors duration-200 ${
              selectedOptions.includes(option.value)
                ? "bg-red-500 text-white border-red-500"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
