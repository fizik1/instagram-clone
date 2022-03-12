import React, { useRef, useState } from 'react';
import { MdPermMedia } from 'react-icons/md'
import { BsArrowLeft } from 'react-icons/bs'
import { GrEmoji } from 'react-icons/gr'
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { db, storage } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";

const Input = () => {
    const {data:session} = useSession()
    const router = useRouter()
    const [ready, setReady] = useState()
    const [showEmojis, setShowEmojis] = useState()
    const [input, setInput] = useState("");
    const filePincerRef = useRef()
    const [selectFile, setSelectFile] = useState()

    const sendPost = async () => {
        const docRef = await addDoc(collection(db, 'posts'), {
            id:session.user.uid,
            username:session.user.name,
            userImg:session.user.image,
            tag:session.user.tag,
            text: input,
            timestamp: serverTimestamp()
        });

        const imageRef = ref(storage, `posts.${docRef.id}/image`)

        if (selectFile) {
            await uploadString(imageRef, selectFile, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(imageRef)
                await updateDoc(doc(db, 'posts', docRef.id), {
                    image: downloadURL
                })
            })
        }
        setInput("");
        setSelectFile(null);
        setShowEmojis(false);
        router.push('/')
    }
    const handler = () => {
        filePincerRef.current.click()
    }
    const addTopost = (e) => {
        const reader = new FileReader()
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent) => {
            setSelectFile(readerEvent.target.result)
        }
    }
    const addEmoji = (e) => {
        console.log(e);
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
    };
    return (
        <div style={{ width: "100vw", height: '100vh', backgroundColor: 'transparent', position: 'absolute', top: '0' }}>
            <div>
                {!ready && (
                    <div className='min-w-[400px] w-fit h-[420px] m-auto mt-[100px] bg-white flex-col items-center rounded-2xl'>
                        {!selectFile && <div className='p-3 text-center border-b-2'>Create new post</div>}
                        {selectFile && <div className='p-3 flex text-center border-b-2 justify-between'>
                            <BsArrowLeft style={{ fontSize: '30px' }} />
                            <p>Crop</p>
                            <p className='text-sky-500' onClick={() => setReady(true)}>Next</p>
                        </div>}

                        {!selectFile && (
                            <div className='flex-col items-center mt-[130px] justify-center text-center'>
                                <MdPermMedia style={{ fontSize: '70px' }} className='m-auto mb-5' />
                                <p className='m-auto mb-2 text-xl'>Drag photos and videos here</p>
                                <button className='m-auto mb-2 button bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded' onClick={handler}>Select from computer</button>
                                <input className='m-auto mb-2' type='file' ref={filePincerRef} style={{ display: 'none' }} onChange={addTopost} />
                            </div>
                        )}
                        {selectFile && (
                            <img src={selectFile} style={{ width: '400px' }} />
                        )}
                    </div>
                )}
                {ready && (
                    <div className='min-w-[400px] w-fit max-h-[420px] h-[420px] m-auto mt-[100px] bg-white flex-col items-center rounded-2xl'>
                        <div className='p-3 flex text-center border-b-2 justify-between'>
                            <BsArrowLeft style={{ fontSize: '30px' }} />
                            <p>Create new post</p>
                            <p className='text-sky-500' onClick={sendPost}>Share</p>
                        </div>
                        <div className='flex'>
                            <img src={selectFile} style={{ width: '400px' }} />
                            <div className='w-[300px] p-5 flex-col items-center'>
                                <div className='flex mb-3'>
                                    <img src='./images/profil.jpg' className='w-10 rounded-full mr-[15px]' />
                                    <p className='mt-1'>shahob3503</p>
                                </div>
                                <div>
                                    <textarea value={input} className='outline-none w-[100%] h-[100px]' onChange={(e) => setInput(e.target.value)} placeholder='Write a caption...' />
                                    <div onClick={() => setShowEmojis(!showEmojis)}><GrEmoji style={{ fontSize: '20px' }} /></div>
                                    {showEmojis && (
                                        <Picker
                                            onSelect={addEmoji}
                                            style={{
                                                position: "absolute",
                                                marginTop: "10px",
                                                marginLeft: '-20px',
                                                maxWidth: "320px",
                                                borderRadius: "20px",
                                            }}
                                            theme="light"
                                        />
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
}

export default Input;
