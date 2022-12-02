import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link, useNavigate} from "react-router-dom";
import {customPostPromiseRegistration} from "../metier/AuthService";
import isAuthenticated from "../hoc/IsAuthenticated";
function Login() {
    const[user, setUser] = useState({})
    const navigate = useNavigate();
    const registration = async () => {
        return await customPostPromiseRegistration(user)
    }
    const handleRegistration = e =>{
        e.preventDefault();
        if (registration()) {
            navigate('/login')
        }
    }

    const handleChanges =(e) =>{
        switch (e.target.name){
            case "name":
                setUser({...user, name: e.target.value})
                break;
            case "email":
                setUser({...user, email: e.target.value})
                break;
            case "password":
                setUser({...user, password: e.target.value})
                break;
        }
    }

    return (
        <div>
            <section className="vh-100" style={{backgroundColor: "#9A616D;"}}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{borderRadius: "1rem;"}}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">

                                            <form onSubmit={handleRegistration}>



                                                <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px;"}}>Sign
                                                    into your account</h5>

                                                <div className="form-outline mb-4">
                                                    <input type="text" id="form2Example17"
                                                           name={"name"}
                                                           onChange={handleChanges}
                                                           className="form-control form-control-lg"/>
                                                    <label className="form-label" htmlFor="form2Example17">Name</label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input type="email" id="form2Example17"
                                                           name={"email"}
                                                           onChange={handleChanges}
                                                           className="form-control form-control-lg"/>
                                                    <label className="form-label" htmlFor="form2Example17">Email
                                                        address</label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input type="password" id="form2Example27"
                                                           name={"password"}
                                                           onChange={handleChanges}
                                                           className="form-control form-control-lg"/>
                                                    <label className="form-label"
                                                           htmlFor="form2Example27">Password</label>
                                                </div>

                                                    <button type={'submit'} className="pt-1 mb-4 btn btn-dark btn-lg btn-block"
                                                           >Register
                                                    </button>


                                                <p className="mb-5 pb-lg-2" style={{color: "#393f81;"}}>Don't have an
                                                    account? <Link to={'/login'}
                                                                   style={{color: "#393f81;"}}>Login</Link></p>
                                            </form>

                                        </div>
                                    </div>

                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img
                                            src="https://i.pinimg.com/originals/e3/70/96/e37096a91ddf2f00e098b23c70ebec0d.png"
                                            alt="login form" className="img-fluid"
                                            style={{borderRadius: "1rem 0 0 1rem;", height: '100%', width: '100%'}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default isAuthenticated(Login);
