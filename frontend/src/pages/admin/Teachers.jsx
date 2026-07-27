import { useEffect, useMemo, useState } from "react";

import {
    getTeachers,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    enableTeacher,
    disableTeacher
} from "../../services/adminApi";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import TeacherTable from "../../components/admin/TeacherTable";
import TeacherModal from "../../components/admin/TeacherModal";
import SearchBar from "../../components/common/SearchBar";
import DeleteConfirmDialog from "../../components/common/DeleteConfirmDialog";
import EmptyState from "../../components/common/EmptyState";

export default function Teachers() {

    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [deleteDialog, setDeleteDialog] = useState(false);
    const [teacherToDelete, setTeacherToDelete] = useState(null);

    useEffect(() => {
        loadTeachers();
    }, []);

    const loadTeachers = async () => {

        try {

            setLoading(true);

            const data = await getTeachers();

            setTeachers(
                Array.isArray(data)
                    ? data
                    : []
            );

            setError("");

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                "Failed to load teachers."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleSave = async (formData) => {

        try {

            setSaving(true);

            if (selectedTeacher) {

                await updateTeacher(
                    selectedTeacher.id,
                    formData
                );

            } else {

                await createTeacher(formData);

            }

            setModalOpen(false);
            setSelectedTeacher(null);

            await loadTeachers();

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Unable to save teacher."
            );

        } finally {

            setSaving(false);

        }

    };

    const handleDelete = async () => {

        try {

            await deleteTeacher(teacherToDelete.id);

            setDeleteDialog(false);
            setTeacherToDelete(null);

            await loadTeachers();

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Unable to delete teacher."
            );

        }

    };

    const handleToggleStatus = async (teacher) => {

        try {

            if (teacher.enabled) {

                await disableTeacher(teacher.id);

            } else {

                await enableTeacher(teacher.id);

            }

            await loadTeachers();

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Unable to update status."
            );

        }

    };

    const filteredTeachers = useMemo(() => {

        return teachers.filter((teacher) => {

            const text =
                `${teacher.firstName} ${teacher.lastName} ${teacher.email} ${teacher.employeeId ?? ""}`
                    .toLowerCase();

            return text.includes(
                searchTerm.toLowerCase()
            );

        });

    }, [teachers, searchTerm]);

    if (loading) {

        return (
            <LoadingSpinner text="Loading Teachers..." />
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

                    Teacher Management

                </h1>

                <button

                    onClick={() => {

                        setSelectedTeacher(null);

                        setModalOpen(true);

                    }}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"

                >

                    Add Teacher

                </button>

            </div>

            <SearchBar

                placeholder="Search teachers..."

                value={searchTerm}

                onChange={(e) => setSearchTerm(e.target.value)}

            />

            {

                filteredTeachers.length === 0 ?

                    <EmptyState

                        title="No Teachers Found"

                        message="There are no teachers available."

                    />

                    :

                    <TeacherTable

                        teachers={filteredTeachers}

                        onEdit={(teacher) => {

                            setSelectedTeacher(teacher);

                            setModalOpen(true);

                        }}

                        onDelete={(teacher) => {

                            setTeacherToDelete(teacher);

                            setDeleteDialog(true);

                        }}

                        onToggleStatus={handleToggleStatus}

                    />

            }

            <TeacherModal

                open={modalOpen}

                teacher={selectedTeacher}

                loading={saving}

                onSubmit={handleSave}

                onClose={() => {

                    setModalOpen(false);

                    setSelectedTeacher(null);

                }}

            />

            <DeleteConfirmDialog

                open={deleteDialog}

                onOpenChange={setDeleteDialog}

                onConfirm={handleDelete}

                title="Delete Teacher"

                description={`Delete ${teacherToDelete?.firstName || ""}?`}

            />

        </div>

    );

}