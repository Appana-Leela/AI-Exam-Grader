import CourseForm from "./CourseForm";

export default function CourseModal({

    open,

    course,

    loading,

    onSubmit,

    onClose

}) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4">

                {/* Header */}

                <div className="flex items-center justify-between border-b px-6 py-4">

                    <h2 className="text-xl font-semibold">

                        {

                            course

                                ? "Edit Course"

                                : "Add New Course"

                        }

                    </h2>

                    <button

                        onClick={onClose}

                        className="text-gray-500 hover:text-red-500 text-2xl"

                    >

                        ×

                    </button>

                </div>

                {/* Body */}

                <div className="p-6">

                    <CourseForm

                        course={course}

                        loading={loading}

                        onSubmit={onSubmit}

                        onCancel={onClose}

                    />

                </div>

            </div>

        </div>

    );

}