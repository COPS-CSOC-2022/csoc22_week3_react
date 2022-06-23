import Link from "next/link";
import Btn from "./Btn"

export default function RegisterForm() {
  const login = () => {
    console.log("Yes");
    /***
     * @todo Complete this function.
     * @todo 1. Write code for form validation.
     * @todo 2. Fetch the auth token from backend and login the user.
     * @todo 3. Set the token in the context (See context/auth.js)
     */
  }

  return (
    // <div className='bg-grey-lighter min-h-screen flex flex-col'>
      <div className='container max-w-lg mx-auto flex flex-col px-2'>
        <div className='px-6 py-8 rounded flex flex-col text-white w-full'>
          <h1 className='mb-8 text-6xl float-left font-semibold'>Login<span style={{
            color:"rgb(0, 180, 216)"
          }}>.</span></h1>
<h4 className="mb-3 font-bold">New User? <span style={{
            color:"rgb(0, 180, 216)"
          }}><Link href="/register">Create Account</Link></span></h4>
          <input
            type='text'
            className='px-8 py-4 mb-4 rounded-lg text-md w-full'
            name='inputUsername'
            id='inputUsername'
            placeholder='Username'
          />
          <input
            type='password'
            className='px-8 py-4 rounded-lg text-md w-full'
            name='inputPassword'
            id='inputPassword'
            placeholder='Password'
          />
<div className="w-full mt-0" onClick={login}>
  <Btn data="Login" func="login" />
</div>
        </div>
      </div>
    // </div>
  )
}
