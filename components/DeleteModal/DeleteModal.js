import React, { useState } from "react";
import { useAuth } from "../../utils/auth";
import { removePhoto } from "../../utils/db";
import { mutate } from "swr";
import Link from "next/link";

const DeleteModal = ({ authorId, photoId }) => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  const deletePhoto = () => {
    removePhoto(photoId);
    mutate(
      "/api/photos",
      async (data) => {
        return {
          photos: data.photos.filter((photo) => photo.id !== photoId),
        };
      },
      false
    );
  };
  return (
    <>
      <button
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={() => setShowModal(true)}
        className="m-1 right-0 absolute top-0 opacity-0 group-hover:opacity-80 bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white py-1 px-4 border border-red-600 hover:border-transparent rounded-xl"
      >
        DELETE
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5  border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">Are you sure?</h3>
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
                  <h4 className="text-xl font-semibold">
                    Logged in as {user ? user?.email : "Guest"}
                  </h4>
                  {authorId !== user?.uid && (
                    <h4 className="text-red-500 mb-4">
                      You are not authorized to delete this photo.
                    </h4>
                  )}
                  {user?.uid ? (
                    <div className="flex items-center justify-end p-6  border-solid border-gray-300 rounded-b">
                      <button
                        className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={() => setShowModal(false)}
                      >
                        Cancle
                      </button>
                      {authorId === user?.uid && (
                        <button
                          className="bg-red-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                          onClick={deletePhoto}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      <Link href="/authentication">
                        <a className="py-2 px-2  text-green-500 bg-green-200 ">
                          Login to Delete a post
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

export default DeleteModal;
