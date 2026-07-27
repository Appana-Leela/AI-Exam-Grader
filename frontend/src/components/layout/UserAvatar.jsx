export default function UserAvatar({

    name = "User",

    size = 40

}) {

    const initials = name

        .split(" ")

        .map(word => word[0])

        .join("")

        .substring(0, 2)

        .toUpperCase();

    return (

        <div

            style={{

                width: size,

                height: size

            }}

            className="rounded-full bg-blue-600 text-white flex items-center justify-center font-bold"

        >

            {initials}

        </div>

    );

}