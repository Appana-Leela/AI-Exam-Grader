import { useEffect, useState } from "react";

export default function TeacherForm({

    teacher,

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

        password: ""

    };

    const [formData, setFormData] = useState(initialState);

    const [errors, setErrors] = useState({});

    useEffect(() => {

        if (teacher) {

            setFormData({

                firstName: teacher.firstName || "",

                lastName: teacher.lastName || "",

                email: teacher.email || "",

                phone: teacher.phone || "",

                department: teacher.department || "",

                password: ""

            });

        }

        else {

            setFormData(initialState);

        }

    }, [teacher]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({

            ...prev,

            [name]: value

        }));

    };

    const validate = () => {

        const validationErrors = {};

        if (!formData.firstName.trim()) {

            validationErrors.firstName = "First Name is required";

        }

        if (!formData.lastName.trim()) {

            validationErrors.lastName = "Last Name is required";

        }

        if (!formData.email.trim()) {

            validationErrors.email = "Email is required";

        }

        if (!teacher && !formData.password.trim()) {

            validationErrors.password = "Password is required";

        }

        if (!formData.department.trim()) {

            validationErrors.department = "Department is required";

        }

        if (!formData.phone.trim()) {

            validationErrors.phone = "Phone Number is required";

        }

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

            {

                !teacher && (

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

                            : teacher

                                ? "Update Teacher"

                                : "Create Teacher"

                    }

                </button>

            </div>

        </form>

    );

}