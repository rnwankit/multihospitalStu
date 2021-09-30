import './App.css';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Home from './Container/Home';
import { Switch, Route, Redirect } from "react-router-dom";
import Departments from './Container/Departments';
import Doctors from './Container/Doctors';
import About from './Container/About';
import Contact from './Container/Contact';
import Login from './Container/Login';
import Medicine from './Container/Medicine';
import AddMedicine from './Container/AddMedicine';
import AddAppointment from './Container/AddAppointment';
import ListAppointment from './Container/ListAppointment';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/departments" component={Departments} />
        <Route path="/doctors" component={Doctors} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/add_appointment" component={AddAppointment} />
        <Route path="/list_appointment" component={ListAppointment} />
        <Route path="/login" component={Login} />
        <Route path="/medicine" component={Medicine} />
        <Route path="/addmedicine" component={AddMedicine} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
