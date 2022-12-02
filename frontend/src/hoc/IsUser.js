import React from 'react'
import {getRoleFromToken, verifyIfTokenExists} from "../metier/AuthService";
import {Navigate} from "react-router-dom";

const isUser = WrappedComponent => {
    class HOC extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                auth: null
            }
        }
        componentWillMount() {
            if(!verifyIfTokenExists()){

                this.setState({
                    ...this.state,
                    auth: <Navigate to={'/login'}  />
                })
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

export default isUser;
