import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';
import MyContext from '../../context/data/MyContext';
import Loader from '../../components/loader/Loader';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { toast } from "react-toastify";

function Login() {
    const context = useContext(MyContext);
    const { loading, setLoading } = context;

    const emailRef = useRef();
    const passRef = useRef();

    useEffect(() => {
        emailRef.current.value = 'user1@email.com';
        passRef.current.value = '123456';
    }, [])

    const navigate = useNavigate(); // For navigating after login

    const clearFormValues = () => {
        emailRef.current.value = '';
        passRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            // Retrieve email and password values from the form
            const email = emailRef.current.value;
            const password = passRef.current.value;

            // Authenticate the user with Firebase
            const user = await signInWithEmailAndPassword(auth, email, password);

            // Show success toast message
            toast.success("Login Successful");

            //set user in local storage
            localStorage.setItem('user', JSON.stringify(user))

            // Clear the form and navigate to a new page (e.g., dashboard)
            clearFormValues();
            setLoading(false);
            navigate('/');
        } catch (error) {
            // Handle login errors
            toast.error("Login failed: " + error.message);
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <form className='bg-gray-700 px-10 py-10 rounded-xl' onSubmit={handleSubmit}>
                <div>
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        ref={emailRef}
                        className='bg-gray-500 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        ref={passRef}
                        className='bg-gray-500 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                        required
                        minLength={6}
                    />
                </div>
                <div className='flex justify-center mb-3'>
                    <button
                        type="submit"
                        className='bg-pink-600 hover:bg-pink-700 w-full text-white font-bold px-2 py-2 rounded-lg'>
                        Login
                    </button>
                </div >
                <div className='max-w-[220px] md:max-w-[320px] text-white'>
                    Use user1 as dummy account or create your own. For admin credentials please refer to <a className='font-bold' href="https://github.com/Jitesh7891/e-commerce">
                        README file.
                    </a>
                </div>

                <div>
                    <h2 className='text-white'>
                        Don't have an account? <Link className='text-pink-500 font-bold' to={'/signup'}>Signup</Link>
                    </h2>
                </div>
            </form>
        </div>
    );
}

export default Login;
