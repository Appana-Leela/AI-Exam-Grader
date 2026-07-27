import { Search, Plus, RefreshCw } from "lucide-react";

export default function TeacherToolbar({

    searchTerm,

    onSearch,

    onRefresh,

    onAdd,

    totalTeachers

}) {

    return (

        <div className="bg-white rounded-xl shadow border p-5">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                {/* Left Section */}

                <div>

                    <h2 className="text-xl font-semibold">

                        Teacher Management

                    </h2>

                    <p className="text-gray-500 mt-1">

                        Total Teachers : <span className="font-semibold">{totalTeachers}</span>

                    </p>

                </div>

                {/* Right Section */}

                <div className="flex flex-col sm:flex-row gap-3">

                    {/* Search */}

                    <div className="relative">

                        <Search

                            size={18}

                            className="absolute left-3 top-3 text-gray-400"

                        />

                        <input

                            type="text"

                            value={searchTerm}

                            onChange={(e) => onSearch(e.target.value)}

                            placeholder="Search teachers..."

                            className="pl-10 pr-4 py-2 w-72 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"

                        />

                    </div>

                    {/* Refresh */}

                    <button

                        onClick={onRefresh}

                        className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100"

                    >

                        <RefreshCw size={18} />

                        Refresh

                    </button>

                    {/* Add Teacher */}

                    <button

                        onClick={onAdd}

                        className="flex items-center justify-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"

                    >

                        <Plus size={18} />

                        Add Teacher

                    </button>

                </div>

            </div>

        </div>

    );

}