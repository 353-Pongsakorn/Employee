import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import NavLink from "@/Components/NavLink.jsx";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";

export default function Index({ employees, query }) {
    const [isAscending, setIsAscending] = useState(true);

    // Sort employees based on the selected order
    const sortedEmployees = [...employees.data].sort((a, b) => {
        const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
        const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();

        if (nameA < nameB) return isAscending ? -1 : 1;
        if (nameA > nameB) return isAscending ? 1 : -1;
        return 0;
    });

    const [searchQuery, setSearchQuery] = useState(query || "");

    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.get("/employees", { search: searchQuery });
    };

    const toggleSortOrder = () => {
        setIsAscending(!isAscending);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-8 bg-gray-50 rounded-lg shadow-lg">
            {/* โลโก้และหัวข้อ */}
            <div className="flex justify-center mb-4">
                <ApplicationLogo className="h-20 w-auto text-blue-500" />
            </div>
            <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">
                Employee List
            </h1>

            {/* ฟอร์มค้นหา */}
            <form onSubmit={handleSearch} className="mb-6">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Search by name..."
                />
                <div className="flex space-x-2">
                    <button
                        type="submit"
                        className="mt-2 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                    >
                        Search
                    </button>
                    <button
                        type="button"
                        onClick={toggleSortOrder}
                        className="mt-2 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                    >
                        {isAscending ? "Sort A-Z" : "Sort Z-A"}
                    </button>
                    <button
                        type="button"
                        onClick={() => Inertia.visit('/employees/create')}
                        className="mt-2 py-2 px-4 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
                    >
                        Create Employee
                    </button>
                </div>
            </form>

            {/* แสดงรายการพนักงาน */}
            {sortedEmployees && sortedEmployees.length > 0 ? (
                sortedEmployees.map((employee, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 mb-6 rounded-lg shadow-sm border border-gray-200"
                    >
                        <p className="text-lg text-blue-500 font-semibold">
                            Name:{" "}
                            <span className="text-lg text-gray-700 font-normal">
                                {employee.first_name} {employee.last_name}
                            </span>
                        </p>
                        <p className="text-lg text-blue-500 font-semibold">
                            BirthDay:{" "}
                            <span className="text-lg text-gray-700 font-normal">
                                {employee.birth_date}
                            </span>
                        </p>
                        <p className="text-lg text-blue-500 font-semibold">
                            Gender:{" "}
                            <span className="text-lg text-gray-700 font-normal">
                                {employee.gender}
                            </span>
                        </p>
                        <p className="text-lg text-blue-500 font-semibold">
                            Employee No:{" "}
                            <span className="text-lg text-gray-700 font-normal">
                                {employee.emp_no}
                            </span>
                        </p>
                        <p className="text-lg text-blue-500 font-semibold">
                            Hire Date:{" "}
                            <span className="text-lg text-gray-700 font-normal">
                                {employee.hire_date}
                            </span>
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500 italic text-lg">
                    No employees found.
                </p>
            )}

            {/* Pagination */}
            <div className="mt-6 flex justify-between">
                {employees &&
                    employees.links &&
                    employees.links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={() => link.url && Inertia.get(link.url)}
                            className={`px-4 py-2 rounded-lg ${
                                link.active
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                            } hover:bg-blue-600 transition duration-300`}
                        >
                            {link.label
                                .replace("&laquo;", "«")
                                .replace("&raquo;", "»")}
                        </button>
                    ))}
            </div>
        </div>
    );
}
