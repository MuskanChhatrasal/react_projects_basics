import React, { useState } from 'react'
import './style.css'
import RestaurantCard from './RestaurantCard';
import Menu from './menuApi';
import Navbar from './Navbar';



const uiqueCategory = [... new Set(Menu.map((currEle)=>{
   return currEle.category
})),"All",
]
const Restaurant = () => {
  const [menuData,setMenuData] = useState(Menu)
  const [menuList, setMenuList] = useState(uiqueCategory)

  const filterItem = (category)=>{
   if(category === 'All'){
     setMenuData(Menu)
     return;
   }


    const updatedList = Menu.filter((curEle)=>{
      return curEle.category === category
    })

    setMenuData(updatedList);
  }
    return (
     <>
       <Navbar filterItem={filterItem} menuList={menuList}/>
       <RestaurantCard menuData = {menuData}/>
     </>
    )
}

export default Restaurant
