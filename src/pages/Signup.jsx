import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../Firebase/Firebaseconfig";

function Signup() {
    const [displayName, setdisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [img, setImg] = useState(null)
    const navigate = useNavigate();
    const auth = getAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update user display name
            await updateProfile(user, { displayName: displayName });

            // Upload image to Firebase Storage
            if (img) {
                const imgRef = ref(storage, `${email}/${email}`);
                await uploadBytes(imgRef, img);
                const url = await getDownloadURL(imgRef);

                // Update user profile with image URL
                await updateProfile(user, { photoURL: url });
            }

            // Navigate to another page
            navigate('/signin');
        } catch (error) {
            console.error(error.code, error.message);
        }
    };


    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="fullname"
                            placeholder="Full Name"
                            value={displayName}
                            onChange={(e) => setdisplayName(e.target.value)}
                        />

                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="file"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            onChange={(e) => setImg(e.target.files[0])}
                        />

                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-emerald-400 text-white hover:bg-green-dark focus:outline-none my-1"
                        >
                            Create Account
                        </button>
                    </form>
                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account?
                    <a className="no-underline border-b border-blue text-blue" href="../login/">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
    );
}

export default Signup;
