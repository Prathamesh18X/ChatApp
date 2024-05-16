import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import toast from 'react-hot-toast';

const Account = () => {
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuth();
    const [input, setInput] = useState("");

    const handleDeleteAccount = async () => {
        if (input !== "Delete My Account") {
            toast.error('Please type "Delete My Account" to proceed.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`/api/auth/deleteAccount/${authUser._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ input }),
            });

            if (response.ok) {
              localStorage.removeItem("authChatUser");
                window.location.reload();
                setAuthUser(null)
                toast.success('Account deleted successfully');
                
            } else {
                const error = await response.json();
                toast.error(error.message || 'Failed to delete account');
            }

        } catch (error) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <span className='mt-4 font-bold text-lg'>Delete Account</span>
            <p className='text-sm my-2'>Type "Delete My Account" to delete your account.</p>
            <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                className="input input-sm bg-slate-200 input-bordered mb-4"
                placeholder="Type here"
            />

            <p className='text-sm my-2'>Once you delete your account, there is no going back. Please be certain.</p>

            {loading ? (
                <span className='loading loading-spinner'></span>
            ) : (
                <button
                className="btn btn-sm btn-error border-none mt-3"
                onClick={handleDeleteAccount}
                disabled={loading} // Disable the button while loading
                >
                    Delete Account
                </button>
            )}
            <p className='text-[12px] text-red '>messages can not be recovered.</p>
        </div>
    );
};

export default Account;
