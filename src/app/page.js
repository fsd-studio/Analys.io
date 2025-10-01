"use client"

import Head from "next/head";
import { Nav } from "./components";
import Conversation from "./components/components/Conversation";
import Grid from "./components/components/Grid";
import DashboardSection from "./components/ui/DashboardSection";


export default function Home() {

  return (
    <>
      <Head>
        <title>Veh Kristina</title>
        <meta name="description" content="Write a short but effective description related to this page" />

        {/* meta data for link sharing */}
        <meta property="og:title" content="title" />
        <meta property="og:description" content="Write a short but effective description related to this page" />
        <meta property="og:image" content="https://www.fsd-studio.com/LOGO-PRIMARY.png" />
        <meta property="og:url" content="https://fsd-studio.com/" />
        <meta property="og:type" content="website" />

        

        {/* This will define the prefered site version to avoide duplicate content
            
            Example:  https://fsd-studio.com/ and https://fsd-studio.com/#about will both show up in results. 
            
            canonical defines which link is prefered.
        */}

        {/* <link rel="canonical" href="https://fsd-studio.com/" /> */}
       
        {/* Don't change */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <DashboardSection>

        <Nav></Nav>

        

        {/* Grid container that fills remaining space */}
        <div className="grid lg:grid-cols-7 lg:gap-6 flex-grow min-h-0 max-h-full relative">

          {/* Conversation */}
          <div className="order-1 lg:col-span-2">
            <Conversation></Conversation>
          </div>

          {/* Diagram grid */}
          <div className="lg:col-span-5 border-[2px] lg:order-2 rounded-3xl overflow-y-hidden border-black flex">
            <Grid></Grid>
          </div>
        </div>
      </DashboardSection>        
    </>
  );
}
