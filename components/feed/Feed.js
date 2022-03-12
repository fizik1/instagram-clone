import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import Post from '../post';

const Feed = () => {
    const [ posts, setPosts ] = useState()

    useEffect(
        () =>
        onSnapshot(
            query(collection(db, 'posts'), orderBy("timestamp", 'desc')),
            (snapshot) => {
                setPosts(snapshot.docs)
            }
        )
    )

    return (
        <div className='px-[15%]'>
            {posts&&posts.map((post) => (
                <Post key={post.id} id={post.id} post={post.data()}/>
            ))}
        </div>
    );
}

export default Feed;
