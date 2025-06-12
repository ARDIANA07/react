import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const MainLayout = ({children}) =>{
    return (
        <div>
            <Header/>
            <Navbar/>
            <div className="container">
                <main >
                    {children}
                </main>
            </div>
        </div>
    )
}

export default MainLayout