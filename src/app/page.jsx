// Home.js

import Head from "next/head";
import DashboardSection from "./components/ui/basic/DashboardSection";
import Nav from "./components/layout/nav/Nav";
import Conversation from "./components/layout/app/conversation-panel/Conversation";
// ❌ REMOVE the following unused imports:
// import Grid from "./components/layout/app/diagram-panel/Grid"; 
// import Analysis from "./components/layout/app/diagram-panel/Analysis"; 
// import DiagramTabs from "./components/layout/app/diagram-panel/DiagramTabs";

// ✅ KEEP the only component you are rendering in the diagram area:
import DiagramPanel from "./components/layout/app/diagram-panel/DiagramPanel";


export default function Home() {
  return (
    <>
      <Head>
        <title>Analys.io</title>
        <meta name="description" content="Write a short but effective description related to this page" />

        {/* meta data for link sharing */}
        <meta property="og:title" content="title" />
        <meta property="og:description" content="Write a short but effective description related to this page" />
        <meta property="og:image" content="https://www.fsd-studio.com/LOGO-PRIMARY.png" />
        <meta property="og:url" content="https://fsd-studio.com/" />
        <meta property="og:type" content="website" />

        {/* <link rel="canonical" href="https://fsd-studio.com/" /> */}
        
        {/* Don't change */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <DashboardSection>

        <Nav links={["Conversations"]} />

        
        {/* Grid container that fills remaining space */}
        <div className="grid lg:grid-cols-7 lg:gap-6 flex-grow min-h-0 max-h-full relative">

          {/* Conversation */}
          <div className="order-1 lg:col-span-2">
            <Conversation></Conversation>
          </div>

          {/* Diagram grid */}
          <div className="lg:col-span-5 border-[2px] justify-center lg:order-2 rounded-3xl overflow-y-hidden border-black flex">
            <DiagramPanel></DiagramPanel>
          </div>
        </div>
      </DashboardSection> 			
    </>
  );
}