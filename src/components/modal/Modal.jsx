import { Dialog, Transition, DialogPanel, TransitionChild, DialogTitle } from '@headlessui/react'
import { Fragment, useContext, useState } from 'react'
import MyContext from '../../context/data/myContext'

export default function Modal() {
    const { mode } = useContext(MyContext)
    const [isOpen, setIsOpen] = useState(false)
    
    const closeModal = () => setIsOpen(false)
    const openModal = () => setIsOpen(true)


    return (
        <>
            <div className="text-center rounded-lg">
                <button
                    type="button"
                    onClick={openModal}
                    className="w-full bg-violet-600 hover:bg-violet-700 py-2 rounded-lg text-white font-bold transition-colors duration-200"
                >
                    Buy Now
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel 
                                    className={`w-full max-w-md transform rounded-2xl p-6 text-left align-middle shadow-xl transition-all ${
                                        mode==='dark' 
                                            ? 'bg-gray-800 text-gray-100' 
                                            : 'bg-white text-gray-900'
                                    }`}
                                >
                                    <div className="space-y-6">
                                        <div className="text-center">
                                            <DialogTitle
                                                as="h3"
                                                className={`text-lg font-medium leading-6 ${
                                                    mode==='dark' ? 'text-gray-100' : 'text-gray-900'
                                                }`}
                                            >
                                                Complete Your Order
                                            </DialogTitle>
                                        </div>

                                        <form className="space-y-4">
                                            {[
                                                { id: 'name', label: 'Full Name', type: 'text' },
                                                { id: 'address', label: 'Address', type: 'text' },
                                                { id: 'pincode', label: 'Pincode', type: 'text' },
                                                { id: 'mobileNumber', label: 'Mobile Number', type: 'tel' }
                                            ].map(field => (
                                                <div key={field.id}>
                                                    <label
                                                        htmlFor={field.id}
                                                        className={`block mb-2 text-sm font-medium ${
                                                            mode==='dark' ? 'text-gray-200' : 'text-gray-700'
                                                        }`}
                                                    >
                                                        {field.label}
                                                    </label>
                                                    <input
                                                        type={field.type}
                                                        name={field.id}
                                                        id={field.id}
                                                        className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 transition-colors duration-200 ${
                                                            mode==='dark' 
                                                                ? 'bg-gray-700 border-gray-600 text-white focus:ring-violet-500 focus:border-violet-500'
                                                                : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-violet-500 focus:border-violet-500'
                                                        }`}
                                                        required
                                                    />
                                                </div>
                                            ))}
                                        </form>

                                        <div className="flex gap-3 mt-6">
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg border transition-colors duration-200 ${
                                                    mode==='dark'
                                                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                                        : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                                                }`}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors duration-200"
                                            >
                                                Order Now
                                            </button>
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}