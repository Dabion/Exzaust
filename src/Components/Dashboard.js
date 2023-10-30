import React, { useEffect, useState } from "react"
import { Card, Alert, Container } from "react-bootstrap"
import { Download, showProfile, showuserdata, useAuth } from "../Context/AuthContext"
import { Link } from "react-router-dom"
import { QRCode } from 'react-qrcode-logo'
import SettingP from "../images/Gear.png"





export default function Dashboard() {
  const { currentUser } = useAuth()
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png")
  const [error] = useState("")
  const [back] = useState('white')
  const [fore] = useState('black')
  const [size] = useState(250)

  
  const [usernameRef, setUsernameref] = useState("")
  const [useidRef, setUseidref] = useState("")
  const [carRef, setCarref] = useState("")
  const [twRef, setTwref] = useState("EXZA_ust")
  const [igRef, setIgref] = useState("EXZA_ust")
  const [ytRef, setYtref] = useState("channel/UCyDgU9oY2Ko4aJV0b0xrDGQ")
  const [ttRef, setTtref] = useState("dabioncouch")
  const pathname = window.location.pathname.substring(1)


  if(currentUser !== null && pathname === ""){
    let bar = showuserdata(currentUser.uid)
    bar.then((results) => {
      setUsernameref(results.username)
      setUseidref(results.uid)
      setCarref(results.car)
      setTwref(results.socialmedia.twitter)
      setIgref(results.socialmedia.instagram)
      setYtref(results.socialmedia.youtube)
      setTtref(results.socialmedia.tiktok) 
    }).catch(err=>console.log(err))
  }else{
    let bar = showProfile(pathname)
    bar.then((results) => {
      setUsernameref(results.username)
      setUseidref(results.uid)
      setCarref(results.car)
      setTwref(results.socialmedia.twitter)
      setIgref(results.socialmedia.instagram)
      setYtref(results.socialmedia.youtube)
      setTtref(results.socialmedia.tiktok)
    }).catch(err=>console.log(err))
    
  }

  

  let img = Download(useidRef)
  img.then((results) => {
      setPhotoURL(results)
  }).catch(err=>console.log(err+"heelo"))
  
 

  
  
  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser])
  
  
  
 
  


  if(currentUser !== null &&(useidRef === currentUser.uid || "" === pathname) ){
    return (
      <>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "120vh"}}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="d-flex justify-content-end" > 
              <Link to="/UpdateProfile">
                <img src={SettingP} alt= "settings" style={{maxHeight: "25px"}}></img>
              </Link>
            </div>
            <div className="d-flex flex-column justify-content-center">
              <center>
                <img src={photoURL} width="200" height="200" alt= "avatar" className="mt-2" style={{ order: "10px", borderRadius: "0%"}}/>
              </center>
              <center>
                <strong ></strong> {usernameRef}
              </center>
              <center style={{padding:"3px 5px 5px 5px"}}>
                <strong ></strong> {carRef}
              </center >
              <center style={{padding:"10px 5px 5px 5px"}}>
                <QRCode 
                  title="EXZAQR"
                  renderAs="canvas"
                  value={"http://www.Exzaust.com/"+usernameRef}
                  bgColor={back}
                  fgColor={fore}
                  size= {size}
                  qrStyle="square"
                />
              </center> 
              <div className="d-flex justify-content-evenly">
                <a style={{fontSize: "40px"}} href={"http://www.twitter.com/"+twRef} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                <a style={{fontSize: "40px"}} href={"http://www.instagram.com/"+igRef} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                <a style={{fontSize: "40px"}} href={"http://www.youtube.com/"+ytRef} target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
                <a style={{fontSize: "40px"}} href={"http://tiktok.com/@"+ttRef} target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
              </div>
            </div>
          </Card.Body>
        </Card>
        </div>
        </Container>
      </>
    )
  } else if(usernameRef !== ""){
    return(
      <>
        <Card>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="d-flex flex-column justify-content-center">
              <center>
                <img src={photoURL} alt= "avatar" className="w-100 mt-2" style={{maxHeight: "100px", maxWidth: "100px", border: "10px", borderRadius: "5%"}}/>
              </center>
              <center>
                <strong ></strong> {usernameRef}
              </center>
              <center style={{padding:"3px 5px 5px 5px"}}>
                <strong ></strong> {carRef}
              </center >
              <div className="d-flex justify-content-evenly">
                <a style={{fontSize: "40px"}} href={"http://www.twitter.com/"+twRef} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                <a style={{fontSize: "40px"}} href={"http://www.instagram.com/"+igRef} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                <a style={{fontSize: "40px"}} href={"http://www.youtube.com/"+ytRef} target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
                <a style={{fontSize: "40px"}} href={"http://tiktok.com/@"+ttRef} target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
              </div>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-4"style={{color: 'white'}}>
              Create your EXZAUST account <Link to="/Signup">here.</Link>
        </div>
        
      </>
    )
  }
  else{
    return(
      <>
        <Card>
          <Card.Body>
            <div>"Page Does Not Exist"</div>
          </Card.Body>
        </Card>
      </>
    )
  }

    

}