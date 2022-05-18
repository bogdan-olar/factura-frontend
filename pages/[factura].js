import Link from 'next/link'

function Factura(props) {

    console.log(props)

    const factura = props.dateFactura[0]
    const emitent = props.emitent
    const client = props.dateFactura[1]
    const bunuri = props.dateFactura[3]
    const delegat = props.dateFactura[2]

    console.log(delegat)


    return(
        <div> 
            
            <div className='container'>

                <div className='factura-header'>

                    <div className="emitent-container">
                        <div> <b>Denumire:</b> {emitent[1]} {emitent[2]}</div>
                        <div> <b>Reg. com.:</b> {emitent[3]} </div>
                        <div> <b>Cod fiscal:</b> {emitent[5]} {emitent[4]}</div>
                        <div style={{paddingBottom: '15px'}}> <b>Capital Social:</b> {emitent[6]} </div>
                        <div> <b>Adresa:</b> {`Loc. ${emitent[7]}, Str. ${emitent[8]}, Nr. ${emitent[9]}, Sc. ${emitent[10]}, Ap. ${emitent[11]}, Jus. ${emitent[12]}`} </div>
                        <div> <b>Telefon:</b> {emitent[13]} </div>
                        <div style={{paddingBottom: '15px'}}> <b>Email:</b> {emitent[14]} </div>
                        <div> <b>IBAN:</b> {emitent[15]} </div>
                        <div> <b>Banca:</b> {emitent[16]} </div>
                    </div>

                    <div className='logo-societate'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-slack" viewBox="0 0 16 16">
                        <path d="M3.362 10.11c0 .926-.756 1.681-1.681 1.681S0 11.036 0 10.111C0 9.186.756 8.43 1.68 8.43h1.682v1.68zm.846 0c0-.924.756-1.68 1.681-1.68s1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68a1.685 1.685 0 0 1-1.682-1.68v-4.21zM5.89 3.362c-.926 0-1.682-.756-1.682-1.681S4.964 0 5.89 0s1.68.756 1.68 1.68v1.682H5.89zm0 .846c.924 0 1.68.756 1.68 1.681S6.814 7.57 5.89 7.57H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.682 1.68-1.682h4.21zm6.749 1.682c0-.926.755-1.682 1.68-1.682.925 0 1.681.756 1.681 1.681s-.756 1.681-1.68 1.681h-1.681V5.89zm-.848 0c0 .924-.755 1.68-1.68 1.68A1.685 1.685 0 0 1 8.43 5.89V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68v4.21zm-1.681 6.748c.926 0 1.682.756 1.682 1.681S11.036 16 10.11 16s-1.681-.756-1.681-1.68v-1.682h1.68zm0-.847c-.924 0-1.68-.755-1.68-1.68 0-.925.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681h-4.21z"/>
                        </svg>
                        <span className='logo-societate-text'>
                            Sigla societate
                        </span>
                    </div>

                    <div className="client-container"> 
                        <div style={{paddingTop: '15px'}}> <b>Denumire:</b> {client[1]} {client[2]} </div>
                        <div> <b>Reg. Com.:</b> {client[3]} </div>
                        <div> <b>Cod fiscal:</b> {client[5] === '1' ? 'RO' : null } {client[4]} </div>
                        <div style={{paddingTop: '10px'}}> <b>Telefon:</b> {client[6]} </div>
                        <div> <b>Email:</b> {client[7]} </div>
                    </div> 
                </div>

                <div className='numar-factura-block'>
                    <div style={{padding: '0px 10px'}}>
                        <b>Seria:</b> {factura[0]} 
                    </div>
                    <div style={{padding: '0px 10px'}}>
                        <b>Numar: </b> {factura[1]} 
                    </div>
                    <div style={{padding: '0px 10px'}}>
                        <b>Data:</b> {factura[2]}
                    </div>
                </div>

                        <div style={{minHeight: '500px'}}>
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th> Bunuri si servicii </th> 
                                        <th> Cantitatea </th>
                                        <th> Unitate </th>
                                        <th> Pret/unitate </th>
                                        <th> Pret total </th>
                                        <th> Cota TVA </th>
                                        <th> Suma TVA </th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                {
                                    bunuri.map( (rand, index) => {
                                            return <tr key={index} >
                                                    <td style={{borderRight: '1px dotted lightblue', padding:'0px 10px'}}> {index + 1} </td>
                                                    <td> {rand[1]} </td>
                                                    <td> {rand[2]} </td>
                                                    <td> {rand[3]} </td>
                                                    <td> {rand[4]} </td>
                                                    <td> {rand[2]*rand[4]} </td>
                                                    <td> {rand[5]} </td>
                                                    <td> {rand[2]*rand[4]/100*19} </td>
                                                </tr>
                                    
                                    })
                                }

                                </tbody>       
                            </table>
                        </div>
                        <hr />
                    
                    <div className='total-factura-container'>


                        <div className='semnatura-factura'>
                            Semnatura si stampila furnizorului.
                        </div>

                        <div className='delegat-factura'>
                            <div> <b>Nume delegat:</b> {delegat[1]} {delegat[2]} </div>
                            <div> <b>Serie buletin:</b> {delegat[3]} </div>
                            <div> <b>Nr. mijloc transport: </b> {delegat[4]} </div>
                        </div>

                        <table className='total-factura' style={{border: 'none'}}>
                            <thead>
                                <tr> 
                                    <th className='total-factura-head'> Total </th>
                                    <td style={{borderBottom: '1px dotted #094562'}}>
                                        {
                                            bunuri.reduce( (total, value) => {
                                                return total + value[2]*value[4]
                                            }, 0).toFixed(2) 
                                        }
                                    </td>
                                    <td style={{borderBottom: '1px dotted #094562'}}> 
                                        {
                                            bunuri.reduce( (total, value ) => {
                                                return total + (value[2]*value[4]/100*19)
                                            }, 0).toFixed(2)
                                        }
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr> 
                                    <th style={{border: 'none'}}>Total de plata </th> 
                                    <td> </td>
                                    <td>
                                        {
                                            bunuri.reduce( (total, value) => {
                                                return total + (
                                                   value[2]*value[4] + value[2]*value[4]/100*19
                                                )
                                            }, 0).toFixed(2)
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

            </div>

            <div>
                <hr />
                <Link href='/'>
                    <a className='btn btn-outline-secondary'> &lt;&lt;&lt; Back </a>
                </Link>
            </div>
            
        </div>
    )

}

export default Factura

export async function getServerSideProps( context ) {

    const { params } = context
    const { factura } = params

    const emi = await fetch('https://bogdanolar.pythonanywhere.com/emitent')
    const emitent = await emi.json()

    const res = await fetch(`https://bogdanolar.pythonanywhere.com/facturaSingura?nr=${factura}`)
    const date = await res.json()

    return {
        props: {
            emitent: emitent,
            dateFactura: date
        }
    }
}