import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'

const HomePageLayout = (props) => {
    return(
        <div className="full-height">
            <Header {...props}/>
            {props.children}
            <Footer />
        </div>
    )
}

export default HomePageLayout