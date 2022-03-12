import React from 'react';
import { TiHome } from 'react-icons/ti'
import { BsChatDots } from 'react-icons/bs'
import { FiPlusSquare } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
import { useRouter } from 'next/router';


const Footer = () => {
    const router =useRouter()
    return (
        <div className='flex bg-white px-[15%] justify-between items-center h-[70px]'>
            <div className='w-[120px] flex items-center'><img src='https://clipart.info/images/ccovers/1522452762Instagram-logo-png-text.png'/></div>
            <div>
                <input type='search' className='bg-slate-200 outline-none py-2 px-5 rounded-md' placeholder='Search'/>
            </div>
            <div className='flex items-center'>
                <TiHome style={{fontSize:"30px",marginLeft:'30px'}}/>
                <BsChatDots style={{fontSize:"30px",marginLeft:'30px'}}/>
                <FiPlusSquare style={{fontSize:"30px",marginLeft:'30px'}} onClick={()=>
                    router.push('/input')
                }/>
                <AiOutlineHeart style={{fontSize:"30px",marginLeft:'30px'}}/>
                <img src='./images/profil.jpg' className='w-10 rounded-full ml-[30px]'/>
            </div>
        </div>
    );
}

export default Footer;
