import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "../components/OAuth";
function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await fetch("http://localhost:3000/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success === false){
      setError(data.message)
      setLoading(false)
      return;
    }
    setLoading(false)
    setError(null)
    navigate('/sign-in')
    console.log(data);
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
    
  };
  return (
    <div className="flex flex-col p-3 max-w-lg mx-auto h-full">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form
        className="flex flex-col gap-4"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Username..."
          className="border p-3 rounded-lg"
          autoComplete="off"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email..."
          className="border p-3 rounded-lg"
          autoComplete="off"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password..."
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80" disabled={loading}>
          {loading ? "Loading..." : "Sign Up"}
        </button>

      </form>
        <OAuth/>
      <div className="flex gap-2 mt-5">
        <p>
          Have an Account ?
          <Link to={"/sign-in"}>
            <span className="text-blue-400 opacity-80 hover:opacity-100">
              {` `}Sign-in
            </span>
          </Link>
        </p>
      </div>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}

export default SignUp;
