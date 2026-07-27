import { Download } from "lucide-react";
import { toast } from "sonner";

import pdfService from "../../services/pdfService";

export default function DownloadPdfButton({

    attemptId

}) {

    async function download() {

        try {

            const response =

                await pdfService.downloadResultPdf(

                    attemptId

                );

            const url = window.URL.createObjectURL(

                new Blob([response.data])

            );

            const link = document.createElement("a");

            link.href = url;

            link.download = `Result-${attemptId}.pdf`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            toast.success(

                "PDF downloaded successfully."

            );

        }

        catch (error) {

            console.error(error);

            toast.error(

                "Unable to download PDF."

            );

        }

    }

    return (

        <button

            onClick={download}

            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg"

        >

            <Download size={18}/>

            Download PDF

        </button>

    );

}