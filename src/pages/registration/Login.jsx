import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';
import MyContext from '../../context/data/MyContext';
import Loader from '../../components/loader/Loader';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth, fireDB } from '../../firebase/firebaseConfig';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';

function Login() {
  const { loading, setLoading } = useContext(MyContext);
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.value = 'user1@email.com';
    passRef.current.value = '123456';
  }, []);

  const clearFormValues = () => {
    emailRef.current.value = '';
    passRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const email = emailRef.current.value;
      const password = passRef.current.value;

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const plainUser = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      };

      localStorage.setItem('user', JSON.stringify({ user: plainUser }));
      toast.success("Login Successful");
      clearFormValues();
      navigate('/');
    } catch (error) {
      toast.error("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { uid, email, displayName } = result.user;
      const plainUser = {
        uid,
        email,
        name: displayName || '',
      };

      // 1️⃣ Store in localStorage
      localStorage.setItem('user', JSON.stringify({ user: plainUser }));

      // 2️⃣ Ensure Firestore profile exists
      const userDocRef = doc(fireDB, 'users', uid);
      const userSnap = await getDoc(userDocRef);
      if (!userSnap.exists()) {
        await setDoc(userDocRef, {
          uid,
          email,
          name: plainUser.name,
          time: Timestamp.now(),
        });
      }

      toast.success("Google Sign-In Successful");
      navigate('/');
    } catch (error) {
      toast.error("Google Sign-In failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      {loading && <Loader />}
      <form className='bg-gray-700 px-10 py-10 rounded-xl' onSubmit={handleSubmit}>
        <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
        <input
          type="email"
          ref={emailRef}
          className='bg-gray-500 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
          placeholder='Email'
          required
        />
        <input
          type="password"
          ref={passRef}
          className='bg-gray-500 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
          placeholder='Password'
          required
          minLength={6}
        />
        <button
          type="submit"
          className='bg-pink-600 hover:bg-pink-700 w-full text-white font-bold px-2 py-2 rounded-lg mb-3'
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className='bg-blue-500 hover:bg-blue-600 w-full text-white font-bold px-2 py-2 rounded-lg mb-4'
        >
          Sign in with Google
        </button>
        <p className='text-white max-w-[220px] mb-4'>
          Use user1 as dummy account or create your own. For admin credentials see the&nbsp;
          <a className='font-bold' href="https://github.com/Jitesh7891/e-commerce">README</a>.
        </p>
        <p className='text-white'>
          Don't have an account?&nbsp;
          <Link className='text-pink-500 font-bold' to='/signup'>Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
