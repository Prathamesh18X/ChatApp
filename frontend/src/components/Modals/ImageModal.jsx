import React from "react";
import { IoIosClose } from "react-icons/io";

const ImageModal = (image) => {
    const modal = document.getElementById("image-modal");
  return (
    <dialog id="image-modal" className="modal">
      <div className="modal-box p-[10px] rounded-none bg-white relative w-auto">
        <button
          className="absolute rounded-full bg-white top-1 right-1 text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={() => modal.close()}
        >
          <IoIosClose className="h-7 w-7" />
        </button>
        <div>
          <img src={image.image} alt="" />
        </div>
      </div>
    </dialog>
  );
};

export default ImageModal;
