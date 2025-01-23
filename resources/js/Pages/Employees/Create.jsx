import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import { Select } from "flowbite-react";

export default function Create({ departments = [] }) {
    // กำหนด departments ให้เป็น props ที่ส่งมาจาก Controller
    const { data, setData, post, errors } = useForm({
        // กำหนด data, setData, post, errors โดยใช้ hook useForm จาก Inertia.js
        first_name: "",
        last_name: "",
        birth_date: "",
        gender: "",
        hire_date: "",
        dept_no: "",
        profile_image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('profile_image', file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        // ฟังก์ชันสำหรับจัดการการส่งข้อมูลฟอร์ม
        e.preventDefault(); // ป้องกันการโหลดหน้าใหม่เมื่อกดปุ่ม Submit

        const formData = new FormData(); // สร้าง FormData เพื่อเก็บข้อมูลฟอร์ม และส่งไปยังเส้นทาง เนื่องจากเราต้องการส่งไฟล์รูปภาพด้วย useState จึงใช้ FormData แทน JSON
        formData.append("first_name", data.first_name);
        formData.append("last_name", data.last_name);
        formData.append("birth_date", data.birth_date);
        formData.append("gender", data.gender);
        formData.append("hire_date", data.hire_date);
        formData.append("dept_no", data.dept_no);

        if (data.profile_image) {
            // ตรวจสอบว่ามีไฟล์รูปภาพถูกเลือกหรือไม่
            formData.append("profile_image", data.profile_image); // ถ้ามี ให้เพิ่มไฟล์รูปภาพลงใน FormData
        }

        post("/employees", formData); // ส่งข้อมูลไปยังเส้นทาง /employees โดยใช้เมธอด post และส่งข้อมูลในตัวแปร formData
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg bg-gradient-to-r from-orange-50 via-white to-yellow-50 rounded-xl shadow-2xl">
            <ApplicationLogo className="h-24 w-auto mx-auto mb-4 text-orange-500" />
            <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
                Create New Employee
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Details Section */}
                <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <div className="bg-gray-50 p-6 rounded-lg shadow-md bg-gradient-to-r from-orange-50 via-white to-yellow-50 rounded-xl shadow-2xl">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">
                        {" "}
                        Personal Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* First Name */}
                        <div>
                            <label
                                htmlFor="first_name"
                                className="block text-s font-medium text-gray-600"
                            >
                                First Name
                            </label>
                            <input
                                id="first_name"
                                type="text"
                                value={data.first_name}
                                onChange={(e) =>
                                    setData("first_name", e.target.value)
                                }
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-orange-400 focus:border-orange-500"
                            />
                            {errors.first_name && (
                                <span className="text-red-500 text-sm">
                                    {errors.first_name}
                                </span>
                            )}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label
                                htmlFor="last_name"
                                className="block text-s font-medium text-gray-600"
                            >
                                Last Name
                            </label>
                            <input
                                id="last_name"
                                type="text"
                                value={data.last_name}
                                onChange={(e) =>
                                    setData("last_name", e.target.value)
                                }
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-orange-400 focus:border-orange-500"
                            />
                            {errors.last_name && (
                                <span className="text-red-500 text-sm">
                                    {errors.last_name}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Employment Details Section */}
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <div className="bg-gray-50 p-6 rounded-lg shadow-md bg-gradient-to-r from-orange-50 via-white to-yellow-50 rounded-xl shadow-2xl">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">
                        {" "}
                        Employment Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Birth Date */}
                        <div>
                            <label
                                htmlFor="birth_date"
                                className="block text-s font-medium text-gray-600"
                            >
                                Birth Date
                            </label>
                            <input
                                id="birth_date"
                                type="date"
                                value={data.birth_date}
                                onChange={(e) =>
                                    setData("birth_date", e.target.value)
                                }
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-orange-400 focus:border-orange-500"
                            />
                            {errors.birth_date && (
                                <span className="text-red-500 text-sm">
                                    {errors.birth_date}
                                </span>
                            )}
                        </div>

                        {/* Gender */}
                        <div>
                            <label
                                htmlFor="gender"
                                className="block text-s font-medium text-gray-600"
                            >
                                Gender
                            </label>
                            <Select
                                id="gender"
                                value={data.gender || ""}
                                onChange={(e) =>
                                    setData("gender", e.target.value)
                                }
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-orange-400 focus:border-orange-500 text-sm"
                            >
                                <option value="">Select Gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </Select>
                            {errors.gender && (
                                <span className="text-red-500 text-sm mt-2">
                                    {errors.gender}
                                </span>
                            )}
                        </div>

                        {/* Hire Date */}
                        <div>
                            <label
                                htmlFor="hire_date"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Hire Date
                            </label>
                            <input
                                id="hire_date"
                                type="date"
                                value={data.hire_date}
                                onChange={(e) =>
                                    setData("hire_date", e.target.value)
                                }
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-orange-400 focus:border-orange-500"
                            />
                            {errors.hire_date && (
                                <span className="text-red-500 text-sm">
                                    {errors.hire_date}
                                </span>
                            )}
                        </div>

                        {/* Department */}
                        <div>
                            <label
                                htmlFor="dept_no"
                                className="text-sm font-medium text-gray-600"
                            >
                                Department
                            </label>
                            <Select
                                id="dept_no"
                                value={data.dept_no}
                                onChange={(e) =>
                                    setData("dept_no", e.target.value)
                                }
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-orange-400 focus:border-orange-500"
                            >
                                <option value="">Select Department</option>
                                {departments.map((dept) => (
                                    <option
                                        key={dept.dept_no}
                                        value={dept.dept_no}
                                    >
                                        {dept.dept_name}
                                    </option>
                                ))}
                            </Select>
                            {errors.dept_no && (
                                <span className="text-red-500 text-sm">
                                    {errors.dept_no}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Profile Image */}
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <div className="bg-gray-50 p-6 rounded-lg shadow-md bg-gradient-to-r from-orange-50 via-white to-yellow-50 rounded-xl shadow-2xl">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">
                        Profile Image
                    </h2>
                    <div className="flex items-center space-x-4">
                        <label
                            htmlFor="profile_image"
                            className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white text-sm py-2 px-4 rounded-md shadow-md transition"
                        >
                            Choose File
                        </label>
                        <input
                            id="profile_image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        {data.profile_image && (
                            <span className="text-sm text-gray-700">
                                {data.profile_image.name}
                            </span>
                        )}
                    </div>
                    {errors.profile_image && (
                        <span className="text-red-500 text-sm">
                            {errors.profile_image}
                        </span>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-md shadow-md"
                >
                    Save Employee
                </button>
            </form>
        </div>
    );
}
