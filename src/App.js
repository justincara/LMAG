import logo from './logo.svg';
import './App.css';
import Nav from './Compunent/Nav/Nav';
import Welcome from './Compunent/Welcome/Welcome';
import About from './Compunent/About/About';
import Buy from './Compunent/Buy/Buy';
import Collection from './Compunent/Collection/Collection';
import Allocation from './Compunent/Allocation/Allocation';

function App() {
  return (
    <div className="App">
<Nav/>
<Welcome/>
<About  />
<Buy  />
<Collection  />
<Allocation  />
    </div>
  );
}

export default App;
