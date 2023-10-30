import React, { useContext, useState, useEffect} from "react"
import { auth, db } from "../firebase"
import { updateProfile, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { arrayUnion, /*arrayRemove,*/ collection, query, getDocs, getDoc, setDoc, doc, updateDoc, where} from "firebase/firestore";
import axios from 'axios'
import api from '../Components/VinDecoder/nhtsa.js'

const AuthContext = React.createContext()
const storage = getStorage();

export function useAuth() {
  return useContext(AuthContext)
}
export async function checkUsernameExist(usernameRef){
  
  let exist = false
  const q = query(collection(db, "users"));
  const querySnapshot =  await getDocs(q);

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data().username);
    if(usernameRef.current.value === doc.data().username){
      exist = true
    }
  });
  console.log(exist , usernameRef.current.value)
  return exist
  
}
export async function showProfile(username){
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  let a = null
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    a = doc.data()
  });
  console.log(a)
  return a
}
export async function showuserdata(useid){
  const docRef = doc(db, "users", useid);
  const docSnap = await getDoc(docRef);
  return docSnap.data()
}
export async function makedoc (useid, email, username){
  await setDoc(doc(db, "users", useid),{
    email: email,
    username : username,
    uid: useid,
  });

}
export async function addfeilds (useid, key, value){
  try {
    
    const userRef = await doc(db, "users", useid)
    switch (key) {
      case 1:
        await updateDoc(userRef, {
          "car": value,
        });
        break;
      case 2:
        console.log(value)
        await updateDoc(userRef, {
        "social": arrayUnion(value)
        });
        break;
      default:
        break;


        /*{twitter: value[0],
          instagram: value[1],
          youtube: value[2],
          tiktok: value[3]}*/
    }
    
    
  } catch (e) {
    console.error("Error adding document: ", e);
  } 
}
export async function Decoder(useid, vin) {

    let uri = `${api.uri}${api.action}${vin}${api.format.json}`
  
      axios.get(uri)
      .then(res => {
          console.log(res.data.Results)
          addfeilds(useid, 1, res.data.Results[10].Value+res.data.Results[7].Value+res.data.Results[9].Value)
      })
      .catch(error => {
          console.error(error)
      })
    

}
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  console.log(snapshot)
  setLoading(false);
  alert("Uploaded file!");
}
export async function Download(useid){
  const fileRef = ref(storage, useid + ".png")
  const photoURL = await getDownloadURL(fileRef)

  return(photoURL)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return updatePassword(currentUser, password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)

  
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}