
import Head from 'next/head'
import { useEffect, useState } from 'react'

import FormaDelegat from '../components/delegat/FormaDelegat'

function User( props ) {

    const [ delegati, setDelegati ] = useState(props.data)
    const [ formaAdaugaStatus, setFormaAdaugaStatus ] = useState(false)
    const [ formaUpdateStatus, setFormaUpdateStatus ] = useState(false)
    const [ updateId, setUpdateId ] = useState(0)
    const [ count, setCount ] = useState(0)

    useEffect( () => {
        fetch('https://bogdanolar.pythonanywhere.com/delegat').then( res => res.json() ).then( res => setDelegati(res) ).catch( err => console.log(err) )
    }, [count])

    function ascundeAdaugaForma() {
        setFormaAdaugaStatus(false)
        setCount( i => i + 1 )
    }
    function ascundeUpdateForma() {
        setFormaUpdateStatus(false)
        setUpdateId(0)
        setCount( i => i + 1 )
    }

    function stergere(id) {
        fetch('https://bogdanolar.pythonanywhere.com/delegat/sterge', {
            method: 'DELETE',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({ i: id})
        }).then( res => res.json() )
        .then( res => { setCount( i => i + 1 ) } )
    }

    return (
        <div className='bloc-container'>
            <Head>
                <title> Delegati </title>
            </Head>

            <div className='tabel-container'>
                <h3> Delegati </h3>

                {
                    delegati === 'nu exista delegati' ? 

                    <h5> Momenta nu exista delegati in baza de date. </h5> :

                    <table>
                        <thead>
                            <tr>
                                <th> ID </th>
                                <th> Nume </th>
                                <th> Prenume </th>
                                <th> Serie buletin </th>
                                <th> Numar masina </th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                delegati.map( (i, index) => {
                                return (
                                    <tr key={i[0]}>
                                        <td> {index + 1} </td>
                                        <td> {i[1]} </td>
                                        <td> {i[2]} </td>
                                        <td> {i[3]} </td>
                                        <td> {i[4]} </td>
                                        <td> 
                                            <button className='btn btn-outline-primary btn-sm' onClick={() => { setFormaUpdateStatus(true); setUpdateId(i[0]) }}> Modifica </button>
                                        </td>
                                        <td>
                                            <button className='btn btn-outline-danger btn-sm' onClick={() => stergere(i[0])}> Sterge </button>
                                        </td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                }

                <div className='adauga-delegat'>
                    Pentru a adauga un delegat nou, apasati butonul adauga. <br />
                    <button className='btn btn-primary' onClick={() => setFormaAdaugaStatus(true)}> Adauga </button>
                </div>
            </div>


            { formaAdaugaStatus ? <FormaDelegat aAF={ascundeAdaugaForma}/> : null }
            { formaUpdateStatus ? <FormaDelegat aUF ={ascundeUpdateForma} delegat={delegati.filter( i => i[0] === updateId)} /> : null }
        </div>
    )

}

export default User

export async function getServerSideProps() {

    const response = await fetch('https://bogdanolar.pythonanywhere.com/delegat')
    const data = await response.json()

    return {
        props: {
            data: data
        }
    }

}