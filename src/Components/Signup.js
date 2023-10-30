import React, {useRef, useState} from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth, makedoc, checkUsernameExist } from '../Context/AuthContext'
import { Link, useNavigate } from "react-router-dom"
import { auth } from '../firebase'



export default function Signup() {
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  const [exist, setExist] = useState()

  async function handleSubmit(e) { 
    let bar = checkUsernameExist(usernameRef)
    
    bar.then((results) => {
      setExist(results)
      
    }).catch(err=>console.log(err))

    console.log("wow", exist)
   
    e.preventDefault()
    if (usernameRef.current.value.includes(" ")) {
      return setError("Username cant contain spaces")
    }

  
    if (exist === true){
      return setError("Username already in username")
    }
    
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
    
    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      await makedoc(auth.lastNotifiedUid, emailRef.current.value, usernameRef.current.value)
      navigate("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }


    return (
        <>
          <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "120vh"}}>
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="username" style={{padding:'0 0 20px 0'}}>
                            
                            <Form.Control placeholder='Username' type="username" ref={usernameRef} required />
                        </Form.Group>
                        <Form.Group id="email" style={{padding:'0 0 20px 0'}}>
                            <Form.Control placeholder='Email' type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password" style={{padding:'0 0 20px 0'}}>
                            <Form.Control placeholder='Password' type="password" ref={passwordRef} autoComplete="on" required />
                        </Form.Group>
                        <Form.Group id="password-confirm" style={{padding:'0 0 20px 0'}}>
                            <Form.Control placeholder='Confirm Password' type="password" ref={passwordConfirmRef} autoComplete="on" required />
                        </Form.Group>
                        <Button disabled={loading} className='w-100' type='submit' style={{background: "linear-gradient(#00C2FF, #0014C6) "}}>Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2"style={{color: 'white'}}>
              Already have an account? <Link to="/login">Log In</Link>
            </div>
          </div>
        </Container>  
        </>
  )
}
