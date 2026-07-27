export default function SearchBar({

    placeholder = "Search...",

    value,

    onChange

}) {

    return (

        <input

            type="text"

            placeholder={placeholder}

            value={value}

            onChange={onChange}

            className="w-full md:w-96 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"

        />

    );

}