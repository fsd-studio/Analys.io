"use client"

import Head from "next/head";
import Conversation from "./components/components/Conversation";
import Grid from "./components/components/Grid";


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

      <div>
        {/* <Nav></Nav> */}

        {/* <HeroTextImage
          title="Dr Somogyi Krisztina"
        ></HeroTextImage>

        <ContactForm></ContactForm> */}

        
        <div className="bg-gray-100 flex flex-col h-screen py-12 px-4 overflow-hidden">
          <div className="lg:max-w-[1400px] w-full mx-auto flex flex-col h-full">

            {/* Header */}
            <div className="flex items-center pb-6 justify-between">
              <h2 className="font-primary text-5xl">Analys.io</h2>
              <div className="h-full border border-green-600 bg-green-100 aspect-square rounded-full"></div>
            </div>

            {/* Grid container that fills remaining space */}
            <div className="grid grid-cols-7 gap-8 flex-grow min-h-0">

              {/* Conversation */}
              <div className="col-span-2 border-3 rounded-4xl border-green-600 bg-green-50 flex flex-col p-3 h-full min-h-0">
                <Conversation conversation={[
                  { children: "alalalallal",
                    primary: true },
                  { children: "alalalallal",
                    primary: false },

                  ]}></Conversation>
              </div>

              {/* Diagram grid */}
              <div className="col-span-5 border-3 rounded-4xl overflow-y-hidden border-green-600 flex flex-1 h-full">
                <Grid></Grid>
              </div>
            </div>
          </div>
        </div>



        {/* <Gallery></Gallery>

        <Footer></Footer>

        <ReserveButton></ReserveButton> */}
      </div>
    </>
  );
}
