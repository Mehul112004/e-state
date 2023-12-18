import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileProgress, setFileProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
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
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-5xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar||currentUser.rest.avatar}
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
        ) : null}
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
          autoComplete="off"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          autoComplete="off"
        />
        <button className="bg-slate-700 text-white hover:bg-slate-400 rounded-lg p-3 uppercase">
          Update
        </button>
      </form>

      <div className=" flex justify-between mt-5">
        <span className="text-red-900 cursor-pointer font-semibold">
          Delete Account
        </span>
        <span className="text-red-900 cursor-pointer font-semibold">
          Sign Out
        </span>
      </div>
    </div>
  );
}

export default Profile;
