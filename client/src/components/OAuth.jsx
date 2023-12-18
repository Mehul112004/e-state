import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

function OAuth() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogleClick = async () => {
    try {
      console.log("inside handlegoogleclick");
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
        credentials: "include",
      });
      const data = await res.json();
      dispatch(signInSuccess(data))
      navigate("/")
    } catch (error) {
      console.log("Couldn't sign in with google", error);
    }
  };
  return (
    <button
      className="bg-red-600 text-white rounded-lg uppercase hover:opacity-70 h-10 mt-4"
      onClick={handleGoogleClick}
    >
      Continue with Google
    </button>
  );
}

export default OAuth;
