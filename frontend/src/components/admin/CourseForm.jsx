import { useEffect, useState } from "react";

export default function CourseForm({

    course,

    onSubmit,

    onCancel,

    loading

}) {

    const initialState = {

        courseCode: "",

        courseName: "",

        duration: "",

        description: ""

    };

    const [formData, setFormData] = useState(initialState);

    const [errors, setErrors] = useState({});

    useEffect(() => {

        if (course) {

            setFormData({

                courseCode: course.courseCode || "",

                courseName: course.courseName || "",

                duration: course.duration || "",

                description: course.description || ""

            });

        } else {

            setFormData(initialState);

        }

    }, [course]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({

            ...prev,

            [name]: value

        }));

    };

    const validate = () => {

        const validationErrors = {};

        if (!formData.courseCode.trim())
            validationErrors.courseCode = "Course Code is required";

        if (!formData.courseName.trim())
            validationErrors.courseName = "Course Name is required";

        if (!formData.duration.trim())
            validationErrors.duration = "Duration is required";

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

                        Course Code

                    </label>

                    <input

                        name="courseCode"

                        value={formData.courseCode}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-2 mt-1"

                        placeholder="CSE"

                    />

                    <p className="text-red-500 text-sm">

                        {errors.courseCode}

                    </p>

                </div>

                <div>

                    <label className="font-medium">

                        Course Name

                    </label>

                    <input

                        name="courseName"

                        value={formData.courseName}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-2 mt-1"

                        placeholder="Computer Science & Engineering"

                    />

                    <p className="text-red-500 text-sm">

                        {errors.courseName}

                    </p>

                </div>

            </div>

            <div>

                <label className="font-medium">

                    Duration

                </label>

                <select

                    name="duration"

                    value={formData.duration}

                    onChange={handleChange}

                    className="w-full border rounded-lg p-2 mt-1"

                >

                    <option value="">

                        Select Duration

                    </option>

                    <option value="2 Years">

                        2 Years

                    </option>

                    <option value="3 Years">

                        3 Years

                    </option>

                    <option value="4 Years">

                        4 Years

                    </option>

                    <option value="5 Years">

                        5 Years

                    </option>

                </select>

                <p className="text-red-500 text-sm">

                    {errors.duration}

                </p>

            </div>

            <div>

                <label className="font-medium">

                    Description

                </label>

                <textarea

                    rows={4}

                    name="description"

                    value={formData.description}

                    onChange={handleChange}

                    className="w-full border rounded-lg p-2 mt-1 resize-none"

                    placeholder="Enter course description..."

                />

            </div>

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

                            : course

                                ? "Update Course"

                                : "Create Course"

                    }

                </button>

            </div>

        </form>

    );

}