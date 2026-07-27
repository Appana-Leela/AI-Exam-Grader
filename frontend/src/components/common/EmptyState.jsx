import { Inbox } from "lucide-react";

export default function EmptyState({

    title,

    message

}) {

    return (

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-12 text-center">

            <Inbox

                size={70}

                className="mx-auto text-gray-400"

            />

            <h2 className="text-2xl font-bold mt-5">

                {title}

            </h2>

            <p className="text-gray-500 mt-3">

                {message}

            </p>

        </div>

    );

}