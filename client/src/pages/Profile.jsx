import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { updateUserStart,updateUserSuccess,updateUserFailure, deleteUserStart, deleteUserFailure, deleteUserSuccess, signOutStart, signOutFailure, signOutSuccess } from "../redux/user/userSlice";
import {Link} from 'react-router-dom'

function Profile() {
  const fileRef = useRef(null);
  const { currentUser,loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [file, setFile] = useState(undefined);
  const [fileProgress, setFileProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [editable, setEditable] = useState(false)

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileProgress(Math.round(progress));
      },
      () => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange=(e)=>{
      setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    dispatch(updateUserStart())
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/user/update/${currentUser.rest._id}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      })
      const data = await res.json();
      console.log(data);
      if(data.success===false){
        dispatch(updateUserFailure(data.message))
        return;
      }
      dispatch(updateUserSuccess(data))
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser =async (e)=>{
    e.preventDefault
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`http://localhost:3000/api/user/delete/${currentUser.rest._id}`,{
        method:"DELETE",
      })
      const data = await res.json();
      console.log(data);
      if(data.success===false){
        dispatch(deleteUserFailure(data.message))
        return;
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      dispatch(signOutStart())
      const res = await fetch('http://localhost:3000/api/auth/sign-out');
      const data = await res.json();
      if(data.success===false){
        dispatch(signOutFailure(data.message))
        return;
      }
      dispatch(signOutSuccess(data))
    } catch (error) {
      dispatch(signOutFailure(error))
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-5xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData?.avatar||currentUser.rest.avatar}
          alt="Profile picture"
          className=" rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-4"
          onClick={() => fileRef.current.click()}
        />
        {fileUploadError ? (
          <span className="mx-auto text-sm text-red-600">
            Error in Image Upload
          </span>
        ) : fileProgress > 0 && fileProgress < 100 ? (
          <span className="text-sm text-slate-700 mx-auto">
            Uploading Image {fileProgress}%
          </span>
        ) : fileProgress === 100 &&!fileUploadError ? (
          <span className="text-sm text-green-600 mx-auto">
            Image Uploaded Successfully
          </span>
        ) : ''}

        <button 
        className="self-end text-lg text-blue-600 bg-white px-2 py-1 rounded-lg hover:text-blue-300 focus:scale-95"
        onClick={(e)=>{
          e.preventDefault()
          setEditable(prev=>!prev)
        }}
        >
          {editable?'Done':'Edit'}
        </button>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.rest.username}
          disabled={!editable}
          autoComplete="off"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.rest.email}
          disabled={!editable}
          autoComplete="off"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          disabled={!editable}
          autoComplete="off"
          onChange={handleChange}
        />
        <button 
        disabled={loading}
        className="bg-slate-700 text-white hover:bg-slate-600 rounded-lg p-3 uppercase"
        >
          {loading?'Updating...':'Update'}
        </button>

        <Link
        className="bg-green-500 rounded-lg p-3 font-semibold text-lg text-white hover:bg-green-400 text-center"
        to='/create-listing'
        >
          Create Listing
        </Link>
      </form>

      <div className=" flex justify-between mt-5">
        <span
        className="text-red-900 cursor-pointer font-semibold"
        onClick={handleDeleteUser}
        >
          Delete Account
        </span>
        <span
         className="text-red-900 cursor-pointer font-semibold"
         onClick={handleSignOut}
        >
          Sign Out
        </span>
      </div>
    </div>
  );
}

export default Profile;
