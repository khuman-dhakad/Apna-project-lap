
import { useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { getLaptops } from '../services/api';
export const useProducts=()=>{
 const {state,dispatch}=useApp();
 useEffect(()=>{
  const load=async()=>{
   dispatch({type:'SET_LOADING',payload:true});
   try{
    const res=await getLaptops();
    dispatch({type:'SET_PRODUCTS',payload:res.data||[]});
   }catch(e){console.error(e);}
   dispatch({type:'SET_LOADING',payload:false});
  };
  load();
 },[dispatch]);
 return {products:state.products,filteredProducts:state.products,isLoading:state.isLoading};
};
