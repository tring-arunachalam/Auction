import React from 'react'
import '../../css/Homepagecss/Homepage.css'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import HomepageComplaints from './HomepageComplaints';
import HomepageFooter from './HomepageFooter';
import HomepageHeader from './HomepageHeader';
import HomepageTopPlayers from './HomepageTopPlayers';
import Homepagequotes from './Homepagequotes';
import HompagePlayersThoughts from './HompagePlayersThoughts';
import HomepageAbout from './HomepageAbout';
// import footballimg from '../../football.jpg'




function Homepage() {
  const arrTags=[<HomepageHeader/>,<HomepageTopPlayers/>,<Homepagequotes/>,<HompagePlayersThoughts/>,<HomepageAbout/>,<HomepageComplaints/>,<HomepageFooter/>]
    const boxVariant = {
        visible: { opacity: 1, scale: 1,x:0,transition: { duration: 1 } },
        hidden: { opacity: 0, scale: 0,x:150},
      }
    const HomepageBox=({nums})=>{
        const control = useAnimation()
        const [ref, inView] = useInView()
        useEffect(()=>{
            if(inView){
            control.start("visible");
            }
            else{
            control.start("hidden");
        }
        })

        return(
            <motion.div className='box' ref={ref} animate={control} initial="hidden" variants={boxVariant}>
                <div>{arrTags[nums]}</div>
            </motion.div>
        )
    }

  return (
    <div className='Homepage'>
       
    <HomepageBox  nums={0}/>
    <HomepageBox  nums={1}/>
    <HomepageBox  nums={2}/>
    <HomepageBox  nums={3}/>
    <HomepageBox  nums={4}/>
    <HomepageBox  nums={5}/>
    <HomepageBox  nums={6}/>
    </div>
  )
}

export default Homepage