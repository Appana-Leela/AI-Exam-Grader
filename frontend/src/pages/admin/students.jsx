import { useEffect, useMemo, useState } from "react";

import {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    enableStudent,
    disableStudent
} from "../../services/adminApi";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import StudentTable from "../../components/admin/StudentTable";
import StudentModal from "../../components/admin/StudentModal";
import SearchBar from "../../components/common/SearchBar";
import DeleteConfirmDialog from "../../components/common/DeleteConfirmDialog";
import EmptyState from "../../components/common/EmptyState";

export default function Students() {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [deleteDialog, setDeleteDialog] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {

    try {

        setLoading(true);

        const response = await getStudents();

        console.log("Students API:", response);

        let studentsData = [];

        if (Array.isArray(response)) {

            studentsData = response;

        } else if (response?.data && Array.isArray(response.data)) {

            studentsData = response.data;

        }

        setStudents(studentsData);

        setError("");

    } catch (err) {

        console.error(err);

        setError(
            err.response?.data?.message ||
            "Failed to load students."
        );

    } finally {

        setLoading(false);

    }

};

    const handleSave = async (formData) => {

        try {

            setSaving(true);

            if (selectedStudent) {

                await updateStudent(selectedStudent.id, formData);

            } else {

                await createStudent(formData);

            }

            setModalOpen(false);
            setSelectedStudent(null);

            await loadStudents();

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Unable to save student."
            );

        } finally {

            setSaving(false);

        }

    };

    const handleDelete = async () => {

        try {

            await deleteStudent(studentToDelete.id);

            setDeleteDialog(false);
            setStudentToDelete(null);

            await loadStudents();

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Unable to delete student."
            );

        }

    };

    const handleToggleStatus = async (student) => {

        try {

            if (student.enabled) {

                await disableStudent(student.id);

            } else {

                await enableStudent(student.id);

            }

            await loadStudents();

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Unable to update status."
            );

        }

    };

    const filteredStudents = useMemo(() => {

        return students.filter((student) => {

            const text = `${student.firstName} ${student.lastName} ${student.email} ${student.rollNumber}`
                .toLowerCase();

            return text.includes(searchTerm.toLowerCase());

        });

    }, [students, searchTerm]);

    if (loading) {

        return <LoadingSpinner text="Loading Students..." />;

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

                    Student Management

                </h1>

                <button

                    onClick={() => {

                        setSelectedStudent(null);
                        setModalOpen(true);

                    }}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"

                >

                    Add Student

                </button>

            </div>

            <SearchBar

                placeholder="Search students..."

                value={searchTerm}

                onChange={(e) => setSearchTerm(e.target.value)}

            />

            {

                filteredStudents.length === 0

                    ?

                    <EmptyState

                        title="No Students Found"

                        message="There are no students available."

                    />

                    :

                    <StudentTable

                        students={filteredStudents}

                        onEdit={(student) => {

                            setSelectedStudent(student);

                            setModalOpen(true);

                        }}

                        onDelete={(student) => {

                            setStudentToDelete(student);

                            setDeleteDialog(true);

                        }}

                        onToggleStatus={handleToggleStatus}

                    />

            }

            <StudentModal

                open={modalOpen}

                student={selectedStudent}

                loading={saving}

                onSubmit={handleSave}

                onClose={() => {

                    setModalOpen(false);

                    setSelectedStudent(null);

                }}

            />

            <DeleteConfirmDialog

                open={deleteDialog}

                onOpenChange={setDeleteDialog}

                onConfirm={handleDelete}

                title="Delete Student"

                description={`Delete ${studentToDelete?.firstName || ""}?`}

            />

        </div>

    );

}