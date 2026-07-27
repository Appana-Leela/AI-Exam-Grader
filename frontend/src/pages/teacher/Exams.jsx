import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import examService from "../../services/examService";
import CreateExamModal from "../../components/exams/CreateExamModal";
import ExamStatusBadge from "../../components/exams/ExamStatusBadge";
import ExamActions from "../../components/exams/ExamActions";
import EditExamModal from "../../components/exams/EditExamModal";
import { toast } from "sonner";
import DeleteConfirmDialog from "../../components/common/DeleteConfirmDialog";
import { useNavigate } from "react-router-dom";

export default function Exams() {

    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [examToDelete, setExamToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadExams();
    }, []);

    async function loadExams() {

        try {

            const response = await examService.getAllExams();

            console.log("Backend Response:", response.data);

            setExams(response.data.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    const handleEdit = (exam) => {

        setSelectedExam(exam);

        setShowEditModal(true);

    };

    const handlePublish = async (id) => {

    try {

        await examService.publishExam(id);

        await loadExams();

        toast.success("Exam published successfully!");

    } catch (error) {

        console.error(error);

        toast.error(
            error?.response?.data?.message ||
            "Failed to publish exam."
        );

    }

};

    const handleQuestions = (examId) => {

        navigate(`/teacher/questions/${examId}`);

    };

    const handleDelete = (id) => {
        setExamToDelete(id);
        setShowDeleteDialog(true);
    };

    const handleAttempts = (examId) => {

    navigate(`/teacher/exams/${examId}/attempts`);

};

    const confirmDelete = async () => {

        try {

            await examService.deleteExam(examToDelete);

            await loadExams();

            toast.success("Exam deleted successfully!");

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to delete exam."
            );

        } finally {

            setShowDeleteDialog(false);
            setExamToDelete(null);

        }

    };

    return (

        <DashboardLayout>

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h1 className="text-3xl font-bold">
                        Exams
                    </h1>

                    <p className="text-gray-500">
                        Manage all examinations
                    </p>

                </div>

                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                    + Create Exam
                </button>

            </div>

            {loading ? (

                <p>Loading...</p>

            ) : (

                <div className="bg-white rounded-xl shadow border overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="text-left p-4">Title</th>

                                <th className="text-left p-4">Subject</th>

                                <th className="text-left p-4">Course</th>

                                <th className="text-left p-4">Status</th>

                                <th className="text-center p-4">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {exams.length > 0 ? (

                                exams.map((exam) => (

                                    <tr
                                        key={exam.id}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        <td className="p-4">
                                            {exam.title}
                                        </td>

                                        <td className="p-4">
                                            {exam.subject}
                                        </td>

                                        <td className="p-4">
                                            {exam.courseCode}
                                        </td>

                                        <td className="p-4">
                                            <ExamStatusBadge
                                                status={exam.status}
                                            />
                                        </td>

                                        <td className="p-4 text-center">

                                            <ExamActions

                                                exam={exam}

                                                onQuestions={handleQuestions}

                                                onAttempts={handleAttempts}

                                                onEdit={handleEdit}

                                                onPublish={handlePublish}

                                                onDelete={handleDelete}

                                            />

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center p-8 text-gray-500"
                                    >
                                        No exams found.
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}

            <CreateExamModal
                open={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSuccess={loadExams}
            />

            <EditExamModal
                open={showEditModal}
                exam={selectedExam}
                onClose={() => setShowEditModal(false)}
                onSuccess={loadExams}
            />

            <DeleteConfirmDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                onConfirm={confirmDelete}
                title="Delete Exam"
                description="Are you sure you want to delete this exam? This action cannot be undone."
            />
        </DashboardLayout>

    );

}