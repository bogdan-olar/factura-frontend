import React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Head from "next/head"

function Clients(props) {

    console.log(props)

    const [ clienti, setClienti] = useState(props.data)
    const [ count, setCount ] = useState(0)


    function handleDelete(id) {
         fetch('http://bogdanolar.pythonanywhere.com/client/delete', {
             method: 'DELETE',
             headers: { 'Content-type': 'application/json' },
             body: JSON.stringify({ i: id })
         }).then( res => res.json() ).then( res => setCount( c => c + 1 ))
    }

    useEffect( () => {
            fetch('http://bogdanolar.pythonanywhere.com/clients').then( res => res.json() ).then( date => setClienti(date) ).catch( err => console.log(err) )
    }, [count])


    return(
        <div className="clienti-bloc-container">
            <Head>
                Clienti
            </Head>

            <div className="tabel-container">

                <h3 style={{paddingLeft: '20px'}}> Clientii </h3>

                {  props.data === 'nu ai clienti' ? 

                    <h5> Momentan nu exista clienti in baza de date.</h5> : 
                    <div className="clienti-container">
                        {
                            clienti.map( (client, index) => {
                                return <div key={index+1} className='client-element'>
                                            <div className="client-number"> {index + 1} </div>
                                            <div className="client-date">
                                                <div> <b>Denumire:</b> S.C. {`${client[1]} ${client[2]}`} </div>
                                                <div> <b>Numar Reg. Com.</b> {client[3]} </div>
                                                <div> <b>Cod fiscal:</b> {client[5] === '1' ? 'RO' : ''} {client[4]} </div>
                                                <div> <b>Telefon:</b> {client[6]} </div>
                                                <div> <b>Email:</b> {client[7]} </div>
                                                <div className="client-butoane">
                                                    <Link href={`/clients/${client[1]}`}>
                                                        <a> <button className="btn btn-outline-primary btn-sm butoane"> Modifica </button> </a>
                                                    </Link>
                                                    <button className="btn btn-outline-danger btn-sm butoane" onClick={ () => handleDelete(client[0]) }> Delete </button>
                                                </div>  
                                            </div>                                               
                                        </div>
                            })
                        }
                    </div>
                }
                    <hr />

                    <div style={{marginLeft: '30px'}}> 
                        Pentru a adauga un client nou, apasati butonul adauga. <br />
                        <Link href='/clients/newClient'>
                            <a className="btn btn-primary"> Adauga  </a>
                        </Link>
                    </div>
            </div>
        </div>
    )

}

export default Clients

export async function getServerSideProps() {
    const r = await fetch('http://bogdanolar.pythonanywhere.com/clients')
    const data = await r.json()

    return {
        props: {
            data: data
        }
    }
}