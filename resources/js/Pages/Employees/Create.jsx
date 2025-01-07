import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function Create({ departments }) {
    const { data, setData, post, errors } = useForm({
        first_name: '',
        last_name: '',
        birth_date: '',
        gender: '',
        hire_date: '',
        dept_no: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/employees');
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Create Employee
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <input
                        id="first_name"
                        type="text"
                        value={data.first_name}
                        onChange={(e) => setData('first_name', e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                    />
                    {errors.first_name && <span className="text-red-500 text-sm">{errors.first_name}</span>}
                </div>

                <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                        Last Name
                    </label>
                    <input
                        id="last_name"
                        type="text"
                        value={data.last_name}
                        onChange={(e) => setData('last_name', e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                    />
                    {errors.last_name && <span className="text-red-500 text-sm">{errors.last_name}</span>}
                </div>

                <div>
                    <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700">
                        Birth Date
                    </label>
                    <input
                        id="birth_date"
                        type="date"
                        value={data.birth_date}
                        onChange={(e) => setData('birth_date', e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                    />
                    {errors.birth_date && <span className="text-red-500 text-sm">{errors.birth_date}</span>}
                </div>

                <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                        Gender
                    </label>
                    <select
                        id="gender"
                        value={data.gender}
                        onChange={(e) => setData('gender', e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                    >
                        <option value="">Select Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                    {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
                </div>

                <div>
                    <label htmlFor="hire_date" className="block text-sm font-medium text-gray-700">
                        Hire Date
                    </label>
                    <input
                        id="hire_date"
                        type="date"
                        value={data.hire_date}
                        onChange={(e) => setData('hire_date', e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                    />
                    {errors.hire_date && <span className="text-red-500 text-sm">{errors.hire_date}</span>}
                </div>

                <div>
                    <label htmlFor="dept_no" className="block text-sm font-medium text-gray-700">
                        Department
                    </label>
                    <select
                        id="dept_no"
                        value={data.dept_no}
                        onChange={(e) => setData('dept_no', e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                    >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept.dept_no} value={dept.dept_no}>
                                {dept.dept_name}
                            </option>
                        ))}
                    </select>
                    {errors.dept_no && <span className="text-red-500 text-sm">{errors.dept_no}</span>}
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                >
                    Create Employee
                </button>
            </form>
            <button
                type="button"
                onClick={() => Inertia.visit('/employees')}
                className="mt-6 w-full py-3 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
            >
                Back to Employee List
            </button>
        </div>
    );
}