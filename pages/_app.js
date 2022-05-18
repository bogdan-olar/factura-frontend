import "bootstrap/dist/css/bootstrap.css";
import '../styles/globals.css'

import { useState, useEffect } from 'react'

import Nav from "../components/layout/Nav";
import Log from "../components/log/Log"
import Bara from "../components/layout/Bara";

function MyApp({ Component, pageProps }) {

  const [logged, setLogged] = useState(false)

  console.log('Componenta app - logged state este', logged )

  function handleLogare(variabila) {
    setLogged(variabila)
  }

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  
  // useEffect( () => {
  //   fetch('http://127.0.0.1:5000/state').then( res => res.json() ).then( res => console.log( 'verifivcare state', res))
  // }, [logged])

  if( logged === false ) {
     return <Log handleLog={handleLogare} />
  }

  return <div className="main">

            <div className='nav-element'>
                <Nav />
            </div>

            <div className="body-element">
                <div className="bara-element">
                    <Bara handleLog={handleLogare} />
                </div>

                <div className="main-element">
                  <Component {...pageProps}/>
                </div>
            </div>

         </div>
}

export default MyApp

