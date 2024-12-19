import logo from './logo.svg';
import './App.css';
import Nav from './Compunent/Nav/Nav';
import Welcome from './Compunent/Welcome/Welcome';
import About from './Compunent/About/About';
import Buy from './Compunent/Buy/Buy';
import Collection from './Compunent/Collection/Collection';
import Allocation from './Compunent/Allocation/Allocation';
import Roadmap from './Compunent/Roadmap/Roadmap';
import Community from './Compunent/Community/Community';
import Footer from './Compunent/Footer/Footer';

function App() {
  return (
    <div className="App">
<Nav/>
<Welcome/>
<About  />
<Buy  />
<Collection  />
<Allocation  />
<Roadmap  />
<Community  />
<Footer  />
    </div>
  );
}

export default App;
