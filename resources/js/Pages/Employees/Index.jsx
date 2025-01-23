import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";

export default function Index({ employees, query }) {
    // กำหนด employees และ query ให้เป็น props ที่ส่งมาจาก Controller
    const [searchQuery, setSearchQuery] = useState(query || ""); // กำหนดค่าเริ่มต้นของคำค้นหาเป็นค่าที่ส่งมาจาก Controller
    const [isAscending, setIsAscending] = useState(true); // กำหนดค่าเริ่มต้นของการเรียงลำดับเป็นจริง

    // Sort
    const sortedEmployees = [...employees.data].sort((a, b) => {
        // ทำการคัดลอกข้อมูล employees.data และเรียงลำดับข้อมูลโดยใช้เงื่อนไขที่กำหนด
        const nameA = "${a.first_name} ${a.last_name}.toLowerCase()"; // รวมชื่อและนามสกุลของพนักงานและแปลงเป็นตัวพิมพ์เล็ก
        const nameB = "${b.first_name} ${b.last_name}.toLowerCase()"; // รวมชื่อและนามสกุลของพนักงานและแปลงเป็นตัวพิมพ์เล็ก

        if (nameA < nameB) return isAscending ? -1 : 1; // ถ้าชื่อ A น้อยกว่าชื่อ B ให้คืนค่าตามเงื่อนไขการเรียงลำดับ
        if (nameA > nameB) return isAscending ? 1 : -1; // ถ้าชื่อ A มากกว่าชื่อ B ให้คืนค่าตามเงื่อนไขการเรียงลำดับ
        return 0;
    });

    // Handle Search
    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.get("/employees", { search: searchQuery, page: 1 }); // ส่งคำค้นหาไปยังเส้นทาง /employees โดยใช้เมธอด get และส่งข้อมูลในตัวแปร searchQuery และ page
    };

    // Handle Sort Toggle
    const toggleSortOrder = () => {
        // ฟังก์ชันสำหรับการสลับการเรียงลำดับ
        setIsAscending(!isAscending); // สลับค่าของตัวแปร isAscending
    };

    // Handle Pagination
    const handlePagination = (url) => {
        // ฟังก์ชันสำหรับการจัดการการเปลี่ยนหน้า
        Inertia.get(url, { search: searchQuery }); // ส่งข้อมูลไปยังเส้นทางที่กำหนด โดยใช้เมธอด get และส่งข้อมูลในตัวแปร searchQuery
    };

    return (
        <div className="max-w-full mx-auto p-8 bg-gradient-to-r from-orange-50 via-white to-yellow-50 rounded-xl shadow-2xl">
            {/* Header Section */}
            <div className="text-center mb-10">
                <ApplicationLogo className="h-24 w-auto mx-auto mb-4 text-orange-500" />
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-wide">
                    Employee Directory
                </h1>
                <p className="text-gray-500 mt-2 text-lg">
                    Find and manage employee details effortlessly with a touch
                    of elegance.
                </p>
            </div>

            {/* Search Form */}
            <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
            >
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-lg p-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-orange-300 focus:outline-none"
                    placeholder="Search employees by name..."
                />
                <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-orange-400 text-white font-semibold rounded-full shadow-md hover:bg-orange-500 transition duration-300"
                >
                    Search
                </button>
                <button
                    onClick={toggleSortOrder}
                    type="button"
                    className="w-full sm:w-auto px-6 py-3 bg-orange-500 text-white font-semibold rounded-full shadow-md hover:bg-orange-600 transition duration-300"
                >
                    Sort {isAscending ? "A-Z" : "Z-A"}
                </button>
                <button
                    onClick={() => Inertia.visit("/employees/create")}
                    type="button"
                    className="w-full sm:w-auto px-6 py-3 bg-orange-500 text-white font-semibold rounded-full shadow-md hover:bg-orange-600 transition duration-300"
                >
                    Create
                </button>
            </form>

            {/* Employee List */}
            {sortedEmployees && sortedEmployees.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedEmployees.map((employee, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-orange-300 transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
                        >
                            <div className="flex items-center mb-4">
                                {/* ตรวจสอบว่ามีรูปภาพหรือไม่ */}
                                {employee.profile_image ? (
                                    <img
                                        src={employee.profile_image}
                                        alt={`${employee.first_name} ${employee.last_name}`}
                                        className="w-16 h-16 rounded-full object-cover shadow-md"
                                    />
                                ) : (
                                    <div className="bg-orange-100 p-3 rounded-full shadow-md">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="w-8 h-8 text-orange-500"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5.121 19.779a6.28 6.28 0 01-.866-.686C2.59 17.62 1.5 15.865 1.5 14c0-2.209 1.79-4 4-4s4 1.791 4 4c0 1.865-1.09 3.62-2.755 5.093-.323.31-.668.591-.999.845"
                                            />
                                        </svg>
                                    </div>
                                )}
                                <h2 className="ml-4 text-xl font-semibold text-gray-800">
                                    {employee.first_name} {employee.last_name}
                                </h2>
                            </div>
                            <p className="text-gray-600">
                                <strong>Birthday:</strong> {employee.birth_date}
                            </p>
                            <p className="text-gray-600">
                                <strong>Gender:</strong> {employee.gender}
                            </p>
                            <p className="text-gray-600">
                                <strong>Employee No:</strong> {employee.emp_no}
                            </p>
                            <p className="text-gray-600">
                                <strong>Hire Date:</strong> {employee.hire_date}
                            </p>
                            <p className="text-gray-600">
                                <strong>Department:</strong>{" "}
                                {employee.dept_name}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-400 italic text-lg">
                    No employees found.
                </p>
            )}

            {/* Pagination */}
            {employees &&
                employees.links && ( //
                    <div className="mt-8 flex justify-center gap-2 flex-wrap">
                        {employees.links.map((link, index) => (
                            <button
                                key={index}
                                disabled={!link.url}
                                onClick={() => handlePagination(link.url)}
                                className={`px-4 py-2 rounded-full font-medium shadow-md transition duration-300 ${
                                    link.active
                                        ? "bg-orange-400 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-orange-300 hover:text-white"
                                }`}
                            >
                                {link.label
                                    .replace("&laquo;", "«")
                                    .replace("&raquo;", "»")}
                            </button>
                        ))}
                    </div>
                )}
        </div>
    );
}
