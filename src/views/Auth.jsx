import {React, useState} from 'react'
import Login from '../components/cards/auths/Login';
import SignUp from '../components/cards/auths/SignUp';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
return (
    <div className="min-h-screen flex flex-col items-center mt-20">
    <div className="w-96 max-w-md">
      {isLogin ? <Login /> : <SignUp />}

        <button
            className="mt-4 text-blue-500"
            onClick={() => setIsLogin(!isLogin)}
        >
            {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </button>
        </div>
    </div>
  )
}

export default Auth;