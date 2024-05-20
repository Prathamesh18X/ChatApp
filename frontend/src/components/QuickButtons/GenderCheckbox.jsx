import React from "react";

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  // Sample image URLs
  const maleImageUrl =
    "https://res.cloudinary.com/da1mwmvno/image/upload/v1716115249/assets/h3w4nlqongcqiuzuyilg.png";
  const femaleImageUrl =
    "https://res.cloudinary.com/da1mwmvno/image/upload/v1716115300/assets/lwdxnvhedk9szuin5eem.png";

  return (
    <div className="flex gap-4 justify-center items-center">
      <div className="flex flex-col items-center text-gray-900">
        <div
          className={`relative form-control rounded-lg cursor-pointer w-24 h-24 bg-cover bg-center transition-all duration-200 ease-in-out ${
            selectedGender === "male" ? "bg-gray-300 bg-opacity-50" : ""
          }`}
          style={{
            backgroundImage: `url(${maleImageUrl})`,
            borderRadius: "50%",
          }}
          onClick={() => onCheckboxChange("male")}
        >
          {selectedGender === "male" && (
            <div className="absolute inset-0 bg-gray-900 bg-opacity-25 rounded-full" />
          )}
        </div>
        <span className="font-bold">Male</span>
      </div>
      <div className="flex flex-col items-center text-gray-900">
      <div
        className={`relative form-control rounded-lg cursor-pointer w-24 h-24 bg-cover bg-center transition-all duration-200 ease-in-out ${
          selectedGender === "female" ? "bg-gray-300 bg-opacity-50" : ""
        }`}
        style={{
          backgroundImage: `url(${femaleImageUrl})`,
          borderRadius: "50%",
        }}
        onClick={() => onCheckboxChange("female")}
      >
        {selectedGender === "female" && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-25 rounded-full" />
        )}
      </div>
      <span className="font-bold">Female</span>
      </div>
    </div>
  );
};

export default GenderCheckbox;
