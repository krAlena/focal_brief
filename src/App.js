// import logo from './logo.svg';
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
      <AnalysisTab/>
    </div>
  );
}

export default App;
