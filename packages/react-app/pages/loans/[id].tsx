import {
    DollarSignIcon,
    PlusIcon,
    MinusIcon,
    XIcon,
    UserIcon,
} from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useWeb3 } from "@/contexts/useWeb3";

const OfferCard = () => {
    const {
        registerLoan, // Import the new attestation function
    } = useWeb3();
    const [offer, setOffer] = useState(10);
    const [numberOfOffers, setNumberOfOffers] = useState(2);
    const [showModal, setShowModal] = useState(false);
    const handleIncrement = () => setNumberOfOffers(numberOfOffers + 1);
    const handleDecrement = () => {
        if (numberOfOffers > 1) setNumberOfOffers(numberOfOffers - 1);
    };
    const toggleModal = () => setShowModal(!showModal);

    const router = useRouter();
    const { id } = router.query;

    // Function to generate random loan data
    const generateRandomLoanData = () => {
        const loanId = 5; // Random loan ID
        const totalAmount = 1; // Random amount between 0 and 10 cUSD
        const interestRate = 1; // Random interest rate between 1% and 6%
        const period = 1; // Random period in days

        return { loanId, totalAmount, interestRate, period };
    };

// Function to handle Place Offer button click
    const handlePlaceOffer = async () => {
        try {
            const { loanId, totalAmount, interestRate, period } = generateRandomLoanData();
            const receipt = await registerLoan(loanId, totalAmount, interestRate, period);
            console.log("Loan registered successfully:", receipt);
        } catch (error) {
            console.error("Error registering loan:", error);
        }
    };


    return (
        <div
            className="max-w-full border-black border-2 rounded-md bg-white p-4 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
            data-id="element-0"
        >
            <div className="relative" data-id="element-1">
                <img
                    src="https://media.licdn.com/dms/image/D4E16AQEqQMwhdP8ucQ/profile-displaybackgroundimage-shrink_200_800/0/1666121556732?e=2147483647&v=beta&t=1wUWxPyHtUXmd3_ClkTvWdjtMt92Bk-k7paG-LFjBwg"
                    alt="Header"
                    className="w-full h-32 object-cover rounded-t-md"
                    data-id="element-2"
                    style={{
                        marginTop: 0,
                        marginRight: 0,
                        marginLeft: 0,
                    }}
                />
                <div
                    className="absolute top-16 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full border-black border-2 overflow-hidden"
                    data-id="element-5"
                >
                    <img
                        src="https://media.glassdoor.com/people/sql/1275894/rappi-ceo1661918863764.png"
                        alt="Avatar"
                        className="w-full h-full object-cover"
                        data-id="element-6"
                    />
                </div>
            </div>
            <div className="text-center mt-10" data-id="element-7">
                <h1 className="text-2xl font-bold text-black" data-id="element-8">
                   Antonio Perez
                </h1>
                <button
                    onClick={toggleModal}
                    className="mt-2 h-8 border-black border-2 p-1.5 bg-yellow-200 hover:bg-yellow-300 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-yellow-400 rounded-md text-black"
                    data-id="element-0"
                >
                    <UserIcon size={16} className="inline mr-1" data-id="element-1" />{" "}
                    Show Profile
                </button>
            </div>
            <div className="flex justify-around mt-4 text-black" data-id="element-9">
                <div className="text-center" data-id="element-10">
                    <p data-id="element-11">Duration</p>
                    <p data-id="element-12">7d</p>
                </div>
                <div className="text-center" data-id="element-13">
                    <p data-id="element-14">% Rate</p>
                    <p data-id="element-15">1%</p>
                </div>

            </div>
            <hr className="my-4 border-black" data-id="element-19" />
            <div className="text-black" data-id="element-20">
                <div
                    className="flex justify-between items-center mb-4"
                    data-id="element-21"
                >
                    <p data-id="element-22">Your Offer</p>
                    <div
                        className="flex items-center border-black border-2 p-2 rounded-md"
                        data-id="element-23"
                    >
                        <input
                            type="number"
                            className="w-12 text-center bg-transparent outline-none focus:bg-pink-200"
                            data-id="element-24"
                            value={offer}
                            onChange={(e) => setOffer(Number(e.target.value))}
                        />
                        <span className="ml-2" data-id="element-25">
              <DollarSignIcon size={16} data-id="element-1" />
            </span>
                    </div>
                </div>
                <div
                    className="flex justify-between items-center mb-4 border-black border-2 rounded-md p-3 bg-yellow-200"
                    data-id="element-35"
                >
                    <p className="text-black font-bold" data-id="element-36">
                        Your Return
                    </p>
                    <p
                        className="flex items-center text-black font-bold"
                        data-id="element-37"
                    >
                        <DollarSignIcon size={18} className="mr-1" data-id="element-0" />
                        10.01
                    </p>
                </div>
            </div>
            <hr className="my-4 border-black" data-id="element-38" />
            <div
                className="flex justify-between items-center mb-4 text-black border-black border-2 rounded-md p-3 bg-cyan-300"
                data-id="element-39"
            >
                <p data-id="element-40" className="font-bold">
                    Offer Total
                </p>
                <p data-id="element-41" className="flex items-center">
                    10 <DollarSignIcon size={16} className="ml-1" data-id="element-3" />
                </p>
            </div>
            <button
                className="w-full h-12 border-black border-2 p-2.5 bg-cyan-300 hover:bg-cyan-400 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-cyan-400 rounded-md text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                onClick={handlePlaceOffer} // Register the loan when clicked
            >
                Place Offer
            </button>

            {showModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    data-id="element-2"
                >
                    <div
                        className="bg-white p-6 rounded-md border-black border-2 shadow-[8px_8px_0px_rgba(0,0,0,1)] max-w-md w-full"
                        data-id="element-3"
                    >
                        <div
                            className="flex justify-between items-center mb-4"
                            data-id="element-4"
                        >
                            <h2 className="text-2xl font-bold" data-id="element-5">
                                Full Profile
                            </h2>
                            <button
                                onClick={toggleModal}
                                className="text-black hover:text-gray-700"
                                data-id="element-6"
                            >
                                <XIcon size={24} data-id="element-7" />
                            </button>
                        </div>
                        <div className="mb-4" data-id="element-8">
                            <img
                                src="/path/to/your/avatar.jpg"
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-black border-2 mx-auto"
                                data-id="element-9"
                            />
                        </div>
                        <div className="text-center mb-4" data-id="element-10">
                            <h3 className="text-xl font-bold" data-id="element-11">
                                ABC
                            </h3>
                            <p className="text-sm" data-id="element-12">
                                Member since: January 2023
                            </p>
                        </div>
                        <div className="space-y-2" data-id="element-13">
                            <p data-id="element-14">
                                <strong data-id="element-15">Total Offers:</strong> 15
                            </p>
                            <p data-id="element-16">
                                <strong data-id="element-17">Successful Loans:</strong> 10
                            </p>
                            <p data-id="element-18">
                                <strong data-id="element-19">Average Return Rate:</strong> 2.5%
                            </p>
                        </div>
                        <button
                            onClick={toggleModal}
                            className="mt-6 w-full h-12 border-black border-2 p-2.5 bg-cyan-300 hover:bg-cyan-400 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-cyan-400 rounded-md text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            data-id="element-20"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const LoanPage = () => {
    return <OfferCard />;
};

export default LoanPage;
