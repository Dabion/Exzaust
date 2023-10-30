import BrandNameWhite from "../images/BrandNameWhite.png"
import Dabion from "../images/Dabion.png"
import "../Style.css"
export default function Home(){

    return(
        <>
            <section className="banner" id="home">
            <div id="set-height"></div>
                    <div className="header">
                        <h1><img src={BrandNameWhite} alt="EXZA" width="300" height="75"></img></h1>
                    </div>
                    
            <script src="sticky.js"></script>
        
            </section>
            <section className="sec" id="team">
                    <div className="container">
                        <div className="card" id="redteam">
                            <div className="content">
                                <h2>Dabion</h2>
                                <p> 
                                1993 Mazda RX7</p>
                            </div>
                            <img alt = "no imgage" src={Dabion} width="300" height="300"></img>
                        </div>
                    </div>
                </section>
            
                
            
        </>
    )
        


    
}