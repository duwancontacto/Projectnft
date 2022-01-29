import React, { useState } from 'react';
import petition_post from "../utils/petitions/petition_post"
export default function login() {


    const [form, setForm] = useState({ email: "", password: "" })

    const handleSubmit = () => {


        if (form.email.trim() === "" || form.password.trim() === "") return window.alert("Complete Fields")

        petition_post("Login", { data: form })
            .then((result) => {
                localStorage.setItem("userAuth", JSON.stringify(result.data.data))
                window.location.href = "/dashboard"
            })
            .catch((err) => { window.alert(err.response.data.data) })


    }


    const handleChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    return <div className="  w-[30rem] mx-auto bg-[#dbdada] rounded-md p-5 mt-10">
        <h1 className="font-bold text-6xl  text-center  ">
            Login
        </h1>

        <div className="flex flex-col">
            <label htmlFor=""> Email:  </label>
            <input type="text" name="email" value={form.email} onChange={handleChangeForm} className="border-2 rounded-md border-[#424141]" />
        </div>
        <div className="flex flex-col pt-3">
            <label htmlFor=""> Password:  </label>
            <input type="text" name="password" value={form.password} onChange={handleChangeForm} className="border-2 rounded-md border-[#424141]" />
        </div>
        <div className="text-center pt-7">
            <button onClick={handleSubmit} className="rounded-md bg-[white] font-bold border-2 h-10 border-[#424141]  w-full mx-auto ">  Login </button>

        </div>

    </div>
}
