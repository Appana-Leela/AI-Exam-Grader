export default function LoadingSpinner({

    text = "Loading..."

}) {

    return (

        <div className="flex justify-center items-center h-[450px]">

            <div className="text-center">

                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>

                <p className="mt-4 text-lg">

                    {text}

                </p>

            </div>

        </div>

    );

}