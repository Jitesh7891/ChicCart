import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import { FaStar } from "react-icons/fa6";
import { FaStarHalfStroke } from "react-icons/fa6";
import { FaFacebookF, FaTwitter, FaHeart  } from "react-icons/fa";
import { BiSolidMessageRounded } from "react-icons/bi";
import MyContext from '../../context/data/myContext';
import { useParams } from 'react-router-dom';

function ProductInfo() {
    const {mode}=useContext(MyContext);
    const { id } = useParams();
    return (
        <Layout>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-32 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img
                            alt="ecommerce"
                            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                            src="https://dummyimage.com/400x400"
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className={`${mode==='light'?"text-gray-500":"text-gray-300"} text-sm title-font tracking-widest`}>
                                BRAND NAME
                            </h2>
                            <h1 className={`${mode==='light'?"text-gray-900":"text-white"} text-3xl title-font font-medium mb-1`}>
                                Product Name {id}
                            </h1>
                            <div className=" flex mb-4">
                                <span className=" flex items-center">
                                <FaStar size={17} color="#FFD700"/>
                                <FaStar size={17} color="#FFD700"/>
                                <FaStar size={17} color="#FFD700"/>
                                <FaStar size={17} color="#FFD700"/>
                                <FaStarHalfStroke size={17} color="#FFD700"/>
                                    <span className={`${mode==='light'?"text-gray-600":"text-gray-400"} ml-3`}>4162  Reviews</span>
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-300">
                  
                                    {[FaFacebookF, FaTwitter, BiSolidMessageRounded].map((Icon, index) => (
                                <a key={index} className={`ml-1 transform hover:scale-110 transition-transform duration-200
                                    ${mode === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                                    <Icon className="text-xl" />
                                </a>
                            ))}
                                    
                                </span>
                            </div>
                            <p className={`${mode==='light'?"text-gray-500":"text-gray-300"} leading-relaxed border-b-2 mb-5 pb-5`}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore eius incidunt non molestias illo vitae soluta saepe quidem molestiae! Aliquam expedita, sed sunt similique placeat facilis quae fugiat distinctio! Obcaecati veritatis mollitia perferendis repellendus in natus culpa eius repellat modi
                            </p>
                         
                            <div className="flex">
                                <span className={`${mode==='light'?"text-gray-900":"text-white"} title-font font-medium text-2xl`}>
                                    $47.00
                                </span>
                                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                    Add To Cart
                                </button>
                                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                <FaHeart size={17}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </Layout> 
    )
}

export default ProductInfo