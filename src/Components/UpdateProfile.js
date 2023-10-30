import React, { useRef, useState, useEffect } from "react"
import { Button, Card, Alert, Form, Container } from "react-bootstrap"
import { useAuth, upload, addfeilds, Decoder, showuserdata } from "../Context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import SettingP from "../images/BckArw.png"


export default function UpdateProfile() {
  const car = useRef("")
  const twref = useRef("")
  const [social, setsocial] = useState()
  const { currentUser, logout } = useAuth()
  const [photo, setPhoto] = useState(null)

  const [usernameRef, setUsernameref] = useState("")
  const [socialRef, setSocialref] = useState([])
  const [carRef, setCarref] = useState("")
  
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useNavigate()
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
  
  let bar = showuserdata(currentUser.uid)
    bar.then((results) => {
      setUsernameref(results.username)
      setCarref(results.car)
      setSocialref(results.social[0])
      console.log("hello")
      
    }).catch(err=>console.log(err))

    

  function SummitVin(){
    Decoder(currentUser.uid, car.current.value)
  }

  function handleSubmit(){
    setsocial(twref.current.value);
    addfeilds(currentUser.uid, 2, social)
  }

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }
  function handleClick() {
    upload(photo, currentUser, setLoading);
  }
  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser])
/*
  function handleenter(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }
*/
  async function handleLogout() {
    setError("")
    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "120vh"}}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-start" > 
                <Link to="/">
                  <img src={SettingP} alt= "settings" style={{maxHeight: "25px"}}></img>
                </Link>
              </div>
              <h2 className="text-center mb-1">Update Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <div className="fields d-flex flex-column">
                <center>
                  <img src={photoURL} alt= "avatar" className="w-100 mt-1" style={{maxHeight: "100px", maxWidth: "100px", border: "10px", borderRadius: "5%"}}/>
                </center> 
                <div className="mt-1">
                  <input className="" style={{color: "black"}} type="file" onChange={handleChange} />
                  <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
                </div>
              </div>
              <center>
                <strong ></strong> {usernameRef}
              </center>
              <center>
                <strong ></strong> {carRef}
              </center>
              <center>
                <strong ></strong> {socialRef}
              </center>
              
              
                <div id="Twitter" style={{padding:'10px 0 5px 0'}}>
                    <center className="d-flex justify-content-center">Social Media</center>
                    <Form.Control placeholder="Social" type="Twitter" ref={twref} />
                </div>
                <button className='w-100' disabled={loading} type='enter' onClick={handleSubmit} >Update</button>

                <div id="Vin" style={{padding:'0 0 5px 0'}}>
                    <Form.Control  placeholder="bhbvygvyfytftf" ref={car} />
                </div>
                <button className='w-100' disabled={loading} type='enter' onClick={SummitVin}>Vin Submit</button>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
      </div>
      
    </Container>  
    </>
  )
}