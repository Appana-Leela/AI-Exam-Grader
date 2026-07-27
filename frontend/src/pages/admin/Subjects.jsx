import { useEffect, useMemo, useState } from "react";

import {
    getSubjects,
    createSubject,
    updateSubject,
    deleteSubject,
    enableSubject,
    disableSubject,
    getCourses
} from "../../services/adminApi";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import SearchBar from "../../components/common/SearchBar";
import EmptyState from "../../components/common/EmptyState";
import DeleteConfirmDialog from "../../components/common/DeleteConfirmDialog";

import SubjectTable from "../../components/admin/SubjectTable";
import SubjectModal from "../../components/admin/SubjectModal";

export default function Subjects() {

    const [subjects, setSubjects] = useState([]);
    const [courses, setCourses] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [deleteDialog, setDeleteDialog] = useState(false);
    const [subjectToDelete, setSubjectToDelete] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            setLoading(true);

            const [subjectsResponse, coursesResponse] =
                await Promise.all([
                    getSubjects(),
                    getCourses()
                ]);

            setSubjects(
                Array.isArray(subjectsResponse)
                    ? subjectsResponse
                    : []
            );

            setCourses(
                Array.isArray(coursesResponse)
                    ? coursesResponse
                    : []
            );

            setError("");

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                "Failed to load subjects."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleSave = async (formData) => {

        try {

            setSaving(true);

            if (selectedSubject) {

                await updateSubject(
                    selectedSubject.id,
                    formData
                );

            } else {

                await createSubject(formData);

            }

            setModalOpen(false);
            setSelectedSubject(null);

            await loadData();

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Unable to save subject."
            );

        } finally {

            setSaving(false);

        }

    };

    const handleDelete = async () => {

        try {

            await deleteSubject(subjectToDelete.id);

            setDeleteDialog(false);
            setSubjectToDelete(null);

            await loadData();

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Unable to delete subject."
            );

        }

    };

    const handleToggleStatus = async (subject) => {

        try {

            if (subject.enabled) {

                await disableSubject(subject.id);

            } else {

                await enableSubject(subject.id);

            }

            await loadData();

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Unable to update status."
            );

        }

    };

    const filteredSubjects = useMemo(() => {

        return subjects.filter((subject) => {

            const text =
                `${subject.subjectCode}
                 ${subject.subjectName}
                 ${subject.courseName}
                 ${subject.description}`
                    .toLowerCase();

            return text.includes(
                searchTerm.toLowerCase()
            );

        });

    }, [subjects, searchTerm]);

    if (loading) {

        return (
            <LoadingSpinner text="Loading Subjects..." />
        );

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

                    Subject Management

                </h1>

                <button

                    onClick={() => {

                        setSelectedSubject(null);

                        setModalOpen(true);

                    }}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"

                >

                    Add Subject

                </button>

            </div>

            <SearchBar

                placeholder="Search subjects..."

                value={searchTerm}

                onChange={(e) =>
                    setSearchTerm(e.target.value)
                }

            />

            {

                filteredSubjects.length === 0 ?

                    <EmptyState

                        title="No Subjects Found"

                        message="There are no subjects available."

                    />

                    :

                    <SubjectTable

                        subjects={filteredSubjects}

                        onEdit={(subject) => {

                            setSelectedSubject(subject);

                            setModalOpen(true);

                        }}

                        onDelete={(subject) => {

                            setSubjectToDelete(subject);

                            setDeleteDialog(true);

                        }}

                        onToggleStatus={
                            handleToggleStatus
                        }

                    />

            }

            <SubjectModal

                open={modalOpen}

                subject={selectedSubject}

                courses={courses}

                loading={saving}

                onSubmit={handleSave}

                onClose={() => {

                    setModalOpen(false);

                    setSelectedSubject(null);

                }}

            />

            <DeleteConfirmDialog

                open={deleteDialog}

                onOpenChange={setDeleteDialog}

                onConfirm={handleDelete}

                title="Delete Subject"

                description={`Delete ${subjectToDelete?.subjectName || ""}?`}

            />

        </div>

    );

}