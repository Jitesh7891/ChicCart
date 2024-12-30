import React, { useEffect, useState } from 'react'
import MyContext from './MyContext'
import { Timestamp, addDoc, collection, onSnapshot, query, orderBy, QuerySnapshot, deleteDoc, setDoc, doc, getDocs } from 'firebase/firestore';
import { fireDB } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';

const MyState = (props) => {
  
  const [mode,setMode]=useState('light');
  const [loading, setLoading] = useState(false);
  const [products,setProducts]=useState([]);
  const [users,setUsers]=useState([]);
  const [orders,setOrders]=useState([]);
  
  //toggle mode between light and dark
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

  //add product
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

  // update product
  const updateProduct = async (item) => {
    setLoading(true)
    try {
      await setDoc(doc(fireDB, "products", item.id), {...item});
      toast.success("Product Updated successfully")
      getProductData();
      setLoading(false)
    } catch (error) {
      toast.error("Product Updated Failed")
      setLoading(false)
      console.log(error)
    }
  }

  //delete product

  const deleteProduct = async (item) => {

    try {
      setLoading(true)
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success('Product Deleted successfully')
      setLoading(false)
      getProductData()
    } catch (error) {
      console.log(error)
      toast.error('Product Deleted Falied')
      setLoading(false)
    }
  }


  //get all products
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

  //get all users
  const getUserData=async()=>{
    try {
      const result=await getDocs(collection(fireDB,"users"));
      const userArray=[];
      result.forEach((doc)=>{
        userArray.push(doc.data())
      })
      setUsers(userArray)
    } catch (error) {
      console.log(error)
    }
  }

  //get all orders
  const getOrderData=async()=>{
    try {
      const result=await getDocs(collection(fireDB,'orders'));
      const orderArray=[];

      result.forEach((doc)=>orderArray.push(doc.data()))
      setOrders(orderArray)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getProductData();
    getUserData();
    getOrderData();
  },[])

  return (
    <MyContext.Provider value={{mode,toggleMode,loading,setLoading,addproduct,products,deleteProduct,updateProduct,users,orders}}>
         {props.children}
    </MyContext.Provider>
  )
}

export default MyState