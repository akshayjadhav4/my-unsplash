import React, { useState } from "react";
import { useAuth } from "../../utils/auth";
import Link from "next/link";
import { createPhoto } from "../../utils/db";

const AddPhotoModal = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const [label, setLabel] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const addPhoto = (e) => {
    e.preventDefault();
    if (label && photoURL) {
      const photo = {
        label,
        photoURL,
        author: user.uid,
      };
      createPhoto(photo).then(({ id }) => {
        setLabel("");
        setPhotoURL("");
        setShowModal(false);
      });
    }
  };

  return (
    <>
      <button
        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={() => setShowModal(true)}
      >
        {" "}
        Add a Photo
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5  border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">Add a new photo</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {user?.uid ? (
                    <form>
                      <label htmlFor="Label">Label</label>
                      <div className="mb-3 pt-0">
                        <input
                          type="text"
                          name="label"
                          value={label}
                          required
                          onChange={(e) => setLabel(e.target.value)}
                          placeholder="Mountain"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white rounded-lg text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full sm:w-80"
                        />
                      </div>
                      <label htmlFor="Label">Photo URL</label>
                      <div className="mb-3 pt-0">
                        <input
                          type="text"
                          name="photoURL"
                          value={photoURL}
                          required
                          onChange={(e) => setPhotoURL(e.target.value)}
                          placeholder="https://photourl.io/..."
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white rounded-lg text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full sm:w-80"
                        />
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6  border-solid border-gray-300 rounded-b">
                        <button
                          className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={() => setShowModal(false)}
                        >
                          Cancle
                        </button>
                        <button
                          className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                          onClick={addPhoto}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <Link href="/authentication">
                        <a className="py-2 px-2 text-green-500">
                          Login to add a post
                        </a>
                      </Link>{" "}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default AddPhotoModal;
