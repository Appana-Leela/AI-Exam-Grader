import { useEffect, useState } from "react";

export default function StudentForm({

    student,

    onSubmit,

    onCancel,

    loading

}) {

    const initialState = {

        firstName: "",

        lastName: "",

        email: "",

        phone: "",

        department: "",

        rollNumber: "",

        year: "",

        section: "",

        password: ""

    };

    const [formData, setFormData] = useState(initialState);

    const [errors, setErrors] = useState({});

    useEffect(() => {

        if (student) {

            setFormData({

                firstName: student.firstName || "",

                lastName: student.lastName || "",

                email: student.email || "",

                phone: student.phone || "",

                department: student.department || "",

                rollNumber: student.rollNumber || "",

                year: student.year || "",

                section: student.section || "",

                password: ""

            });

        } else {

            setFormData(initialState);

        }

    }, [student]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({

            ...prev,

            [name]: value

        }));

    };

    const validate = () => {

        const validationErrors = {};

        if (!formData.firstName.trim())
            validationErrors.firstName = "First Name is required";

        if (!formData.lastName.trim())
            validationErrors.lastName = "Last Name is required";

        if (!formData.email.trim())
            validationErrors.email = "Email is required";

        if (!formData.phone.trim())
            validationErrors.phone = "Phone Number is required";

        if (!formData.department.trim())
            validationErrors.department = "Department is required";

        if (!formData.rollNumber.trim())
            validationErrors.rollNumber = "Roll Number is required";

        if (!formData.year.trim())
            validationErrors.year = "Year is required";

        if (!formData.section.trim())
            validationErrors.section = "Section is required";

        if (!student && !formData.password.trim())
            validationErrors.password = "Password is required";

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!validate()) return;

        onSubmit(formData);

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >

            <div className="grid grid-cols-2 gap-4">

                <div>

                    <label className="font-medium">
                        First Name
                    </label>

                    <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 mt-1"
                    />

                    <p className="text-red-500 text-sm">
                        {errors.firstName}
                    </p>

                </div>

                <div>

                    <label className="font-medium">
                        Last Name
                    </label>

                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 mt-1"
                    />

                    <p className="text-red-500 text-sm">
                        {errors.lastName}
                    </p>

                </div>

            </div>

            <div>

                <label className="font-medium">
                    Email
                </label>

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 mt-1"
                />

                <p className="text-red-500 text-sm">
                    {errors.email}
                </p>

            </div>

            <div className="grid grid-cols-2 gap-4">

                <div>

                    <label className="font-medium">
                        Phone Number
                    </label>

                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 mt-1"
                    />

                    <p className="text-red-500 text-sm">
                        {errors.phone}
                    </p>

                </div>

                <div>

                    <label className="font-medium">
                        Department
                    </label>

                    <input
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 mt-1"
                    />

                    <p className="text-red-500 text-sm">
                        {errors.department}
                    </p>

                </div>

            </div>

            <div className="grid grid-cols-3 gap-4">

                <div>

                    <label className="font-medium">
                        Roll Number
                    </label>

                    <input
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 mt-1"
                    />

                    <p className="text-red-500 text-sm">
                        {errors.rollNumber}
                    </p>

                </div>

                <div>

                    <label className="font-medium">
                        Year
                    </label>

                    <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 mt-1"
                    >
                        <option value="">Select</option>
                        <option value="I">I</option>
                        <option value="II">II</option>
                        <option value="III">III</option>
                        <option value="IV">IV</option>
                    </select>

                    <p className="text-red-500 text-sm">
                        {errors.year}
                    </p>

                </div>

                <div>

                    <label className="font-medium">
                        Section
                    </label>

                    <input
                        name="section"
                        value={formData.section}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 mt-1"
                    />

                    <p className="text-red-500 text-sm">
                        {errors.section}
                    </p>

                </div>

            </div>

            {

                !student && (

                    <div>

                        <label className="font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2 mt-1"
                        />

                        <p className="text-red-500 text-sm">
                            {errors.password}
                        </p>

                    </div>

                )

            }

            <div className="flex justify-end gap-3 pt-4">

                <button
                    type="button"
                    onClick={onCancel}
                    className="px-5 py-2 rounded-lg border"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >

                    {

                        loading

                            ? "Saving..."

                            : student

                                ? "Update Student"

                                : "Create Student"

                    }

                </button>

            </div>

        </form>

    );

}