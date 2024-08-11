import React, { useState } from "react";

export default function Loans() {
    const handleConnectClick = () => {
        window.location.href = "https://widget.palenca.com/?widget_id=fc530a10-2f9b-4e40-ae40-938e45753e17&is_sandbox=true";
    };

    return (
        <div className="max-w-full p-4">
            <button
                className="w-full h-12 border-black border-2 p-2.5 bg-cyan-300 hover:bg-cyan-400 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-cyan-400 rounded-md text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                onClick={handleConnectClick}
            >
                Connect account
            </button>
        </div>
    );
}
