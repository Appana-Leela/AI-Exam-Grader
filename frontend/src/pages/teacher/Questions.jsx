import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import DashboardLayout from "../../layouts/DashboardLayout";

import questionService from "../../services/questionService";

import QuestionTable from "../../components/questions/QuestionTable";
import CreateQuestionModal from "../../components/questions/CreateQuestionModal";
import EditQuestionModal from "../../components/questions/EditQuestionModal";

import DeleteConfirmDialog from "../../components/common/DeleteConfirmDialog";
import BackButton from "../../components/common/BackButton";
import Breadcrumb from "../../components/common/Breadcrumb";

export default function Questions() {

    const { examId } = useParams();

    const [questions, setQuestions] = useState([]);

    const [showCreateModal, setShowCreateModal] = useState(false);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const [questionToDelete, setQuestionToDelete] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);

    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadQuestions();

    }, []);

    async function loadQuestions() {

        try {

            const response =
                await questionService.getQuestionsByExam(examId);

            setQuestions(response.data.data);

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to load questions.");

        }

        finally {

            setLoading(false);

        }

    }

    function handleDelete(id) {

        setQuestionToDelete(id);

        setShowDeleteDialog(true);

    }

    async function confirmDelete() {

        try {

            await questionService.deleteQuestion(questionToDelete);

            toast.success("Question deleted successfully.");

            loadQuestions();

        }

        catch (error) {

            console.error(error);

            toast.error(

                error?.response?.data?.message ||

                "Unable to delete question."

            );

        }

        finally {

            setShowDeleteDialog(false);

            setQuestionToDelete(null);

        }

    }

    function handleEdit(question) {

        setSelectedQuestion(question);

        setShowEditModal(true);

    }

    if (loading) {

        return (

            <DashboardLayout>

                <div className="flex justify-center items-center h-[500px]">

                    Loading Questions...

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="space-y-6">

                <BackButton />

                <Breadcrumb

                    items={[

                        "Dashboard",

                        "Exams",

                        "Questions"

                    ]}

                />

                <div className="bg-white rounded-2xl shadow p-6">

                    <div className="flex justify-between items-center">

                        <div>

                            <h1 className="text-3xl font-bold">

                                Question Management

                            </h1>

                            <p className="text-gray-500 mt-2">

                                Create, edit and manage examination questions.

                            </p>

                        </div>

                        <button

                            onClick={() =>

                                setShowCreateModal(true)

                            }

                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"

                        >

                            + Add Question

                        </button>

                    </div>

                </div>

                <QuestionTable

                    questions={questions}

                    onEdit={handleEdit}

                    onDelete={handleDelete}

                />

                <CreateQuestionModal

                    open={showCreateModal}

                    examId={examId}

                    onClose={() =>

                        setShowCreateModal(false)

                    }

                    onSuccess={loadQuestions}

                />

                <EditQuestionModal

                    open={showEditModal}

                    question={selectedQuestion}

                    onClose={() =>

                        setShowEditModal(false)

                    }

                    onSuccess={loadQuestions}

                />

                <DeleteConfirmDialog

                    open={showDeleteDialog}

                    onOpenChange={setShowDeleteDialog}

                    onConfirm={confirmDelete}

                    title="Delete Question"

                    description="Are you sure you want to delete this question? This action cannot be undone."

                />

            </div>

        </DashboardLayout>

    );

}