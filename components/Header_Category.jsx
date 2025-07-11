'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'
import { BsList } from 'react-icons/bs'
import { base_api_url } from '../config/config'
import { useRouter } from 'next/navigation'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const Header_Category = () => {

    const router = useRouter()
    const path = usePathname()
    const [state, setState] = useState('')

    const [categories, set_categories] = useState([])

    const subcategories = [
        { name: 'Прогнози', slug: 'prognozi' },
        { name: 'Новини', slug: 'novini' },
        { name: 'Трансфери', slug: 'transferi' },
        { name: 'Коментари', slug: 'komentari' },
    ];

    const get_categories = async () => {
        try {
            const res = await fetch(`${base_api_url}/api/category/all`)
            const data = await res.json()
            set_categories(data.categories)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        get_categories()
    }, [])

    const [show, setShow] = useState(false)
    const [cate_show, set_cate_show] = useState(false)
    const [openCategory, setOpenCategory] = useState(null);

    const search = (e) => {
        e.preventDefault()
        router.push(`/search/news?value=${state}`)
        setState('')
        setShow(false)
    }
    return (
        <div className='w-full'>
            <div className='bg-[#c80000] w-full text-white uppercase font-semibold relative'>
                <div className='px-8 flex justify-between items-center relative h-[48px]'>
                    <div onClick={() => set_cate_show(!cate_show)} className={`text-3xl flex lg:hidden font-bold h-full w-[48px] cursor-pointer justify-center items-center ${cate_show ? 'bg-[#00000026]' : ''} hover:bg-[#00000026]`}>
                        <BsList />
                    </div>
                    <div className='flex-wrap hidden lg:flex'>
                        <Link className={`px-6 font-medium py-[13px] ${path === '/' ? 'bg-[#00000026]' : ''}`} href={'/'} >Начало</Link>
                        {
                            categories.length > 0 && categories.map((c, i) => {
                                const getTeamLogo = (teamName) => {
                                    const logos = {
                                        'Milan': 'https://football-logos.cc/logos/italy/512x512/milan.png',
                                        'Juventus': 'https://football-logos.cc/logos/italy/512x512/juventus.png',
                                        'Inter': 'https://football-logos.cc/logos/italy/512x512/inter.png',
                                        'Napoli': 'https://football-logos.cc/logos/italy/512x512/napoli.png',
                                        'Roma': 'https://football-logos.cc/logos/italy/512x512/roma.png',
                                        'Lazio': 'https://football-logos.cc/logos/italy/512x512/lazio.png',
                                        'Fiorentina': 'https://football-logos.cc/logos/italy/512x512/fiorentina.png'
                                    };
                                    return logos[teamName] || null;
                                };
                                const teamLogo = getTeamLogo(c.category);
                                return (
                                    <div key={i} className='relative group'>
                                        <Link
                                            className={`px-6 font-medium py-[13px] flex items-center gap-2 ${path === `/news/category/${c.category}` ? 'bg-[#00000026]' : ''}`}
                                            href={`/news/category/${c.category}`}
                                        >
                                            {teamLogo && (
                                                <img 
                                                    src={teamLogo} 
                                                    alt={c.category}
                                                    className="w-5 h-5 object-contain"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            )}
                                            {c.category}
                                        </Link>
                                        {/* Mega menu dropdown */}
                                        <div className="absolute left-0 top-full min-w-[180px] bg-white text-black shadow-lg rounded-b z-30 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity duration-200">
                                            {subcategories.map((sub, idx) => (
                                                <Link
                                                    key={sub.slug}
                                                    href={`/news/category/${c.category}/${sub.slug}`}
                                                    className="block px-6 py-3 hover:bg-gray-100 whitespace-nowrap border-b last:border-b-0 border-gray-200"
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })
                        }
                        <Link className={`px-6 font-medium py-[13px] ${path === '/results' ? 'bg-[#00000026]' : ''}`} href={'/results'} >Резултати</Link>
                    </div>
                    <div className='h-full w-[48px]'>
                        <div
                            onClick={() => {
                                setShow(!show)
                            }}
                            className={`text-xl ${show ? 'bg-[#00000026]' : ''} font-bold h-full w-full cursor-pointer justify-center flex items-center hover:bg-[#00000026]`}>
                            {
                                show ? <IoClose /> : <AiOutlineSearch />
                            }

                        </div>
                        <div className={`absolute lg:block transition-all text-slate-700 z-20 shadow-lg lg:right-10 top-[50px] w-full lg:w-[300px] right-0 ${show ? 'visible' : 'invisible'} `}>
                            <div className='p-3 bg-white'>
                                <form onSubmit={search} className='flex'>
                                    <div className='w-[calc(100%-45px)] h-[40px]'>
                                        <input  value={state} required onChange={(e) => setState(e.target.value)} type="text" placeholder='search' className='h-full w-full p-2 border border-slate-300 outline-none bg-slate-100' />
                                    </div>
                                    <button className='w-[45px] hover:bg-red-700 cursor-pointer h-[40px] flex justify-center outline-none items-center bg-red-600 text-white text-xl'>
                                        <AiOutlineSearch />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                cate_show &&                 <div className='flex flex-wrap lg:hidden py-2 px-[30px]'>
                    <Link className={`px-4 font-medium py-[5px] ${path === '/' ? 'bg-[#00000026]' : ''}`} href={'/'} >Начало</Link>
                    {
                        categories.length > 0 && categories.map((c, i) => {
                            const getTeamLogo = (teamName) => {
                                const logos = {
                                    'Milan': 'https://football-logos.cc/logos/italy/512x512/milan.png',
                                    'Juventus': 'https://football-logos.cc/logos/italy/512x512/juventus.png',
                                    'Inter': 'https://football-logos.cc/logos/italy/512x512/inter.png',
                                    'Napoli': 'https://football-logos.cc/logos/italy/512x512/napoli.png',
                                    'Roma': 'https://football-logos.cc/logos/italy/512x512/roma.png',
                                    'Lazio': 'https://football-logos.cc/logos/italy/512x512/lazio.png',
                                    'Fiorentina': 'https://football-logos.cc/logos/italy/512x512/fiorentina.png'
                                };
                                return logos[teamName] || null;
                            };
                            const teamLogo = getTeamLogo(c.category);
                            const isOpen = openCategory === i;
                            return (
                                <div key={i} className="w-full">
                                    <button
                                        type="button"
                                        className={`w-full flex items-center gap-2 px-4 py-[5px] font-medium text-left ${path === `/news/category/${c.category}` ? 'bg-[#00000026]' : ''}`}
                                        onClick={() => setOpenCategory(isOpen ? null : i)}
                                    >
                                        {teamLogo && (
                                            <img 
                                                src={teamLogo} 
                                                alt={c.category}
                                                className="w-4 h-4 object-contain"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        )}
                                        <span className="flex-1">{c.category}</span>
                                        {isOpen ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
                                    </button>
                                    {/* Подкатегории за mobile */}
                                    {isOpen && (
                                        <div className="pl-8 flex flex-col bg-gray-100 rounded-b pb-2">
                                            {subcategories.map((sub) => (
                                                <Link
                                                    key={sub.slug}
                                                    href={`/news/category/${c.category}/${sub.slug}`}
                                                    className="py-2 text-base text-gray-800 hover:text-red-700 font-semibold"
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    }
                    <Link className={`px-4 font-medium py-[5px] ${path === '/results' ? 'bg-[#00000026]' : ''}`} href={'/results'} >Резултати</Link>
                </div>
            }

        </div>
    )
}

export default Header_Category