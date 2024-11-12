import React, { useContext, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import myContext from '../../../context/data/myContext';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FaUser, FaCartPlus } from 'react-icons/fa';
import { AiFillShopping, AiFillPlusCircle, AiFillDelete } from 'react-icons/ai';

function DashboardTab() {
    const context = useContext(myContext);
    const { mode } = context;
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <div className="container mx-auto">
                <div className="container mx-auto">
                    <Tabs defaultIndex={0} className="">
                        <TabList className="md:flex md:space-x-8 grid sm:grid-cols-3 text-center gap-4 md:justify-center mb-16">
                            <Tab>
                                <button type="button" className="font-medium border-b-2 hover:shadow-pink-700 border-pink-500 text-pink-500 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center bg-[#605d5d12] ">
                                    <div className="flex gap-2 items-center">
                                        <MdOutlineProductionQuantityLimits />Products
                                    </div>
                                </button>
                            </Tab>
                            <Tab>
                                <button type="button" className="font-medium border-b-2 border-blue-500 bg-[#605d5d12] text-blue-500 hover:shadow-blue-700 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center ">
                                    <div className="flex gap-2 items-center">
                                        <AiFillShopping /> Order
                                    </div>
                                </button>
                            </Tab>
                            <Tab>
                                <button type="button" className="font-medium border-b-2 border-green-500 bg-[#605d5d12] text-green-500 rounded-lg text-xl hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center ">
                                    <div className="flex gap-2 items-center">
                                        <FaUser /> Users
                                    </div>
                                </button>
                            </Tab>
                        </TabList>

                        {/* Product */}
                        <TabPanel>
                            <div className='px-4 md:px-0 mb-16'>
                                <h1 className='text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === 'dark' ? 'white' : '' }}>Product Details</h1>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className={`focus:outline-none text-white  shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border ${mode==='light'?'bg-pink-600 hover:bg-pink-700':'bg-gray-700 hover:bg-gray-600'} font-medium rounded-lg text-sm px-5 py-2.5 mb-5 mr-4`}>
                                        <div className="flex gap-2 items-center">
                                            Add Product <FaCartPlus size={20} />
                                        </div>
                                    </button>
                                </div>
                                <div className="relative overflow-x-auto ">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
                                        <thead  className={`text-xs ${mode === 'dark' ? 'text-white bg-gray-800' : 'text-black bg-gray-200'} uppercase border border-gray-600`} 
  style={{ 
    boxShadow: mode === 'dark' ? 'inset 0 0 8px rgba(255,255,255,0.2)' : 'inset 0 0 8px rgba(0,0,0,0.6)' 
  }} >
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    S.No
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Image
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Title
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Price
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Category
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className={`${mode==='light'?'bg-gray-50 text-black':'text-white bg-gray-700'} border-b`} >
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    1.
                                                </td>
                                                <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                                    <img className='w-16' src="https://dummyimage.com/720x400" alt="img" />
                                                </th>
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    Title
                                                </td>
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    ₹100
                                                </td>
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    pots
                                                </td>
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    12 Aug 2019
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className=" flex gap-2">
                                                        <div className=" flex gap-2 cursor-pointer text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            <div>
                                                                <AiFillPlusCircle size={20} />
                                                            </div>
                                                            <div>
                                                                <AiFillDelete size={20} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            {/* Order */}
                            <div className="relative overflow-x-auto mb-16">
                                <h1 className='text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === 'dark' ? 'white' : '' }}>Order Details</h1>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" >
                                    <thead className={`text-xs ${mode === 'dark' ? 'text-white bg-gray-800' : 'text-black bg-gray-200'} uppercase border border-gray-600`} 
  style={{ 
    boxShadow: mode === 'dark' ? 'inset 0 0 8px rgba(255,255,255,0.2)' : 'inset 0 0 8px rgba(0,0,0,0.6)' 
  }}>
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Payment Id
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Image
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Title
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Price
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Category
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Address
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Pincode
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Phone Number
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                       <tr className={`${mode==='light'?'bg-gray-50 text-black':'text-white bg-gray-700'} border-b`} >
                                            <td className="px-6 py-4">
                                                #TR89220221
                                            </td>
                                            <td className="px-6 py-4">
                                                <img className="w-10" src="https://dummyimage.com/600x400" alt="img" />
                                            </td>
                                            <td className="px-6 py-4">
                                                Product Name
                                            </td>
                                            <td className="px-6 py-4">
                                                ₹500
                                            </td>
                                            <td className="px-6 py-4">
                                                Electronics
                                            </td>
                                            <td className="px-6 py-4">
                                                John Doe
                                            </td>
                                            <td className="px-6 py-4">
                                                123 Street, City
                                            </td>
                                            <td className="px-6 py-4">
                                                123456
                                            </td>
                                            <td className="px-6 py-4">
                                                +1234567890
                                            </td>
                                            <td className="px-6 py-4">
                                                john.doe@example.com
                                            </td>
                                            <td className="px-6 py-4">
                                                12 Aug 2019
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>

                        {/* User */}
                        
                        <TabPanel>
                            {/* <User addressInfo={addressInfo} setAddressInfo={setAddressInfo} setLoading={setLoading} /> */}
                            <div className="relative overflow-x-auto mb-10">
                                <h1 className=' text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === 'dark' ? 'white' : '' }}>User Details</h1>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className={`text-xs ${mode === 'dark' ? 'text-white bg-gray-800' : 'text-black bg-gray-200'} uppercase border border-gray-600`} 
  style={{ 
    boxShadow: mode === 'dark' ? 'inset 0 0 8px rgba(255,255,255,0.2)' : 'inset 0 0 8px rgba(0,0,0,0.6)' 
  }} >
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                S.No
                                            </th>

                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Uid
                                            </th>
                                           
                                        </tr>
                                    </thead>
                             
                                  
                                        <tbody>
                                       <tr className={`${mode==='light'?'bg-gray-50 text-black':'text-white bg-gray-700'} border-b`} >
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                               1.
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                john doe
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                johndoe@email.com
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                28128
                                            </td>

                                        </tr>
                                    </tbody>
                                    
                                </table>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>


            </div>
        </>
    )
}

export default DashboardTab;
