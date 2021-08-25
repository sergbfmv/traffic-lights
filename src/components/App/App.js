import './App.css'
import { Redirect, Route, Switch } from 'react-router-dom';
import TrafficLights from '../TrafficLights/TrafficLights'
import React from 'react';

function App() {
  const [redOn, SetRedOn] = React.useState(true)
  const [yellowOn, SetYellowOn] = React.useState(true)
  const [greenOn, SetGreenOn] = React.useState(true)

  const [fromRedToYellow, setFromRedToYellow] = React.useState(false)
  const [fromYellowToGreen, setFromYellowToGreen] = React.useState(false)
  const [fromGreenToYellow, setFromGreenToYellow] = React.useState(false)
  const [fromYellowToRed, setFromYellowToRed] = React.useState(false)
  const [fromGreen, setFromGreen] = React.useState(false);
  const [test, setTest] = React.useState('');
  let timer;


  /*React.useEffect(() => {
    console.log('effect')
    const link = window.location;
    console.log(link.pathname)
    if (link.pathname === '/red') {
      console.log('red')
      const timer = setTimeout(() => {
        setFromRedToYellow(true)
        setFromGreen(false);
        setFromYellowToGreen(false)
        setFromGreenToYellow(false)
        setFromYellowToRed(false)
      }, 10000)
      
    } else if (link.pathname === '/yellow') {
      console.log('yellow')
      if (fromGreen) {
        const timer = setTimeout(() => {
          setFromYellowToRed(true)
          setFromRedToYellow(false);
          setFromYellowToGreen(false)
          setFromGreenToYellow(false)
          setFromGreen(false)
        }, 3000)
        return () => clearTimeout(timer);
      } else {
        console.log('1111111')
        console.log('test2')
        const timer = setTimeout(() => {
          console.log('test22')
          setFromRedToYellow(false)
          setFromYellowToGreen(true)
          setFromGreenToYellow(false)
          setFromYellowToRed(false)
          setFromGreen(false)
        }, 3000)
        return () => clearTimeout(timer);
      }
    } else if (link.pathname === '/green') {
      console.log('green')
      const timer = setTimeout(() => {
        setFromGreen(true)
        setFromRedToYellow(false)
        setFromYellowToGreen(false)
        setFromGreenToYellow(true)
        setFromYellowToRed(false)
      }, 15000)
      return () => clearTimeout(timer);
    }
  })*/
  
  function fromRtoY() {
    timer = setTimeout(() => {
      console.log('/red 6000')
      setFromRedToYellow(true)
      setTest('1')
      setFromGreen(false);
      setFromYellowToGreen(false)
      setFromGreenToYellow(false)
      setFromYellowToRed(false)
      if (localStorage.getItem('green')) {
        localStorage.removeItem('green')
      }
    }, 6000);
  }

  function fromYtoG() {
    timer = setTimeout(() => {
      setFromRedToYellow(false)
      setFromYellowToGreen(true)
      setTest('2')
      setFromGreenToYellow(false)
      setFromYellowToRed(false)
      setFromGreen(false)
    }, 2000)
  }

  function fromGtoY () {
    timer = setTimeout(() => {
      console.log('/green 8000')
      setFromGreen(true)
      setTest('3')
      localStorage.setItem('green', true)
      setFromRedToYellow(false)
      setFromYellowToGreen(false)
      setFromGreenToYellow(true)
      setFromYellowToRed(false)
    }, 8000);
  }

  function fromYtoR() {
    timer = setTimeout(() => {
      setFromYellowToRed(true)
      setTest('4')
      setFromRedToYellow(false);
      setFromYellowToGreen(false)
      setFromGreenToYellow(false)
      setFromGreen(false)
      localStorage.removeItem('green')
    }, 2000);
  }

  React.useEffect(() => {
    const path = window.location.pathname;
    const green = localStorage.getItem('green')
    console.log(green)
    if (path === '/red') {
      fromRtoY();
    } else if (path === '/yellow' && green === null) {
      fromYtoG();
    } else if (path === '/yellow' || green) {
      fromYtoR();
    } else if (path === '/green') {
      fromGtoY();
    } else {
      console.log('ERROR')
    }
    return () => {
      clearTimeout(timer);
      console.log(clearTimeout(timer))
    }
  }, [test])
  

  return (
    <div className="page">
      <main className="main">
        <Switch>
          <Route path='/red'>
            {fromRedToYellow ? <Redirect to="/yellow" /> : <TrafficLights redOn={redOn} />}
          </Route>
          <Route path='/yellow'>
            {fromYellowToGreen ? <Redirect to='/green' /> : (fromYellowToRed ? <Redirect to='/red' /> : <TrafficLights yellowOn={yellowOn} />)}
          </Route>
          <Route path='/green'>
          {fromGreenToYellow ? <Redirect to="/yellow" /> : <TrafficLights greenOn={greenOn} />}
          </Route>
          <Route path="/" >
            <Redirect to='/red' />
          </Route>
        </Switch>
      </main>
    </div>
  )
}

export default App;