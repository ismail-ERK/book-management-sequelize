import React from 'react'

import {Navigate} from "react-router-dom";
import {getRoleFromToken, verifyIfTokenExists} from "../metier/AuthService";
const isAuthenticated = WrappedComponent => {
    class HOC extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                auth: null
            }
        }
        componentWillMount() {
            if (verifyIfTokenExists()) {
                console.log("authenticated")
                console.log(getRoleFromToken())
                console.log(getRoleFromToken()==="USER")

                if (getRoleFromToken()==="ADMIN") {
                    console.log("admin")

                    this.setState({
                        ...this.state,
                        auth: <Navigate to={'/admin'}/>
                    })
                }
                if (getRoleFromToken()==="USER") {
                    console.log("user")

                    this.setState({
                        ...this.state,
                        auth: <Navigate to={'/'}/>
                    })
                }
            }

        }
        render() {
            return <>
                {this.state.auth}
                <WrappedComponent />
            </>
        }
    }
    return HOC
}

export default isAuthenticated;
