import React, { useEffect, useState } from 'react'
import MyContext from './MyContext'
import { Timestamp, addDoc, collection, onSnapshot, query, orderBy, QuerySnapshot } from 'firebase/firestore';
import { fireDB } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';

const MyState = (props) => {
  
  const [mode,setMode]=useState('light');
  const [loading, setLoading] = useState(false);

  const toggleMode=()=> {
    if(mode=='light'){
        setMode('dark')
        document.body.style.backgroundColor="rgb(17,24,39)"
    }
    else{
        setMode('light')
        document.body.style.backgroundColor="white"
    }
  }

  const addproduct=async(productPara)=>{

    const productRef=collection(fireDB,"products")
    setLoading(true)

    try{
      await addDoc(productRef, {
        ...productPara,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-us", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }),
    });
      toast.success("Product added successfully");
      await getProductData();
      setLoading(false);
    }
    catch(error){
      console.log(error);
      setLoading(false);
    }
  }

  const [_,setProducts]=useState([]);

  const getProductData=async()=>{
    setLoading(true);

    try{
      const queryResult=query(
        collection(fireDB,"products"),
        orderBy("time")
      )

      const data=onSnapshot(queryResult,(QuerySnapshot)=>{
        let productsArray=[];
        QuerySnapshot.forEach((doc)=>{
          productsArray.push({...doc.data(),id:doc.id})
        })
        setProducts(productsArray)
            // Log products after each update
            // console.log("Fetched products: ", productsArray);
        setLoading(false)
      }

    );
      return()=>data;
    }catch(error){
      setLoading(false);
      console.log(error)
    }
  }

  useEffect(()=>{
    getProductData();
  },[])

  return (
    <MyContext.Provider value={{mode,toggleMode,loading,setLoading,addproduct}}>
         {props.children}
    </MyContext.Provider>
  )
}

export default MyState