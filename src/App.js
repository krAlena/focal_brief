import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./style/header.sass";
import "./style/AnalysisTab.sass";
import "./style/default.sass";
import AppHeader from './containers/AppHeader';
import AnalysisTab from './containers/mainTabs/AnalysisTab';
import { useEffect, useState } from "react";
import { ANALYSIS_PAGE } from "./constants/routers";
import { setSupabaseSession, getTotalDaysScanning } from "./utils/supabase.ts";
import { isEmptyObj } from "./utils/globalFuncs.ts";


function App() {
  const [currentSession, setCurrentSession] = useState(null);

  useEffect(() => {
    const handleSessionMessage = (event) => {
      console.log("App Received message:", event.data);
      if (event.data?.type === "FOCAL_BRIEF_EXT_SESSION") {
        console.log("=> Session from extension:", event.data.session);
        if (!isEmptyObj(event.data.session)){
          tryToInitSBsession(event.data.session);
        }
        window.removeEventListener("message", handleSessionMessage);
      }
    };

    window.addEventListener("message", handleSessionMessage);
    return () => window.removeEventListener("message", handleSessionMessage);
  }, []);

  async function tryToInitSBsession(session) {
    let initedSession = await setSupabaseSession(session?.session?.access_token, session?.session?.refresh_token);
    if (initedSession?.session == null && initedSession?.user == null){
      setCurrentSession(null);
    }
    else {
      setCurrentSession(initedSession);
      let result = await getTotalDaysScanning(initedSession.user.id);
      console.log("Total days scanning CHECK:", result);
    }
  }

  return (
    <div className="App">
      <AppHeader/>
      <BrowserRouter>
        <Routes>
          <Route path={ANALYSIS_PAGE} element={<AnalysisTab/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
