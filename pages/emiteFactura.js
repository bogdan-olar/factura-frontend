import { useState } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'

import EmiteFacturaEmitent from '../components/emiteFactura/emitent'
import EmiteFacturaClient from '../components/emiteFactura/client'
import EmiteFacturaDelegat from '../components/emiteFactura/delegat'


function EmiteFactura(props) {

    const router = useRouter()
    const { emitent, facturi, client, delegat } = props

    console.log(props)

    const [selectedClient, setSelectedClient ] = useState(client[0][1])
    const [selectedDelegat, setSelectedDelegat] = useState(delegat[0][1])

    const initialValues = {
                            serieFactura: facturi[0][0][1],
                            numarFactura: facturi[0][facturi[0].length-1][2] + 1 ,
                            dataFactura: '',
                            bunuriServicii: [{denumire: '', cantitate: 0, fel: 'buc', pretBucata: 0, cotaTva: 19}],
                        }
    

    function submit(values) {

        router.push('/')

        return fetch('http://bogdanolar.pythonanywhere.com/factura/add', {
            method: 'POST',
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify({
                clientId: client.filter( c => c[1] === selectedClient )[0][0],
                date: values,
                delegatId: delegat.filter( d => d[1] === selectedDelegat )[0][0]
            })
        }).then( res => res.json ).then( res => console.log(res) ).catch( err => console.log(err) )
    }

    function validate(values) {
        const errors = {}

        if(!values.serieFactura) {
            errors.serieFactura = '*Campul nu poate fi gol.'
        } else if(values.serieFactura !== facturi[0][0][1]) {
            errors.serieFactura = '*Seria de factura nu este conforma cu seria dvs.'
        }

        if(!values.numarFactura) {
            errors.numarFactura = '*Campul nu poate fi gol.'
        } else if(values.numarFactura < (facturi[0][facturi[0].length - 1][2] + 1) ) {
            errors.numarFactura = '*Numarul de factura ales este deja alocat.'
        } else if (values.numarFactura > (facturi[0][facturi[0].length - 1][2] + 1) ) {
            errors.numarFactura = `*Numerele de facturi trebuie sa fie acordate cronologic. Urmatorul numar este ${facturi[0][facturi[0].length - 1][2] + 1}`
        }

        return errors
    }

    function handleChangeClient(event) {
        setSelectedClient(event.target.value)
    }

    function handleChangeDelegat(event) {
        setSelectedDelegat(event.target.value)
    }

    return(

             <div className="container">

                 <div className='factura-header'>

                    <EmiteFacturaEmitent emitent={emitent} />

                    <div className='logo-societate'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-slack" viewBox="0 0 16 16">
                            <path d="M3.362 10.11c0 .926-.756 1.681-1.681 1.681S0 11.036 0 10.111C0 9.186.756 8.43 1.68 8.43h1.682v1.68zm.846 0c0-.924.756-1.68 1.681-1.68s1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68a1.685 1.685 0 0 1-1.682-1.68v-4.21zM5.89 3.362c-.926 0-1.682-.756-1.682-1.681S4.964 0 5.89 0s1.68.756 1.68 1.68v1.682H5.89zm0 .846c.924 0 1.68.756 1.68 1.681S6.814 7.57 5.89 7.57H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.682 1.68-1.682h4.21zm6.749 1.682c0-.926.755-1.682 1.68-1.682.925 0 1.681.756 1.681 1.681s-.756 1.681-1.68 1.681h-1.681V5.89zm-.848 0c0 .924-.755 1.68-1.68 1.68A1.685 1.685 0 0 1 8.43 5.89V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68v4.21zm-1.681 6.748c.926 0 1.682.756 1.682 1.681S11.036 16 10.11 16s-1.681-.756-1.681-1.68v-1.682h1.68zm0-.847c-.924 0-1.68-.755-1.68-1.68 0-.925.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681h-4.21z"/>
                            </svg>
                            <span className='logo-societate-text'>
                                Sigla societate
                            </span>
                    </div>

                    <EmiteFacturaClient client={client} selectedClient={selectedClient} handleChange={handleChangeClient}/>

                </div>


                <div>
                    <Formik initialValues={initialValues} onSubmit={submit} validate={validate}>
                        <Form>
                            <div className='numar-factura-block'>
                                <div className='forma-element-emite-factura'>
                                    <label htmlFor='serieFactura' className='forma-label-emite-factura'> Serie factura </label>
                                    <Field type='text' id='serieFactura' name='serieFactura' className='emite-factura-field' />
                                    <div className='error'>
                                        <ErrorMessage name='serieFactura' />
                                    </div> 
                                </div>
                                <div className='forma-element-emite-factura'>
                                    <label htmlFor='numarFactura' className='forma-label-emite-factura'> Numar factura </label>
                                    <Field type='text' id='numarFactura' name='numarFactura' className='emite-factura-field' />
                                    <div className='error'>
                                        <ErrorMessage name='numarFactura' />
                                    </div>
                                </div>
                                <div className='forma-element-emite-factura'>
                                    <label htmlFor='dataFactura' className='forma-label-emite-factura'> Data factura </label>
                                    <Field type='date' id='dataFactura' name='dataFactura' className='emite-factura-field' /> 
                                </div>
                            </div>

                            <div style={{minHeight: '300px'}}>
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
                                <FieldArray name='bunuriServicii'>
                                    {
                                        props => {
                                            const { push, insert, remove } = props
                                            const { bunuriServicii } = props.form.values
                                            return bunuriServicii.map( (item, index) => {
                                                return(
                                                    <tr key={index}>
                                                        <td style={{borderRight: '1px dotted lightblue', padding:'0px 10px'}}> {index+1} </td>
                                                        <td >
                                                            <Field type='text' className='emite-factura-field' style={{width: '350px'}} name={`bunuriServicii[${index}].denumire`} />
                                                        </td>
                                                        <td>
                                                            <Field type='text' className='emite-factura-field' style={{width: '100px'}} name={`bunuriServicii[${index}].cantitate`} />
                                                        </td>
                                                        <td>
                                                            <Field as='select' className='field-element-select' name={`bunuriServicii[${index}].fel`}>
                                                                <option value='buc'> buc </option>
                                                                <option value='kg'> kg </option>
                                                                <option value='mp'> mp </option>
                                                                <option value='tone'> tone </option>
                                                                <option value='ore'> ore </option>
                                                            </Field>
                                                        </td>
                                                        <td>
                                                            <Field type='text' className='emite-factura-field' style={{width: '100px'}} name={`bunuriServicii[${index}].pretBucata`} />
                                                        </td>
                                                        <td style={{minWidth: '75px'}}>
                                                            {
                                                                (parseFloat(bunuriServicii[index].cantitate) *
                                                                parseFloat(bunuriServicii[index].pretBucata)).toFixed(2)
                                                            } 
                                                        </td>
                                                        <td>
                                                            <Field as='select' className='field-element-select' name={`bunuriServicii[${index}].cotaTva`}> 
                                                                <option value={19}> 19% </option>
                                                                <option value={9}> 9% </option>
                                                                <option value={5}> 5% </option>
                                                                <option value={0}> 0% </option>
                                                            </Field>
                                                        </td>
                                                        <td style={{minWidth: '90px'}}> 
                                                            {
                                                                (
                                                                ( parseFloat(bunuriServicii[index].cantitate) *
                                                                parseFloat(bunuriServicii[index].pretBucata)
                                                                )/100 * bunuriServicii[index].cotaTva 
                                                                ).toFixed(2)
                                                            }
                                                        </td>
                                                        <td>
                                                            <button type='button' className='btn btn-danger' onClick={() => remove(index)}> - </button>
                                                        </td>
                                                        <td>
                                                            <button type='button' className='btn btn-success' onClick={() => insert(index+1, {denumire: '', cantitate: 0, fel: 'buc', pretBucata: 0,  cotaTva: 19})}> + </button>
                                                        </td>
                                                    </tr>    
                                                )
                                            })
                                        }
                                    }
                                </FieldArray>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td style={{borderRight: '1px dotted lightblue', padding:'0px 10px'}}> </td>
                                        <td style={{textAlign: 'left', paddingLeft: '30px'}}><b> Total </b></td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td><b> 
                                            <Field>
                                                {
                                                    values => {
                                                        const { bunuriServicii } = values.field.value
                                                        return <> {bunuriServicii.reduce( (total, value) => {
                                                            return total + value.cantitate*value.pretBucata
                                                        }, 0).toFixed(2)} </>
                                                    }
                                                }
                                            </Field>
                                        </b></td>
                                        <td> </td>
                                        <td><b> 
                                            <Field>
                                                {
                                                    values => {
                                                        const { bunuriServicii } = values.field.value
                                                        return <> {bunuriServicii.reduce( (total, value) => {
                                                            return total + (value.cantitate*value.pretBucata/100*value.cotaTva)
                                                        }, 0).toFixed(2)} </>
                                                    }
                                                }
                                            </Field>
                                        </b></td>
                                    </tr>
                                </tfoot>
                                </table>
                            </div>
                            <hr />
                            <div>
                                <EmiteFacturaDelegat delegat={delegat} selectedDelegat={selectedDelegat} handleChange={handleChangeDelegat} />
                            </div>
                            <hr></hr>
                            <div className='button-container' >
                                <div className='form-element-button'>
                                    <button type='reset' className='btn btn-outline-danger'> Reset </button>
                                </div>
                                <div className='form-element-button'>
                                    <button type='submit' className='btn btn-outline-primary'> Emite factura </button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
    
    )

}

export default EmiteFactura

export async function getServerSideProps() {

    const responsEmitent = await fetch('http://bogdanolar.pythonanywhere.com/emitent')
    const dateEmitent = await responsEmitent.json()

    const respons = await fetch('http://bogdanolar.pythonanywhere.com/factura')
    const data = await respons.json()

    const responsClient = await fetch('http://bogdanolar.pythonanywhere.com/clients')
    const dataClient = await responsClient.json()

    const responsDelegat = await fetch('http://bogdanolar.pythonanywhere.com/delegat')
    const dataDelegat = await responsDelegat.json()

    return {
        props: {
            emitent: dateEmitent,
            facturi: data,
            client: dataClient,
            delegat: dataDelegat
        }
    }
}