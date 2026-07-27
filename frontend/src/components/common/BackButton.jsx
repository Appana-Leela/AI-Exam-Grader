import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {

    const navigate = useNavigate();

    return (

        <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6 transition"
        >
            <ArrowLeft size={20} />
            Back
        </button>

    );

}