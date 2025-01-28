import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import gitHomePosts from '../search/search';
import { SERVER_BASE_URL } from '../../config/env.config';
import { Post } from '../../interfaces';

function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);

    const mutation = useMutation(gitHomePosts, {
        onSuccess: (data) => {
            console.log("success bo'ldi");
            setPosts((prevPosts) => [...prevPosts, ...data]);
        },
    });

    useEffect(() => {
        mutation.mutate(page);
    }, [page]);

    return (
        <div className="bg-[#FAFAFA] min-h-screen">
            <div className="max-w-[600px] mx-auto pt-5">
                <div className="bg-white border-b border-gray-300 fixed top-0 left-0 w-full z-10 shadow-sm">
                    <div className="max-w-[600px] mx-auto p-3 flex justify-between items-center">
                        <h1 className="text-black text-xl font-bold">Instagram</h1>
                    </div>
                </div>

                <div className="pt-[60px]">
                    {mutation.isLoading && <p className="text-center text-gray-500 mt-5">Loading....</p>}

                    {posts?.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white border border-gray-300 rounded-lg mb-5 shadow-sm"
                        >
                            <div className="flex items-center p-3 border-b border-gray-200">
                                <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                                    <img
                                        src={SERVER_BASE_URL + post.userAvatar}
                                        alt="User Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="ml-3 font-semibold text-sm">{post.username}</p>
                            </div>

                            <div className="w-full">
                                <img
                                    src={SERVER_BASE_URL + post.mediaUrl}
                                    alt="Post Media"
                                    className="w-full object-cover"
                                />
                            </div>

                            <div className="p-3">
                                <p className="text-sm text-gray-700">{post.description}</p>
                            </div>
                        </div>
                    ))}

                    <button
                        className="bg-[#3897F0] hover:bg-[#1877F2] text-white px-4 py-2 rounded-lg font-medium w-full text-center mb-5"

                    >
                        Load More
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;