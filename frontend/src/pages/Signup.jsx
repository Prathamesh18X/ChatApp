import React from 'react'

const SignUp = () => {
  	return (
  		<div className='flex flex-col items-center justify-center min-w-full mx-auto '>
  			<div className='w-full max-w-md p-6 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-25 border-2 bg-white border-c'>
  				<h1 className='flex flex-col text-3xl font-bold text-center text-black my-5'>
          <span className="bg-gradient-to-r from-purple via-red to-yellow inline-block text-transparent bg-clip-text font-extrabold"> ChatApp</span>
  					<span>Sign Up{" "}</span>
        </h1>
  
  				<form>
  					<div className='py-1'>
  						<input type='text' placeholder='John Doe' className='bg-gray-300 w-full input input-bordered h-10' />
  					</div>
  
  					<div className='py-1'>
  						<input type='text' placeholder='johndoe' className='bg-gray-300 w-full input input-bordered h-10' />
  					</div>
  
  					<div className='py-1'>
  						<input
  							type='password'
  							placeholder='Enter Password'
  							className='bg-gray-300 w-full input input-bordered h-10'
  						/>
  					</div>
  
  					<div className='py-1'>
  						<input
  							type='password'
  							placeholder='Confirm Password'
  							className='bg-gray-300 w-full input input-bordered h-10'
  						/>
  					</div>
  
  					{/* <GenderCheckbox /> */}
  
  					<a className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' href='#'>
  						Already have an account?
  					</a>
  
  					<div>
  						<button className='btn btn-block mt-2 border border-slate-700'>Sign Up</button>
  					</div>
  				</form>
  			</div>
  		</div>
  	);
  };
  export default SignUp;