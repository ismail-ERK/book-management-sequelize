import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link, useNavigate} from "react-router-dom";
import {getPrincipal, getRoleFromPhoto} from "../metier/AuthService";
import {VARIABLE_ENVIRONEMENT} from "../consts/Consts";
import logo from '../asset/book_logo.png'
function NavbarAdmin() {
    const [changes, setChanges] = useState(0)
    const [items, setItems] = useState(<button className="btn btn-outline-success" type="submit">Logout</button>)
    const navigate = useNavigate();

    const doLogout = () => {
            localStorage.removeItem("token")
            localStorage.removeItem("refresh_token")
        navigate('/')
        setChanges(changes+1)
    }
    useEffect(()=>{
            setItems(authItems())
    },[changes])
    const authItems  = () => {
        if(localStorage.getItem("token")){
            console.log("auth")
            return <>

                <img
                    height={'50'}
                    width={'50'}
                    style={{
                        borderRadius: '50%',
                        marginLeft: '35vh',
                        cursor:'pointer'
                    }}
                    src={VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/images/users/"+getRoleFromPhoto()}
                    onClick={()=>navigate('/profile')}
                />
                <Link to={'/profile'} style={{marginLeft: '1vh', textDecoration: 'none', color: 'black', marginTop: '1vh'}}>{getPrincipal()}</Link>
                <button onClick={doLogout} style={{marginLeft: '5vw'}} className="btn btn-outline-success" type="submit">Logout</button>
               </>
        }
        else {
            console.log("not auth")

            return (
                <>
                <Link to={'/login'} className="btn btn-outline-success " style={{marginLeft: '70vh'}} type="submit">Login</Link>
                <Link to={'/register'} className="btn btn-outline-success "  style={{marginLeft: '5vh'}} type="submit">Register</Link>
            </>
                    )
        }
    }
    return (
        <nav className="d-flex navbar-light back container  mt-3">
            <div style={{display: 'flex', cursor: 'pointer'}} onClick={()=>navigate('/admin')}>
                <img src={logo} height={'50'} width={'50'} />
                <Link className="navbar-brand mt-2" to={'/admin'}>ERK Livres</Link>
            </div>
            <Link className="navbar-brand mt-2" style={{marginRight: '2vw', marginLeft: '4vw'}}  to={'/admin/editions'}>Editions</Link>
            <Link className="navbar-brand mt-2" style={{marginRight: '2vw'}}  to={'/admin/genres'}>Genres</Link>
            <Link className="navbar-brand mt-2" style={{marginRight: '2vw'}}  to={'/admin/commandes'}>Commandes</Link>
            <Link className="navbar-brand mt-2" style={{marginRight: '2vw'}}  to={'/admin/users'}>Utilisateurs</Link>
            {items}
        </nav>
    );
}

export default NavbarAdmin;