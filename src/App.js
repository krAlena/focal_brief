import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./style/header.sass";
import "./style/AnalysisTab.sass";
import "./style/default.sass";
import AppHeader from './containers/AppHeader';
import AnalysisTab from './containers/mainTabs/AnalysisTab';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnalysisTab/>}/>
          <Route path="/analysis" element={<AnalysisTab/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
