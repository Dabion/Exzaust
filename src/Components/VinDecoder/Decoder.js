import { useEffect } from "react"

import { addfeilds } from "../../Context/AuthContext"



import axios from 'axios'
import api from './nhtsa.js'




export async function Decoder(vin) {
    
    let uri = `${api.uri}${api.action}${vin}${api.format.json}`
    useEffect(()=> {
        axios.get(uri)
        .then(res => {
            console.log(res.data.Results)
            addfeilds('5UkMDJrwoIdFptL2aIin8Vfs6KI3', res.data.Results[7].Value, "","","","")
            
        })
        .catch(error => {
            console.error(error)
        })
        
  })
}


  