import { useLocation } from 'react-router-dom';
import './App.css';
import {About, Detail, Form, Home, Landing} from './views';
import {Route} from 'react-router-dom'
import ThreeDotsMenu from './components/ThreeDotsMenu/ThreeDotsMenu';

function App() {
  const location = useLocation();
  return (
    <div className="App">

    {location.pathname !== "/"  && <ThreeDotsMenu/>}
    <Route exact path="/" component={Landing}/>
    <Route path="/home" component={Home}/>
    <Route path="/detail/:id" component={Detail}/>
    <Route path="/create" component={Form}/> 
    <Route path="/about" component={About}/>
    
      
      
    </div>
    
  );
}


export default App;
