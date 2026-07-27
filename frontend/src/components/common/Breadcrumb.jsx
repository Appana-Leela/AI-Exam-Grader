import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items }) {

    return (

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">

            {

                items.map((item, index) => (

                    <div
                        key={index}
                        className="flex items-center gap-2"
                    >

                        <span
                            className={
                                index === items.length - 1
                                    ? "font-semibold text-black"
                                    : ""
                            }
                        >
                            {item}
                        </span>

                        {

                            index !== items.length - 1 &&

                            <ChevronRight size={16}/>

                        }

                    </div>

                ))

            }

        </div>

    );

}