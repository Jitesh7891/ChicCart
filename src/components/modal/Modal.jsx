import React, { useState, useRef, Fragment, useContext } from 'react';
import { Dialog, Transition, DialogPanel, TransitionChild, DialogTitle } from '@headlessui/react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import MyContext from '../../context/data/myContext';
import {fireDB} from "../../firebase/firebaseConfig"
import { addDoc, collection } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Modal = ({ totalAmount, cartItems }) => {
    const { mode } = useContext(MyContext);
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const nameRef = useRef('');
    const addressRef = useRef('');
    const pincodeRef = useRef('');
    const phoneNumberRef = useRef('');

    const stripe = useStripe();
    const elements = useElements();

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return; // Ensure Stripe is initialized

        const name = nameRef.current.value.trim();
        const address = addressRef.current.value.trim();
        const pincode = pincodeRef.current.value.trim();
        const phoneNumber = phoneNumberRef.current.value.trim();
        try {
            const response = await fetch('http://localhost:3000/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: (totalAmount + 100) * 100 }),
            });

            const data = await response.json();
            const cardElement = elements.getElement(CardElement);

            const paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name,
                        address: { line1: address, postal_code: pincode },
                    },
                },
            });

            if (paymentResult.error) {
                setErrorMessage(paymentResult.error.message);
                return;
            }

            const paymentId = paymentResult?.paymentIntent?.id;

            const orderInfo = {
                cartItems,
                addressInfo: { name, address, pincode, phoneNumber },
                date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                email: JSON.parse(localStorage.getItem('user'))?.user?.email,
                userid: JSON.parse(localStorage.getItem('user'))?.user?.uid,
                paymentId,
            };

            try {
                await addDoc(collection(fireDB, 'orders'), orderInfo);
            } catch (error) {
                console.error('Error saving order:', error);
            }

            localStorage.removeItem('cart');
            closeModal();
            toast.success('Payment successful!');
            window.location.reload();
        } catch (error) {
            setErrorMessage(error.message || 'Something went wrong during payment.');
        }
    };

    return (
        <>
            <button onClick={openModal} className="hover:bg-violet-700 bg-violet-600 text-white py-2 px-4 rounded-lg">
                Buy Now
            </button>

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
                        <div className="flex min-h-full items-center justify-center p-4">
                            <DialogPanel
                                className={`w-full max-w-lg rounded-2xl p-6 bg-${mode === 'dark' ? 'gray-800' : 'white'} text-${mode === 'dark' ? 'gray-100' : 'gray-900'}`}
                            >
                                <DialogTitle as="h2" className="text-xl font-semibold">
                                    Complete Payment
                                </DialogTitle>
                                <form onSubmit={handlePayment} className="space-y-6 mt-4">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">Full Name</label>
                                        <input ref={nameRef} className="w-full border rounded-lg p-2" required />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">Address</label>
                                        <input ref={addressRef} className="w-full border rounded-lg p-2" required />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">Pincode</label>
                                        <input ref={pincodeRef} className="w-full border rounded-lg p-2" required />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">Phone Number</label>
                                        <input ref={phoneNumberRef} className="w-full border rounded-lg p-2" required />
                                    </div>
                                    <CardElement className="border p-3 rounded-lg" />
                                    <button
                                        type="submit"
                                        disabled={!stripe}
                                        className="bg-violet-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Pay
                                    </button>
                                </form>
                                {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Modal;
