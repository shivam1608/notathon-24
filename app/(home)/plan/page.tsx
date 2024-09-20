"use client"

import ToggleManager from '@/app/_components/toggle_manager';
import React, { FormEvent, useEffect, useState } from 'react'
import axios from "axios";
import toast from 'react-hot-toast';



const Plan = () => {

    const [extra , setExtra] = useState<string>("");

    const [data , setData] = useState<any>(null);

    
    useEffect(()=>{
        
    } , []);
    
    const [values , setValues] = useState<Toggle[]>([
        {name : "💪 Gym" , value : false , id : "gym"},
        {name : "🏫 School/College" , value : false , id : "school"},
        {name : "🏓 Hobby" , value : false ,  id : "hobby"},
        {name:"🍕 Food", value: false ,id: "food" },
        {name:"💅 Selfcare" , value: false, id: "selfcare"},
        {name:"✈️ Vacation", value :false, id: "vacation"},
        {name:"👨‍👩‍👧‍👦 Family time", value :false, id: "familytime"},
        {name:"🎮 Gaming", value :false, id: "gaming"},
        {name:"🧘 Meditation", value :false, id: "meditation"},
        {name:"🥘 Cooking", value :false, id: "cooking"},
        {name:"🎲 Entertainment", value :false, id: "entertainment"},
    ]);
    
    const [genders , setGenders] = useState<Toggle[]>([
        {name : "👨 Male" , value : false , id : "male"},
        {name : "🐑 Female" , value : false , id : "female"},
    ]);
    
    const onSubmit = async (e : FormEvent) => {

        toast('Generating',
            {
              icon: '🍞',
              style: {
                borderRadius: '10px',
                background: '#232323',
                color: '#fff',
              },
            }
          );

        const activities = values.filter((v=>v.value===true)).map(v=>v.name);
        const genders = values.filter((v=>v.value===true)).map(v=>v.name);
        

        try{
            let res = await axios.post("/api/plan" , {
                extra : extra,
                activities : activities.toString(),
                gender : genders.toString()
            });

            if(!res.data.response.time_table){
                    res = await axios.post("/api/plan" , {
                    extra : extra,
                    activities : activities.toString(),
                    gender : genders.toString()
                })
            }
            setData(res.data.response);

        }catch(e){
            console.log(e);
            toast.error("Error Generating" ,{
                icon: '❌',
                style: {
                  borderRadius: '10px',
                  background: '#232323',
                  color: '#fff',
                },
              })
        }
    }

    return (
        <>
        
        {

            data ? <>
            
            <div className="flex flex-col items-center justify-center">
                <h1 className='text-3xl my-5'>Your Personalized Routine</h1>

                <div className="flex flex-col">
                {
                   Object.keys(data.time_table).map((v , i)=>{

                    

                    return (
                        <div className="flex justify-between p-2 w-full space-x-8">
                            <span className='text-[#5dbfbf] text-xl font-bold'>{v}</span>
                            <span>{data.time_table[v]}</span>
                        </div>
                    )
                   })   
                }
                </div>



                <h1 className='text-3xl my-5'>Suggested To-Do List</h1>

                <div className="flex w-1/2 mb-10">
                    <ul className="list-disc">
                        {
                            data.todo_list.map((v : string , i : number)=><li key={i}>{v}</li>)
                        }
                    </ul>
                </div>
            </div>

            </> : 

            <>
            <div className='flex flex-col items-center justify-center'>

                <h1 className='text-5xl uppercase my-10'><span className='underline hover:text-white transition-all duration-300 text-[#5dbfbf] font-bold'>Plan</span> your day.</h1>

                <div className="flex justify-center items-center w-full flex-col">
                    <span className='mt-4 mb-2'>Choose your gender</span>
                    <div className="w-96">
                    <ToggleManager values={genders} setValues={setGenders} />
                    </div>
                </div>

                <span className='text-gray-200 mt-4 mb-2'>Choose what things you want to include in your routine</span>
                <ToggleManager values={values} setValues={setValues} />

                <div className="flex flex-col w-1/2 mt-10">
                    <label htmlFor="extra" className='text-gray-200'>Anything extra you want to add to your routine</label>
                    <textarea onChange={(e)=>setExtra(e.target.value)} value={extra} rows={5} className='px-5 py-3 outline-none rounded-md text-base bg-[#232323] mt-1' placeholder='I want to go to a birthday party' />
                </div>



                <button onClick={onSubmit} className='bg-[#5dbfbf] rounded-lg px-4 py-2 text-xl font-bold my-5 hover:bg-transparent border border-[#5dbfbf] transition-all duration-300 '>👍Generate</button>
                </div>
            </>
        }

        </>
  )
}

export default Plan;