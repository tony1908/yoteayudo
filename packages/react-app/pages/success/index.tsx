'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useWeb3 } from "@/contexts/useWeb3";
import PrimaryButton from "@/components/Button";

export default function Success() {
    const router = useRouter();
    const { createAttestation } = useWeb3();
    const [attestLoading, setAttestLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [redirect, setRedirect] = useState(false);

    // Extract URL parameters
    const { external_id, account_id } = router.query;

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (redirect) {
            const timer = setTimeout(() => {
                window.location.href = "/loans"; // Force navigation
            }, 10000); // 15 seconds

            return () => clearTimeout(timer); // Cleanup timeout on component unmount
        }
    }, [redirect]);

    async function handleCreateAttestation() {
        setAttestLoading(true);
        try {
            const newAttestationUID = await createAttestation(external_id, account_id, "rappi");
            console.log("Attestation Created with UID:", newAttestationUID);
            setRedirect(true); // Set redirect to true after creating attestation
        } catch (error) {
            setRedirect(true);
        } finally {
            setRedirect(true);
        }
    }

    if (!mounted || !router.isReady) {
        // This ensures that the component doesn't render until it's mounted and the router is ready
        return null;
    }

    return (
        <div className="max-w-full flex justify-center items-center min-h-screen">
            <PrimaryButton
                loading={attestLoading}
                onClick={handleCreateAttestation}
                title="Create Attestation"
                className="px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
                widthFull
            />
        </div>
    );
}
