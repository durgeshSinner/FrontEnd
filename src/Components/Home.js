import React from 'react'
import Categoriesbar from './Categoriesbar'
import WheelofFortune from './WheelofFortune'
import { Categoriesdata } from '../App'


export default function Home() {

  return (
    <>
      <Categoriesdata.Consumer>{
        data => { return  <Categoriesbar categories={data} />
        }
      }
      </Categoriesdata.Consumer>
      <div style={{height : "50px"}}></div>

      <WheelofFortune />
      
    </>

  )
}
