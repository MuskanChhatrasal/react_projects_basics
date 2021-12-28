import React, { useState, useEffect } from 'react'
import './style.css'

const getLocalData = ()=>{
   const lists =  localStorage.getItem("mytodo");
   if(lists){
       return JSON.parse(lists)
   }else{
       return [];
   }
}


const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [itemList, setItemList] = useState(getLocalData());
    const [editItem, setEditItem] = useState("");
    const [toggleBtn, setToggleBtn] = useState(false)

    const displayItems = ()=>{
        if(!inputData){
            alert('Please enter data')
        }else if(inputData && toggleBtn){
            setItemList(
                itemList.map((currEle)=>{
                    if(currEle.id === editItem){
                        return {...currEle,name: inputData}
                    }
                    return currEle;
                })
            )
            setEditItem(null);
            setInputData("");
            setToggleBtn(false);
        }
        else{
           const myNewInputData = {
               id: new Date().getTime().toString(),
               name: inputData,
           }
           setItemList([...itemList,myNewInputData]);
           setInputData("");
        }
    }

    const editList = (index)=>{
        const edited_item = itemList.find((curEle)=>{
            return curEle.id === index;
        });

        setInputData(edited_item.name);
        setEditItem(index);
        setToggleBtn(true);
    }

    const updatedList = (index)=>{
        const fliteredList = itemList.filter((curEle)=>{
            return curEle.id !== index
        })
        setItemList(fliteredList);
    }

    const deleteAll = ()=>{
        setItemList([]);
    }

    useEffect(() => {
        localStorage.setItem("mytodo",JSON.stringify(itemList));
    }, [itemList])

    return (
        <>
            <div className='main-div'>
               <div className='child-div'>
                 <figure>
                     <img src='images\todo.svg' alt='todologo'></img>
                     <figcaption>Add Your List Here ✌</figcaption>
                 </figure>
                 <div className='addItems'>
                   <input type='text' placeholder='✍ Add Item' className='form-control' 
                   value={inputData} onChange={(event)=>setInputData(event.target.value)}></input>
                   {toggleBtn ? <i className="far fa-edit add-btn" onClick={displayItems}></i> : 
                   <i className="fa fa-plus add-btn" onClick={displayItems}></i>}
                 </div>
                 <div className='showItems'>
                    {itemList.map((curItem)=>{
                        return (
                            <>
                            <div className='eachItem' key={curItem.id}>
                             <h3>{curItem.name}</h3>
                             <div className='todo-btn'>
                                <i className="far fa-edit add-btn" onClick={()=>editList(curItem.id)}></i>
                               <i className="far fa-trash-alt add-btn" onClick={()=>updatedList(curItem.id)}></i>
                            </div>
                            </div>
                           </>
                        )
                    })}
                 </div>
                 <div className='showItems'></div>
                 <button className="btn effect04" data-sm-link-text="Remove All" onClick={deleteAll}>
                     <span>CHECK LIST</span>
                 </button>
               </div>
            </div>
        </>
    )
}

export default Todo
