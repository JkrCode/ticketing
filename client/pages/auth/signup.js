import { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";


function SignUp(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: "/api/users/signup",
        method: "post",
        body: { email, password},
        onSuccess: ()=>{ Router.push("/")}
    })
    const onSubmit = async (event) =>{
        event.preventDefault();
        doRequest();   
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>
                SignUp
            </h1>

            <div className="form-group">
                <label> Email Address</label>
                <input onChange={
                    e => setEmail(e.target.value)
                } className="form-control"/>
            </div>

            <div className="form-group">
                <label> Password</label>
                <input type="password" onChange={
                    e => setPassword(e.target.value)
                } className="form-control"/>
            </div>

            {errors}
            <button className="btn btn-primary">SignUp</button>
        </form>
    )
}
export default SignUp;