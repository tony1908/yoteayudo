import { useState } from "react";
import StableTokenABI from "./cusd-abi.json";
import MinipayNFTABI from "./minipay-nft.json";
import LoanContractABI from "./loan-contract-abi.json"; // Assuming you have saved the ABI in a file
import {
    createPublicClient,
    createWalletClient,
    custom,
    getContract,
    http,
    parseEther,
    stringToHex,
} from "viem";
import { celoAlfajores } from "viem/chains";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { BrowserProvider } from "ethers";

const publicClient = createPublicClient({
    chain: celoAlfajores,
    transport: http(),
});

const cUSDTokenAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"; // Testnet
const MINIPAY_NFT_CONTRACT = "0xE8F4699baba6C86DA9729b1B0a1DA1Bd4136eFeF"; // Testnet
const LOAN_CONTRACT_ADDRESS = "0x63971CAEeed3653B0A60EeA2e1B6CE52589F38e2"; // Replace with your contract address
const easContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
const schemaUID = "0x31461d6b8fd1963f7ed44b79c5a1c2b652634e2efe2b670a2d01fb3d41f2e97f";

export const useWeb3 = () => {
    const [address, setAddress] = useState<string | null>(null);

    const getUserAddress = async () => {
        if (typeof window !== "undefined" && window.ethereum) {
            let walletClient = createWalletClient({
                transport: custom(window.ethereum),
                chain: celoAlfajores,
            });

            let [address] = await walletClient.getAddresses();
            setAddress(address);
        }
    };

    const sendCUSD = async (to: string, amount: string) => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        let [address] = await walletClient.getAddresses();

        const amountInWei = parseEther(amount);

        const tx = await walletClient.writeContract({
            address: cUSDTokenAddress,
            abi: StableTokenABI.abi,
            functionName: "transfer",
            account: address,
            args: [to, amountInWei],
        });

        let receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return receipt;
    };

    const mintMinipayNFT = async () => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        let [address] = await walletClient.getAddresses();

        const tx = await walletClient.writeContract({
            address: MINIPAY_NFT_CONTRACT,
            abi: MinipayNFTABI.abi,
            functionName: "safeMint",
            account: address,
            args: [
                address,
                "https://cdn-production-opera-website.operacdn.com/staticfiles/assets/images/sections/2023/hero-top/products/minipay/minipay__desktop@2x.a17626ddb042.webp",
            ],
        });

        const receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return receipt;
    };

    const getNFTs = async () => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        const minipayNFTContract = getContract({
            abi: MinipayNFTABI.abi,
            address: MINIPAY_NFT_CONTRACT,
            client: publicClient,
        });

        const [address] = await walletClient.getAddresses();
        const nfts: any = await minipayNFTContract.read.getNFTsByAddress([
            address,
        ]);

        let tokenURIs: string[] = [];

        for (let i = 0; i < nfts.length; i++) {
            const tokenURI: string = (await minipayNFTContract.read.tokenURI([
                nfts[i],
            ])) as string;
            tokenURIs.push(tokenURI);
        }
        return tokenURIs;
    };

    const signTransaction = async () => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        let [address] = await walletClient.getAddresses();

        const res = await walletClient.signMessage({
            account: address,
            message: stringToHex("Hello from Celo Composer MiniPay Template!"),
        });

        return res;
    };

    const createAttestation = async () => {
        try {
            let walletClient = createWalletClient({
                transport: custom(window.ethereum),
                chain: celoAlfajores,
            });

            const [address] = await walletClient.getAddresses();

            const eas = new EAS(easContractAddress);

            // Create a new provider
            const provider = new BrowserProvider(window.ethereum);
            // Get the signer
            const ethersSigner = await provider.getSigner();

            await eas.connect(ethersSigner);

            const schemaEncoder = new SchemaEncoder("string platform");
            const encodedData = schemaEncoder.encodeData([
                { name: "platform", value: "Minipay", type: "string" }
            ]);

            const tx = await eas.attest({
                schema: schemaUID,
                data: {
                    recipient: "0x0000000000000000000000000000000000000000",
                    expirationTime: 0,
                    revocable: true,
                    data: encodedData,
                },
            });

            const newAttestationUID = await tx.wait();
            console.log("New attestation UID:", newAttestationUID);
            return newAttestationUID;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    // New Function to register a loan
    const registerLoan = async (loanId: number, totalAmount: string, interestRate: string, period: number) => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        let [address] = await walletClient.getAddresses();

        const tx = await walletClient.writeContract({
            address: LOAN_CONTRACT_ADDRESS,
            abi: LoanContractABI.abi,
            functionName: "registerLoan",
            account: address,
            args: [loanId, totalAmount, interestRate, period],
        });

        const receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return receipt;
    };

    // New Function to contribute to a loan
    const contributeToLoan = async (loanId: number, amount: string) => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });

        let [address] = await walletClient.getAddresses();

        const tx = await walletClient.writeContract({
            address: LOAN_CONTRACT_ADDRESS,
            abi: LoanContractABI.abi,
            functionName: "contributeToLoan",
            account: address,
            args: [loanId],
            value: parseEther(amount),  // Sending Ether (or cUSD) with the transaction
        });

        const receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        return receipt;
    };

    return {
        address,
        getUserAddress,
        sendCUSD,
        mintMinipayNFT,
        getNFTs,
        signTransaction,
        createAttestation,
        registerLoan, // Export the new function
        contributeToLoan, // Export the new function
    };
};
