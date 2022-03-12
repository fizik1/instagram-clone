import React, { useState, useEffect } from 'react';
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    setDoc,
} from "@firebase/firestore";
import { db } from "../../firebase";
// import 'boxicons'
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai"
import { MdOutlineModeComment } from "react-icons/md"
import { FiSend } from "react-icons/fi"
import Moment from "react-moment";
import { useSession } from "next-auth/react";

const Post = ({ id, post}) => {
    const { data: session } = useSession();
    // const [isOpen, setIsOpen] = useRecoilState(modalState);
    // const [postId, setPostId] = useRecoilState(postIdState);
    // const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState(false);
    // const router = useRouter();
    // useEffect(
    //     () =>
    //         onSnapshot(
    //             query(
    //                 collection(db, "posts", id, "comments"),
    //                 orderBy("timestamp", "desc")
    //             ),
    //             (snapshot) => setComments(snapshot.docs)
    //         ),
    //     [db, id]
    // );

    useEffect(
        () =>
            onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
                setLikes(snapshot.docs)
            ),
        [db, id]
    );

    useEffect(
        () =>
            setLiked(
                likes.findIndex((like) => like.id === session?.user?.uid) !== -1
            ),
        [likes]
    );

    const likePost = async () => {
        if (liked) {
            await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
        } else {
            await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
                username: session.user.name,
            });
        }
    };

    return (
        <div className='container bg-white flex-col mt-10 w-[600px]'>
            <div className='h-[60px] flex items-center'>
                <div className='flex items-center'>
                    <img
                        src={post?.userImg}
                        className='w-10 rounded-full mx-5'
                    />
                    <div>
                    <p className='font-semibold'>{post?.username}</p>
                    <p className='text-xs hover' >@{post?.tag}</p>
                    </div>
                </div>
                {/* <box-icon name='dots-horizontal-rounded'></box-icon> */}

            </div>
            <div onDoubleClick={()=>setDoc(doc(db, "posts", id, "likes", session.user.uid), {
                username: session.user.name,
            })}>
                <img src={post?.image} />
            </div>
            
                
            
            <div className=' flex px-5 py-3  '>
                {!liked&&<AiOutlineHeart style={{fontSize:'30px',marginRight:"10px"}} onClick={(e) => {
                            e.stopPropagation();
                            likePost();
                        }}/>}
                {liked&&<AiFillHeart style={{fontSize:'30px',marginRight:"10px"}} onClick={(e) => {
                            e.stopPropagation();
                            likePost();
                        }}/>}
                <MdOutlineModeComment style={{fontSize:'30px',marginRight:"10px"}}/>
                <FiSend style={{fontSize:'30px',marginRight:"10px"}}/>


            </div>
            <div className='px-5 flex'><a className='font-bold mr-2'>{post?.tag}</a>{post.text}</div>
            <div className='px-5'>{likes.length} likes</div>
            <Moment className='px-5 text-xs pb-5' fromNow>{post?.timestamp?.toDate()}</Moment>
        </div>
    );
}

export default Post;
