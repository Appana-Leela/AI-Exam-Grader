import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";

export default function ExamTimer({

    durationInMinutes,
    onTimeUp

}) {

    const [timeLeft, setTimeLeft] = useState(
        durationInMinutes * 60
    );

    useEffect(() => {

        if (timeLeft <= 0) {

            onTimeUp();

            return;

        }

        const timer = setInterval(() => {

            setTimeLeft((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [timeLeft, onTimeUp]);

    const hours = Math.floor(timeLeft / 3600);

    const minutes = Math.floor(
        (timeLeft % 3600) / 60
    );

    const seconds = timeLeft % 60;

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
        minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    return (

        <div className="flex items-center gap-3">

            <Clock3 className="text-red-600" />

            <span
                className={`text-2xl font-bold ${
                    timeLeft <= 300
                        ? "text-red-600 animate-pulse"
                        : "text-green-600"
                }`}
            >

                {formattedTime}

            </span>

        </div>

    );

}