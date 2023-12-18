import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure,signInStart,signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error} =useSelector((state)=>state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch();

  //store the form data in state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData)
  };

  //send the requet to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await fetch("http://localhost:3000/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: 'include',
    });
    const data = await res.json();
    console.log(data);
    if(data.success === false){
      dispatch(signInFailure(data.message))
      return;
    }
    dispatch(signInSuccess(data))
    navigate('/')
    console.log(data);
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
    
  };
  return (
    <>
    <div className="flex flex-col p-3 max-w-lg mx-auto h-full">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form
        className="flex flex-col gap-4"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="email..."
          className="border p-3 rounded-lg"
          autoComplete="off"
          id="email"
          onChange={handleChange}
          required={true}
        />
        <input
          type="password"
          placeholder="Password..."
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
          required={true}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80" disabled={loading}>
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
        <OAuth/>
      <div className="flex gap-2 mt-5">
        <p>
          Don&apos;t Have an Account ?
          <Link to={"/sign-up"}>
            <span className="text-blue-400 opacity-80 hover:opacity-100">
              {` `}Sign-up
            </span>
          </Link>
        </p>
      </div>
      {error && <p className="text-red-600">{error}</p>}
    </div>
    </>
  );
}

export default SignIn;
