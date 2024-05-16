import React from 'react';

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  // Sample image URLs
  const maleImageUrl = 'https://i.postimg.cc/fyf2vkZ7/Male.png'; // Replace with your male image URL
  const femaleImageUrl = 'https://i.postimg.cc/4xf6cBmS/Female.png'; // Replace with your female image URL

  return (
    <div className='flex gap-4 justify-center items-center'>
      <div
        className={`relative form-control rounded-lg cursor-pointer w-24 h-24 bg-cover bg-center transition-all duration-200 ease-in-out ${
          selectedGender === 'male' ? 'bg-gray-300 bg-opacity-50' : ''
        }`}
        style={{ backgroundImage: `url(${maleImageUrl})`, borderRadius: '50%' }}
        onClick={() => onCheckboxChange('male')}
      >
        {selectedGender === 'male' && (
          <div className='absolute inset-0 bg-gray-900 bg-opacity-25 rounded-full' />
        )}
      </div>
      <div
        className={`relative form-control rounded-lg cursor-pointer w-24 h-24 bg-cover bg-center transition-all duration-200 ease-in-out ${
          selectedGender === 'female' ? 'bg-gray-300 bg-opacity-50' : ''
        }`}
        style={{ backgroundImage: `url(${femaleImageUrl})`, borderRadius: '50%' }}
        onClick={() => onCheckboxChange('female')}
      >
        {selectedGender === 'female' && (
          <div className='absolute inset-0 bg-gray-900 bg-opacity-25 rounded-full' />
        )}
      </div>
    </div>
  );
};

export default GenderCheckbox;
