import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';
import LoadingSpinner from '../../components/LoadingSpinner';
// import useAxiosSecure from '../hooks/useAxiosSecure'; // If you have axios setup with token

const MakeAdmin = () => {
    const axiosSecure = useAxiosSecure(); // Or use axios if not using auth yet
    const axios = useAxios();
    // const [emailQuery, setEmailQuery] = useState("");

    // useEffect(() => {
    //     // Fetch all users (replace with your actual API endpoint)
    //     axiosSecure.get('/users')
    //         .then(res => setUsers(res.data))
    //         .catch(err => console.error(err));
    // }, [axiosSecure]);

    const {
        data: users = [],
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axios.get('/users');
            return res.data;
        }
    });

    const { mutateAsync: updateRole } = useMutation({
        mutationFn: async ({ id, role }) =>
            await axios.patch(`/users/${id}/role`, { role }),
        onSuccess: () => {
            refetch();
        },
    });

    const handleMakeAdmin = async (id, currentRole) => {
        const action = currentRole === "admin" ? "Remove admin" : "Make admin";
        const newRole = currentRole === "admin" ? "user" : "admin";

        const confirm = await Swal.fire({
            title: `${action}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        });
        if (!confirm.isConfirmed) return;

        try {
            await updateRole({ id, role: newRole });
            Swal.fire("Success", `${action} successfull`, "success");
        } catch (error) {
            console.log(error);
            Swal.fire("Error", "Failed to update user role", "error");
        }
        // try {
        //     await axiosSecure.patch(`/users/admin/${email}`);
        //     alert(`${email} is now an Admin`);
        //     setUsers(prev => prev.map(user => 
        //         user.email === email ? { ...user, role: 'admin' } : user
        //     ));
        // } catch (err) {
        //     console.error(err);
        // }
    };

    return (
        <div className="max-w-5xl mx-auto p-4 dark:text-white">
            <h1 className="text-2xl font-bold mb-4">Manage Users {users.length}</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700 text-left">
                            <th className="p-3">#</th>
                            {/* <th className="p-3">Name</th> */}
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.email} className="border-b dark:border-gray-700">
                                <td className="p-3">{index + 1}</td>
                                {/* <td className="p-3">{user.name}</td> */}
                                <td className="p-3">{user.email}</td>
                                <td className="p-3 capitalize">{user.role}</td>
                                <td className="p-3">
                                    {user.role === 'admin' ? (
                                        <button
                                            onClick={() => handleMakeAdmin(user._id, 'admin')}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                        >
                                            Remove Admin
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleMakeAdmin(user._id, 'user')}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                {isFetching && <LoadingSpinner></LoadingSpinner>}
                {/* <LoadingSpinner></LoadingSpinner> */}
            </div>
        </div>
    );
};

export default MakeAdmin;
