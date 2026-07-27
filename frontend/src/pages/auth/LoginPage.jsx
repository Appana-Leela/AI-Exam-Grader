import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

import authService from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function LoginPage() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const {

        register,

        handleSubmit,

        formState: { errors }

    } = useForm();

    const onSubmit = async (data) => {

        try {

            setLoading(true);

            setError("");

            const response = await authService.login(data);
            console.log("LOGIN RESPONSE:", response.data);
            login(response);

            const user = response.data.data;

            localStorage.setItem(

                "firstName",

                user.firstName

            );

            localStorage.setItem(

                "lastName",

                user.lastName

            );

            localStorage.setItem(

                "email",

                user.email

            );

            localStorage.setItem(

                "role",

                user.role

            );

            if (user.role === "ADMIN") {

                navigate("/admin/dashboard");

            }
            else if (user.role === "TEACHER") {

                navigate("/teacher/dashboard");

            }
            else {

                navigate("/student/dashboard");

            }

        }

        catch (err) {

            console.error(err);

            setError(

                err.response?.data?.message ||

                "Login failed."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 transition-colors duration-300">

            <div className="w-[420px] bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-10">

                <h1 className="text-3xl font-bold text-blue-600">

                    AI Exam Grader

                </h1>

                <p className="text-gray-500 dark:text-gray-400 mb-8">

                    Login to continue

                </p>

                {

                    error &&

                    <div className="bg-red-100 text-red-700 rounded-lg p-3 mb-5">

                        {error}

                    </div>

                }

                <form onSubmit={handleSubmit(onSubmit)}>

                    <input

                        type="email"

                        placeholder="Email"

                        className="w-full border rounded-xl px-4 py-3 mb-2 dark:bg-slate-800"

                        {...register("email", {

                            required: "Email is required"

                        })}

                    />

                    {

                        errors.email &&

                        <p className="text-red-500 text-sm mb-3">

                            {errors.email.message}

                        </p>

                    }

                    <input

                        type="password"

                        placeholder="Password"

                        className="w-full border rounded-xl px-4 py-3 mb-2 dark:bg-slate-800"

                        {...register("password", {

                            required: "Password is required"

                        })}

                    />

                    {

                        errors.password &&

                        <p className="text-red-500 text-sm mb-4">

                            {errors.password.message}

                        </p>

                    }

                    <button

                        disabled={loading}

                        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl"

                    >

                        {

                            loading

                                ?

                                "Logging in..."

                                :

                                "Login"

                        }

                    </button>

                </form>

                <div className="mt-6 text-center">

                    <Link

                        to="/forgot-password"

                        className="text-blue-600 hover:underline"

                    >

                        Forgot Password?

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default LoginPage;