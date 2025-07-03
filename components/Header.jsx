import React from 'react'
import moment from 'moment'
import 'moment/locale/bg'
import { FaFacebookF } from 'react-icons/fa'
import { AiFillYoutube, AiOutlineTwitter } from 'react-icons/ai'
import bg_header from '../assets/header-bg.jpg'
import logo from '../assets/logo.png'
import adver_image from '../assets/sample-add.jpg'
import Image from 'next/image'
import Header_Category from './Header_Category'


moment.locale('bg')

const Header = () => {

    return (
        <div>
            <div className='px-5 lg:px-8 flex flex-col md:flex-row md:justify-between md:items-center bg-[#333333] text-[#cccccc]'>
                <div className='flex flex-col md:flex-row md:items-center w-full'>
                    <span className='text-[13px] font-medium'>{moment().format('D MMMM YYYY')}</span>
                    <span className='text-[11px] md:ml-6 mt-1 md:mt-0 text-blue-200'>Фенски портал за Серия А – стани автор: <a href="mailto:admin@pirinpixel.com" className="underline">admin@pirinpixel.com</a></span>
                </div>
                <div className='flex gap-x-[1px] mt-2 md:mt-0'>
                    <a className='w-[37px] h-[35px] flex justify-center items-center bg-[#ffffff2b]' href=""><FaFacebookF /></a>
                    <a className='w-[37px] h-[35px] flex justify-center items-center bg-[#ffffff2b]' href=""><AiOutlineTwitter /></a>
                    <a className='w-[37px] h-[35px] flex justify-center items-center bg-[#ffffff2b]' href=""><AiFillYoutube /></a>
                </div>
            </div>
            <div style={{ backgroundImage: `url(${bg_header.src})`, backgroundSize: 'cover' }}>
                <div className="px-8 py-14">
                    <div className='flex justify-center items-center flex-wrap'>
                        <div className='md:w-4/12 w-full'>
                            <div className='flex flex-col justify-center items-center md:items-start'>
                                <Image className='w-[200px] h-[45px]' alt='logo' src={logo} />
                                <h2 className='text-[#cccccc]'>NEWS PORTAL FANS</h2>
                            </div>
                        </div>
                        <div className='md:w-8/12 w-full hidden md:block'>
                            <div className='w-full flex justify-end'>
                                <Image src={adver_image} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Header_Category />
        </div>
    )
}

export default Header