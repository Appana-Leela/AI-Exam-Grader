const statusColors = {
    DRAFT: "bg-yellow-100 text-yellow-800",
    SCHEDULED: "bg-blue-100 text-blue-800",
    PUBLISHED: "bg-green-100 text-green-800",
    COMPLETED: "bg-gray-200 text-gray-800"
};

export default function ExamStatusBadge({ status }) {

    return (
        <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusColors[status] || "bg-gray-100 text-gray-700"
            }`}
        >
            {status}
        </span>
    );
}