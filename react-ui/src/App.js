import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
//
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';

import Home from './components/Home';
import Login from './components/Login';
import Confirmation from './components/Confirmation'
import Registration from './components/Registration';
import SearchPatient from './components/nurse/SearchPatient';
import InsertPatientVital from './components/nurse/InsertPatientVital';
import DetailPatientInfo from './components/nurse/DetailPatientInfo';
import CreateEmergencyAlert from './components/patient/CreateEmergencyAlert';
import EmergencyAlertListAll from './components/nurse/EmergencyAlertList';
import CreateDailyRecord from './components/patient/CreateDailyRecord';
import DailyRecordList from './components/nurse/DailyRecordList';
import TryExercises from './components/patient/TryExercises';
import CheckSymptoms from './components/patient/CheckSymptoms';
import AddSymptoms from './components/patient/AddSymptoms';
import ViewTreatment from './components/patient/ViewTreatment';

import Logo from './logo.png';

import axios from 'axios';
import ShowEmergencyAlert from './components/patient/ShowEmergencyAlert';
import ShowRecordList from './components/patient/ShowRecordList';

//
function App() {
  const [screen, setScreen] = useState('auth');

  //check if the user already logged-in
  const readCookie = async () => {
    try {
      console.log('--- in readCookie function ---');

      //
      const res = await axios.get('/read_cookie');
      // 
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen)
      }
    } catch (e) {
      setScreen('auth');
      console.log(e);
    }
  };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []); //only the first render

  const deleteCookie = async () => {
    console.log("deleteCookie>>>>>>");

    try {
      await axios.get('/signout');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <div><img className="logo" src={Logo} alt='website logo'></img></div>
            <Nav.Link href="/home">Home</Nav.Link>

            {screen === 'auth'
              ?
              <Nav.Link href="/login">Login</Nav.Link>
              :
              <Nav.Link href="/home" onClick={deleteCookie}>Logout</Nav.Link>
            }

            {screen === 'nurse'
              ?
                <Nav.Link href="/searchPatient">Search Patient</Nav.Link>

              : <idv></idv>
            }

            {screen === 'nurse'
              ?
                <Nav.Link href="/emergencies">Emergency Alert</Nav.Link>

              : <idv></idv>
            }

            {screen === 'patient'
              ?
              <Nav.Link href="/tryExercises">Try Exercises</Nav.Link>
              :<idv></idv>
            }
            {screen === 'patient'
              ?
              <Nav.Link href="/checkSymptoms">Check Symptoms</Nav.Link>
              :<idv></idv>
              // <Nav.Link href="/addSymptoms"> Symptoms</Nav.Link>
            }
            {/* {screen === 'patient'
              ?
              <Nav.Link href="/viewTreatment">View Treatment</Nav.Link>
              :
              <idv></idv>
            } */}

          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div>
        <Route render={() => < Home />} path="/home" />
        <Route render={() => < Login />} path="/login" />
        <Route render={() => < Registration />} path="/registration" />
        <Route render={() => < SearchPatient />} path="/searchPatient" />
        <Route render={() => < InsertPatientVital />} path="/savePatientVital/:id" />
        <Route render={() => < DetailPatientInfo />} path="/detailPatientInfo/:id" />
        <Route render={() => < CreateEmergencyAlert />} path="/createEmergency/:email" />
        <Route render={() => <EmergencyAlertListAll />} path="/emergencies" />
        <Route render={() => < CreateDailyRecord />} path="/createDailyRecord/:email" />
        <Route render={() => <DailyRecordList />} path="/dailyrecords" />
        <Route render={() => < TryExercises />} path="/tryExercises" />
        <Route render={() => < CheckSymptoms />} path="/checkSymptoms"/>
        <Route render={() => < AddSymptoms />} path="/addSymptoms"/>
        <Route render={() => < ViewTreatment />} path="/viewTreatment"/>
        <Route render={() => < ShowEmergencyAlert />} path="/showEmergency/:id" />
        <Route render={() => <ShowRecordList />} path="/dailyrecordlist/:email" />
        <Route render={() => < Confirmation />} path="/confirmation" />
        

      </div>

    </Router>


  );
}

export default App;
