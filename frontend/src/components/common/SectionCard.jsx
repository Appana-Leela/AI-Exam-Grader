export default function SectionCard({

    children,

    className = ""

}) {

    return (

        <div

            className={`bg-white dark:bg-slate-900 rounded-2xl shadow border dark:border-slate-700 p-6 ${className}`}

        >

            {children}

        </div>

    );

}
