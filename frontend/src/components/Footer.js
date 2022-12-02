import React from 'react';

function Footer(props) {
    return (
        <footer className="text-center text-white" style={{backgroundColor: "black", position:"absolute", top: '94%', width:'100%'}}>


            <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2);"}}>
                © 2022 Copyright:
                <a className="text-white" href="https://github.com/ismail-ERK">ERROUK Ismail</a>
            </div>
        </footer>
    );
}

export default Footer;