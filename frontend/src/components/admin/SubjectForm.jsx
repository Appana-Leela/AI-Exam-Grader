import { useEffect, useState } from "react";

export default function SubjectForm({

    subject,

    courses,

    onSubmit,

    onCancel,

    loading

}) {

    const initialState = {

        subjectCode: "",

        subjectName: "",

        description: "",

        credits: "",

        semester: "",

        courseId: ""

    };

    const [formData, setFormData] = useState(initialState);

    const [errors, setErrors] = useState({});

    useEffect(() => {

        if (subject) {

            setFormData({

                subjectCode: subject.subjectCode || "",

                subjectName: subject.subjectName || "",

                description: subject.description || "",

                credits: subject.credits || "",

                semester: subject.semester || "",

                courseId: subject.courseId || ""

            });

        } else {

            setFormData(initialState);

        }

    }, [subject]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({

            ...prev,

            [name]: value

        }));

    };

    const validate = () => {

        const validationErrors = {};

        if (!formData.subjectCode.trim())
            validationErrors.subjectCode = "Subject Code is required";

        if (!formData.subjectName.trim())
            validationErrors.subjectName = "Subject Name is required";

        if (!formData.courseId)
            validationErrors.courseId = "Course is required";

        if (!formData.semester)
            validationErrors.semester = "Semester is required";

        if (!formData.credits)
            validationErrors.credits = "Credits are required";

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!validate()) return;

        onSubmit({

            ...formData,

            credits: Number(formData.credits),
            semester: Number(formData.semester)

        });

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >

            <div className="grid grid-cols-2 gap-4">

                <div>

                    <label className="font-medium">

                        Subject Code

                    </label>

                    <input

                        name="subjectCode"

                        value={formData.subjectCode}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-2 mt-1"

                        placeholder="CS301"

                    />

                    <p className="text-red-500 text-sm">

                        {errors.subjectCode}

                    </p>

                </div>

                <div>

                    <label className="font-medium">

                        Subject Name

                    </label>

                    <input

                        name="subjectName"

                        value={formData.subjectName}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-2 mt-1"

                        placeholder="Database Management Systems"

                    />

                    <p className="text-red-500 text-sm">

                        {errors.subjectName}

                    </p>

                </div>

            </div>

            <div>

                <label className="font-medium">

                    Course

                </label>

                <select

                    name="courseId"

                    value={formData.courseId}

                    onChange={handleChange}

                    className="w-full border rounded-lg p-2 mt-1"

                >

                    <option value="">

                        Select Course

                    </option>

                    {

                        courses.map((course) => (

                            <option
                                key={course.id}
                                value={course.id}
                            >

                                {course.courseName}

                            </option>

                        ))

                    }

                </select>

                <p className="text-red-500 text-sm">

                    {errors.courseId}

                </p>

            </div>

            <div className="grid grid-cols-2 gap-4">

                <div>

                    <label className="font-medium">

                        Semester

                    </label>

                    <select

                        name="semester"

                        value={formData.semester}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-2 mt-1"

                    >

                        <option value="">

                            Select Semester

                        </option>

                        {

                            [1,2,3,4,5,6,7,8].map((sem)=>(

                                <option
                                    key={sem}
                                    value={sem}
                                >

                                    Semester {sem}

                                </option>

                            ))

                        }

                    </select>

                    <p className="text-red-500 text-sm">

                        {errors.semester}

                    </p>

                </div>

                <div>

                    <label className="font-medium">

                        Credits

                    </label>

                    <select

                        name="credits"

                        value={formData.credits}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-2 mt-1"

                    >

                        <option value="">

                            Select Credits

                        </option>

                        {

                            [1,2,3,4,5,6].map((credit)=>(

                                <option
                                    key={credit}
                                    value={credit}
                                >

                                    {credit}

                                </option>

                            ))

                        }

                    </select>

                    <p className="text-red-500 text-sm">

                        {errors.credits}

                    </p>

                </div>

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

                    placeholder="Enter subject description..."

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

                            : subject

                                ? "Update Subject"

                                : "Create Subject"

                    }

                </button>

            </div>

        </form>

    );

}