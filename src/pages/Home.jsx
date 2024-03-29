import React from "react"
import moment from "moment/moment"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import LogoHumanProfil from "../Asset/new-animation.png"
import { FaSearch } from "react-icons/fa"
import { SlLocationPin } from "react-icons/sl"
import { TbPointFilled } from "react-icons/tb"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { AiOutlineMinus, AiOutlineArrowRight } from "react-icons/ai"
import http from "../helpers/http"
import Footer from "../components/Footer"
import HeaderHome from "../components/HeaderHome"

const Home = () => {
    const [events, setEvents] = React.useState([])
    const [eventsCategory, setEventCategory] = React.useState([])
    const [Locations, setLocation] = React.useState([])
    const [activeTabCategory, setActiveTabCategory] = React.useState('Festival')
    const [tabEvents, setTabEvents] = React.useState(1)
    const Categories = ['Music', 'Arts', 'Outdoors', 'Workshop', 'Sport', 'Festival', 'Fashion']
    const [partners, setPartners] = React.useState([])
    const [totalPage, setTotalPage] = React.useState()

    React.useEffect(() => {
        async function getDataEvents() {
            const { data } = await http().get('/events?sortBy=DESC')
            setEvents(data.results)
        }
        getDataEvents()

    }, [])


    React.useEffect(() => {
        async function getDataLocation() {
            const { data } = await http().get('/citites?limit=7')
            setLocation(data.results)
            console.log(data)
        }
        getDataLocation()
    }, [])

    React.useEffect(() => {
        async function getEventscategory() {
            try {
                const { data } = await http().get(`/events?categories=${activeTabCategory}&page=${tabEvents}&limit=3`)
                setTotalPage(data.totalPage)
                setEventCategory(data.results)
            } catch (error) {
                console.error(error);
            }
        }
        getEventscategory();
    }, [activeTabCategory, tabEvents]);

    const handleTabClick = (category) => {
        setActiveTabCategory(category)
        setTabEvents(1)
    };

    const handlePrevPage = () => {
        if (tabEvents > 1) {
            setTabEvents(tabEvents - 1);
        }
    }

    const handleNextPage = () => {
        if ((tabEvents + 1) <= totalPage) {
            setTabEvents(tabEvents + 1);
        }

    };


    React.useEffect(() => {
        async function getPartners() {
            const { data } = await http().get('/partners')
            setPartners(data.results)
        }
        getPartners()
    }, [])


    return (
        <>
            {/* helmet */}
            <div>
                <Helmet>
                    <title>HOME | Event Organizing</title>
                    <meta name="description" content="Ini adalah deskripsi halaman saya" />
                </Helmet>
            </div>

            {/* Navbar */}
            <HeaderHome/>

            {/* iklan */}
            <div className="font-poppins pt-[100px]">
                <div className="md:flex bg-primary justify-around bg-center bg-cover bg-no-repeat bg-[url('./Asset/background-img-1.png')]">
                    <div className='flex flex-col justify-center items-center md:my-[200px]'>
                        <div className='md:text-[64px] text-[45px] md:w-[554px] h-[192px] w-[370px] font-bold text-white mb-10 text-center md:text-left'>Find events you love with our</div>
                        <div className='bg-white md:w-[600px] md:h-[75px] w-[355px] h-[75px] rounded-2xl flex justify-center items-center'>
                            <form className='md:flex flex gap-10 md:gap-10'>
                                <div className='flex justify-center items-center gap-2 md:gap-3'>
                                    <div><FaSearch /></div>
                                    <input className='outline-none md:w-[170px] w-[65px]' type="text" placeholder='Search events . . .' />
                                </div>
                                <div className='flex justify-center items-center gap-2 md:gap-3'>
                                    <div><SlLocationPin /></div>
                                    <input className='outline-none md:w-[170px] w-[65px]' type="text" placeholder="Where?" />
                                </div>
                                <div>
                                    <button className='btn btn-secondary'><AiOutlineArrowRight size={20} /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='animate-pulse flex items-center justify-center md:my-[110px]'>
                        <img src={LogoHumanProfil} />
                    </div>
                </div>
            </div>

            {/* Events */}
            <div>
                <div className='md:mt-[175px] font-poppins mb-20 md:pt-0 pt-[100px]'>
                    <div className='flex flex-col justify-center items-center gap-7'>
                        <div className='bg-red-200 rounded-2xl w-[150px] h-[30px]'>
                            <div className='flex justify-center items-center gap-4'>
                                <div><AiOutlineMinus size={30} color="red" /></div>
                                <div className='text-red-500 font-medium'>EVENT</div>
                            </div>
                        </div>
                        <div>
                            <div className='text-[36px] font-semibold'>Events For You</div>
                        </div>
                    </div>
                    <div className='md:flex gap-10 justify-center items-center mt-[50px]'>
                        <div className='hidden md:flex items-center justify-center rounded-md shadow-md'>
                            <button className='btn btn-base-100'><AiOutlineArrowLeft size={20} /></button>
                        </div>
                        <div className='flex gap-16 justify-center items-center'>
                            <div className='hidden md:flex flex-col justify-center items-center opacity-50'>
                                <div>13</div>
                                <div>Mon</div>
                            </div>
                            <div className='flex flex-col justify-center items-center opacity-50'>
                                <div>14</div>
                                <div>The</div>
                            </div>
                            <div className='flex flex-col justify-center items-center text-orange-600 w-[50px] h-[75px] rounded-2xl border border-orange-500'>
                                <div>15</div>
                                <div>Wed</div>
                                <div><TbPointFilled size={15} color="orange-800" /></div>
                            </div>
                            <div className='flex flex-col justify-center items-center opacity-50'>
                                <div>16</div>
                                <div>Thu</div>
                            </div>
                            <div className='hidden md:flex flex-col justify-center items-center opacity-50'>
                                <div>17</div>
                                <div>Fri</div>
                            </div>
                        </div>
                        <div className='hidden bg-blue-600 justify-center items-center md:flex rounded-md shadow-2xl'>
                            <button className='btn btn-ghost'><AiOutlineArrowRight size={20} color="white" /></button>
                        </div>
                    </div>
                    <div className='flex gap-10 ml-[80px] font-poppins mt-14 overflow-x-scroll overflow-hidden'>
                        {events.map(event => {
                            return (
                                <>
                                    <Link to={`/events/${event.id}`} key={event.id}>
                                        <div className='inline-flex'>
                                            <div className="w-64 rounded-2xl overflow-hidden relative text-white" >
                                                <img className='w-[260px] h-[376px]' src={event?.picture} />
                                                <div className='absolute bottom-0 bg-gradient-to-t from-black/[0.7] to-black/[0.0] w-full p-8 flex flex-col gap-3'>
                                                    <div className="text-sm">{moment(event.date).format('dddd, DD-MMMM-YYYY')}</div>
                                                    <div className='text-xl font-bold'>{event.title}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </>
                            )
                        })}
                    </div>
                </div>
                <div className='md:flex md:justify-center md:items-center md:mt-[50px] md:mb-[73px] flex justify-center'>
                    <button className='bg-white btn btn-primary w-[255px] h-[40px] normal-case text-blue-800'>See All</button>
                </div>
            </div>

            {/* Discover Events */}
            <div id="location" className="flex justify-center items-center font-poppins text-white mt-[275px]">
                <div className="bg-blue-600 justify-center items-center w-[80%] rounded-3xl bg-center bg-cover bg-no-repeat bg-[url('./Asset/background-img-2.png')]">
                    <div className='md:flex justify-center items-center gap-x-28 mt-[74px]'>
                        <div className='md:grid grid-cols-4 gap-16'>
                            <div className='md:flex-col md:flex md:gap-5 gap-5 flex flex-col justify-start items-center'>
                                <div className='flex justify-center items-center  gap-3 bg-slate-100/50 rounded-2xl w-[150px] h-[30px]'>
                                    <div><AiOutlineMinus size={20} color="white" /></div>
                                    <div className='text-whitetext-sm'>LOCATION</div>
                                </div>
                                <div className='w-[180px] h-[192px] text-4xl font-semibold'>
                                    <div>Discover Events Near You</div>
                                </div>
                            </div>
                            {Locations.map(location => {
                                return (
                                    <>
                                        <div className='flex flex-col gap-5 justify-center items-center'>
                                            <div key={location.id}></div>
                                            <img className="w-[230px] h-[140px] rounded-[15px]" src={location?.picture} alt="" />
                                            <div>{location.name}</div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    <div className='flex justify-center items-center mt-[50px] mb-[73px]'>
                        <button className='bg-white btn btn-ghost w-[255px] h-[40px] normal-case text-blue-800'>See All</button>
                    </div>
                </div>
            </div>

            {/* Events By Categories */}

            <div className='mt-[175px] font-poppins'>
                <div>
                    <div className='flex flex-col justify-center items-center gap-10'>
                        <div className='flex bg-red-300/50 w-[160px] h-[30px] justify-center items-center gap-5 rounded-full text-red-800/80 font-semibold text-sm'>
                            <div><AiOutlineMinus size={20} /></div>
                            <div>CATEGORY</div>
                        </div>
                        <div className='md:text-3xl text-xl font-bold'>
                            <div>Browse Events By Category</div>
                        </div>
                        <>
                            <div className="md:flex gap-24">
                                {Categories.map(category => {
                                    return (
                                        <>
                                            <div className="md:flex flex flex-col items-center">
                                                <button
                                                    key={category}
                                                    className={`font-semibold px-4 py-2 hover:border-red-500  hover:text-red-500 ${activeTabCategory === category ? 'flex gap-10 activ border-b-2 border-red-500 text-red-600 ' : 'opacity-60'} px-4 py-2`}
                                                    onClick={() => handleTabClick(category)}
                                                >
                                                    {category}
                                                </button>
                                            </div>

                                        </>
                                    )
                                })}
                            </div>
                            <div>
                                <div className="md:flex gap-10">
                                    <div className=" hidden md:flex justify-center items-center">
                                        <div>
                                            <button className="btn btn-base-100 shadow-lg shadow-black-500/70" onClick={handlePrevPage}><AiOutlineArrowLeft size={20} color="black" /></button>
                                        </div>
                                    </div>
                                    {eventsCategory.length > 0 ? (eventsCategory.map(event => {
                                        return (
                                            <>
                                                <div className="md:flex md:gap-10">
                                                    <Link to={`/events/${event.id}`}>
                                                        <div className='inline-flex'>
                                                            <div className='w-64 rounded-2xl overflow-hidden relative text-white' key={event.id}>
                                                                {event.picture && <img className='w-[260px] h-[376px]' src={event.picture.startsWith('https') ? event.picture :
                                                                    `http://localhost:8888/uploads/${event.picture}`} />}
                                                                <div className='absolute bottom-0 bg-primary w-full h-[150px] min-h-1 p-8 flex flex-col gap-3'>
                                                                    <div className="text-sm">{moment(event.date).format('dddd, DD-MMMM-YYYY')}</div>
                                                                    <div className='text-2xl font-bold'>{event.title}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </>
                                        )
                                    })) : (
                                        <div className="flex justify-center items-center text-red-500 font-bold">
                                            <div className="text-2xl">
                                                No Data Events
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex justify-center items-center gap-10">
                                        <div className="md:hidden flex justify-center items-center">
                                            <div>
                                                <button className="btn btn-base-100 shadow-lg shadow-black-500/70" onClick={handlePrevPage}><AiOutlineArrowLeft size={20} color="black" /></button>
                                            </div>
                                        </div>
                                        <div className="flex justify-center items-center">
                                            <div>
                                                <button className="btn btn-primary shadow-lg shadow-black-500/70" onClick={handleNextPage}><AiOutlineArrowRight size={20} color="white" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>
                </div>
            </div>

            {/* partners */}
            <div className="mt-[175px]  bg-[#373A42]" >
                <div className="justify-center items-center flex bg-center bg-cover bg-no-repeat bg-[url('./Asset/background-img-3.png')]">
                    <div className="flex flex-col justify-center items-center font-poppins text-white mt-[75px] gap-7">
                        <div className='bg-white/50 rounded-2xl w-[150px] h-[30px]'>
                            <div className='flex justify-center items-center gap-4'>
                                <div><AiOutlineMinus size={30} color="white" /></div>
                                <div className='text-white font-medium'>EVENT</div>
                            </div>
                        </div>
                        <div className="text-[36px] font-bold">
                            <div>Our Trusted Partners</div>
                        </div>
                        <div className="text-md font-normal">
                            <div>By companies like :</div>
                        </div>
                        <>
                            <div className="md:flex grid grid-cols-2 gap-24 mb-20">
                                {partners.map(partner => {
                                    return (
                                        <>
                                            <div className="animate-pulse" key={partner.id}>
                                                <img src={partner?.picture} />
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />

        </>

    )
}

export default Home