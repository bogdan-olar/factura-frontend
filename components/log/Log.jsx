
import { useState } from 'react'

import LogIn from "./LogIn"
import NewAccount from './NewAccount'

function Log( {handleLog} ) {

    const [starea, setStarea] = useState('login')

    function handleLogIn() {
        setStarea('cont')
    }
    function handleCreateAccount() {
        setStarea('login')
    }

    if( starea === 'login' ) {

        return(
            <div>
                <LogIn handleLogIn={handleLogIn} handleLog={handleLog} />
            </div>
        )
    }

        return(
            <div>
                <NewAccount handleCreateAccount={handleCreateAccount} />
            </div>
        )

}

export default Log