import { LockIcon } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from 'next/router';

const Card = ({ title, description, rewardsFixed, rewardsVariable, daysLeft, profileImage }) => {
    const [showAd, setShowAd] = useState(false);
    const router = useRouter();

    const handleParticipateClick = () => {
        router.push(`/loans/1`);
    };

    return (
        <div className="border-black border-2 rounded-t-3xl rounded-b-xl max-w-xs mx-auto bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)] mb-4">
            <div className="border-b-2 border-black p-4">
                <span className="bg-lime-300 text-black text-xs font-bold px-2 py-1 rounded-full">
                    NOT PARTICIPATED
                </span>
                <span className="float-right text-xs">
                    Ends in {daysLeft} days
                </span>
            </div>
            <div className="p-4">
                <div className="flex items-center mb-2">
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="rounded-full mr-4 border-black border-2 w-12 h-12"
                    />
                    <h2 className="text-xl font-bold mb-2 text-black">
                        {title}
                    </h2>
                </div>
                <p className="mb-4">
                    {description}
                </p>
                <div className="bg-orange-200 border-black border-2 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold">
                            🏆 Loan 🏆
                        </span>
                        <button className="text-xs border-black border rounded px-2 py-1 hover:bg-orange-300">
                            +Info
                        </button>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <p>Amount</p>
                            <p className="font-bold">
                                {rewardsFixed} €
                            </p>
                        </div>
                        <div className="text-right">
                            <p>Participants</p>
                            <p className="font-bold">
                                {rewardsVariable}
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleParticipateClick}
                    className="w-full bg-purple-300 hover:bg-purple-400 text-black font-bold py-2 px-4 rounded-full border-black border-2 flex items-center justify-center"
                >
                    <LockIcon className="mr-2" size={18} />
                    Participate
                </button>
                {showAd && (
                    <div className="mt-4 bg-yellow-300 border-black border-2 rounded-xl p-4">
                        This is a fake ad
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Loans() {
    const dummyData = [
        {
            title: "Antonio Perez",
            description: "I need money for the medicines of my family.",
            rewardsFixed: 15,
            rewardsVariable: 1,
            daysLeft: 21,
            profileImage: "https://media.glassdoor.com/people/sql/1275894/rappi-ceo1661918863764.png"
        },
        {
            title: "Luis Gonzalez",
            description: "I need funds to pay for my child's school.",
            rewardsFixed: 10,
            rewardsVariable: 0.5,
            daysLeft: 15,
            profileImage: "https://blogadmin.uberinternal.com/wp-content/uploads/2017/12/UberIM_001928-large.jpg"
        },
        {
            title: "Maria Rodriguez",
            description: "Help me afford medical treatment.",
            rewardsFixed: 20,
            rewardsVariable: 2,
            daysLeft: 30,
            profileImage: "https://lasillarota.com/u/fotografias/m/2022/4/23/f425x230-318566_332548_5050.jpg"
        },

    ];

    const router = useRouter();

    const handleRequestLoanClick = () => {
        router.push('/profiles');
    };

    return (
        <div className="max-w-full p-4">
            <button
                onClick={handleRequestLoanClick}
                className="w-full h-12 border-black border-2 p-2.5 bg-cyan-300 hover:bg-cyan-400 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-cyan-400 rounded-md text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                Request a loan
            </button>
            <div>
                <br/>
            </div>
            {dummyData.map((data, index) => (
                <Card
                    key={index}
                    title={data.title}
                    description={data.description}
                    rewardsFixed={data.rewardsFixed}
                    rewardsVariable={data.rewardsVariable}
                    daysLeft={data.daysLeft}
                    profileImage={data.profileImage}
                />
            ))}
        </div>
    );
}
