import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core'
import { injected } from "../utils/connectors";
export default function dashboard() {

    const { library, activate, account } = useWeb3React()

    useEffect(() => {
        const userAuth = JSON.parse(localStorage.getItem("userAuth"))

        if (userAuth) activate(injected)
    }, [])


    return <div className="flex items-center flex-col justify-center h-[100vh]">
        <h1 className="text-4xl font-bold"> Dashboard</h1>
        <h1 className="text-4xl "> Address: {account}</h1>
    </div>;
}
