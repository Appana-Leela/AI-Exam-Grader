import { useEffect, useMemo, useState } from "react";

import {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    enableCourse,
    disableCourse
} from "../../services/adminApi";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import SearchBar from "../../components/common/SearchBar";
import EmptyState from "../../components/common/EmptyState";
import DeleteConfirmDialog from "../../components/common/DeleteConfirmDialog";

import CourseTable from "../../components/admin/CourseTable";
import CourseModal from "../../components/admin/CourseModal";

export default function Courses() {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [deleteDialog, setDeleteDialog] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
    try {

        setLoading(true);

        const response = await getCourses();

            console.log("Courses Response:", response);
            console.log("Is Array:", Array.isArray(response));

            if (Array.isArray(response)) {
                setCourses(response);
            } else if (response?.data && Array.isArray(response.data)) {
                // Handles APIs that return { data: [...] }
                setCourses(response.data);
            } else {
                console.warn("Unexpected API response:", response);
                setCourses([]);
            }

            setError("");

        } catch (err) {

            console.error("Load Courses Error:", err);

            setError(
                err.response?.data?.message ||
                "Failed to load courses."
            );

        } finally {

            setLoading(false);

        }
        };

    const handleSave = async (formData) => {

        try {

            setSaving(true);

            if (selectedCourse) {

                await updateCourse(selectedCourse.id, formData);

            } else {

                await createCourse(formData);

            }

            setModalOpen(false);
            setSelectedCourse(null);

            await loadCourses();

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Unable to save course."
            );

        } finally {

            setSaving(false);

        }

    };

    const handleDelete = async () => {

        try {

            await deleteCourse(courseToDelete.id);

            setDeleteDialog(false);
            setCourseToDelete(null);

            await loadCourses();

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Unable to delete course."
            );

        }

    };

    const handleToggleStatus = async (course) => {

        try {

            if (course.enabled) {

                await disableCourse(course.id);

            } else {

                await enableCourse(course.id);

            }

            await loadCourses();

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Unable to update status."
            );

        }

    };

    const filteredCourses = useMemo(() => {

        return courses.filter((course) => {

            const text = `${course.courseCode} ${course.courseName} ${course.description}`
                .toLowerCase();

            return text.includes(searchTerm.toLowerCase());

        });

    }, [courses, searchTerm]);

    if (loading) {

        return <LoadingSpinner text="Loading Courses..." />;

    }

    if (error) {

        return (

            <div className="text-red-600 text-lg font-semibold">

                {error}

            </div>

        );

    }

    return (

        <div className="space-y-6">

            <div className="flex justify-between items-center">

                <h1 className="text-3xl font-bold">

                    Course Management

                </h1>

                <button

                    onClick={() => {

                        setSelectedCourse(null);

                        setModalOpen(true);

                    }}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"

                >

                    Add Course

                </button>

            </div>

            <SearchBar

                placeholder="Search courses..."

                value={searchTerm}

                onChange={(e) => setSearchTerm(e.target.value)}

            />

            {

                filteredCourses.length === 0

                    ?

                    <EmptyState

                        title="No Courses Found"

                        message="There are no courses available."

                    />

                    :

                    <CourseTable

                        courses={filteredCourses}

                        onEdit={(course) => {

                            setSelectedCourse(course);

                            setModalOpen(true);

                        }}

                        onDelete={(course) => {

                            setCourseToDelete(course);

                            setDeleteDialog(true);

                        }}

                        onToggleStatus={handleToggleStatus}

                    />

            }

            <CourseModal

                open={modalOpen}

                course={selectedCourse}

                loading={saving}

                onSubmit={handleSave}

                onClose={() => {

                    setModalOpen(false);

                    setSelectedCourse(null);

                }}

            />

            <DeleteConfirmDialog

                open={deleteDialog}

                onOpenChange={setDeleteDialog}

                onConfirm={handleDelete}

                title="Delete Course"

                description={`Delete ${courseToDelete?.courseName || ""}?`}

            />

        </div>

    );

}