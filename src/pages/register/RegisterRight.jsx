import React, {useEffect, useState} from 'react'
import supabase from '../../Supabase'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../../context/AuthProvider';

export default function RegisterRight() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {user} = useAuth();

    useEffect(() => {
        console.log(user);
        if (user != null) {
            navigate('/');
        }
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        if (e.target.password.value != e.target.confirmPassword.value) {
            alert('Password tidak cocok!');
        } else {
            try {
                const {data, error} = await supabase.auth.signUp({
                    email: e.target.email.value, 
                    password: e.target.password.value,
                    options: {
                        data: {
                            username: e.target.username.value,
                            group_id: e.target.groupId.value
                        }
                    }
                }).then(async(res) => {
                    if (res.error) {
                        console.log(res.error.message);
                    } else {
                        await supabase.from('profiles').insert([{
                            user_id: res.data.user.id,
                            username: e.target.username.value,
                            user_group: e.target.groupId.value
                        },])
                        alert('Pendaftaran akun berhasil! Silahkan cek email untuk konfirmasi.')
                        navigate('/login');
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="flex justify-center items-center min-h-full my-auto mb-4">
            <div className="min-w-full mx-auto">
                <div className="bg-white shadow-md border border-gray-200 rounded-lg md:mx-12 p-4 sm:p-4 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6"
                        onSubmit={handleSubmit}>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Daftar ke IdeaRail</h3>
                        <div>
                            <label htmlFor="username" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Nama</label>
                            <input type="text" name="username" id="username" placeholder="Masukan Nama Kamu" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required={true}/>
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com"
                                required={true}/>
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required={true}/>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Konfirmasi password</label>
                            <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required={true}/>
                        </div>
                        <div>
                            <label htmlFor="groupId" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Nomor Kelompok</label>
                            <input type="number" name="groupId" id="groupId" placeholder="Masukan Nomor Sesuai Kelompok" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required={true}/>
                        </div>
                        <button type="submit"
                            className={
                                `w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                                    loading ? 'bg-blue-200 hover-blue-200' : 'bg-blue-700 hover:bg-blue-800 '
                                }`
                        }>
                            {
                            loading ? <div role="status" className='flex justify-center my-auto'>
                                <p className='my-auto'>
                                    Loading...
                                </p>
                                <svg aria-hidden="true" class=" w-8 h-8 mx-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                            </div> : "Register"
                        } </button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Sudah punya akun?
                            <Link to="/login" className="text-blue-700 hover:underline dark:text-blue-500"> Masuk disini.</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
