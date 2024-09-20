"use client"

import React from 'react'
import Toggle from './toggle';



const ToggleManager = ({values , setValues} : {values : Toggle[] , setValues : Function}) => {

    const handleClick = (id :string) => {

        const cpv = values.map((v , i)=>{
            if(v.id === id){
                return {name : v.name , id : v.id , value : !v.value}
            }
            return v;
        });

        console.log(cpv);
        
        setValues([...cpv]);
    }

  return (
    <div className='flex flex-wrap w-full px-5 justify-center items-center gap-3'>

        {
            values.map((v,i)=><Toggle key={i} metadata={v} onClick={()=>handleClick(v.id)}/>)
        }

    </div>
  )
}

export default ToggleManager;