
import Link from 'next/link'
import { Formik, Form, Field, ErrorMessage } from 'formik'

function ClientForm(props) {

    const { data } = props

    let initialValues = {}

    if ( data === null ) {
        initialValues = {
            numeClient: '',
            tipClient: '',
            regCom: '',
            codFiscal: '',
            codTva: false,
            telefon: '',
            email: ''
        }
    } else {
        initialValues = {
            numeClient: data[1],
            tipClient: data[2],
            regCom: data[3],
            codFiscal: data[4],
            codTva: data[5] === '0' ? false : true,
            telefon: data[6],
            email: data[7]
        }
    }



    const submit = (values) => {

        router.push('/clients')

        if( data === null ){
            return fetch('http://bogdanolar.pythonanywhere.com/client/add', {
                method: 'POST',
                headers: { 'Content-type': 'application/json'},
                body: JSON.stringify(values)
            }).then( res => res.json() ).then( res => console.log(res) ).catch( err => console.log(err))
        }

        return fetch('http://bogdanolar.pythonanywhere.com/update', {
                method: 'PUT',
                headers: { 'Content-type': 'application/json'},
                body: JSON.stringify({...values, 'id': data[0]})
        }).then( res => res.json() ).then( res => console.log(res) ).catch( err => console.log(err))
       


    }

    const validate = (values) => {
        const errors = {}

        const campGol = '*Campul nu trebuie sa fie gol.'

        if(!values.numeClient) {
            errors.numeClient = campGol
        }
        if(!values.tipClient) {
            errors.tipClient = campGol
        }
        if(!values.regCom) {
            errors.regCom = campGol
        }
        if(!values.codFiscal) {
            errors.codFiscal = campGol
        }
        if(!values.telefon) {
            errors.telefon = campGol
        }
        if(!values.email) {
            errors.email = campGol
        }

        return errors
    }

    return(
        <div className='forma-client-container'>
            <div style={{paddingBottom: '30px'}}>
                {
                    data === null ?  <h4> Adaugati un client nou. </h4> :
                    <h4> Modificati datele clientul {data[1]} </h4>   
                }
            </div>

            <Formik initialValues={initialValues} onSubmit={submit} validate={validate}>
                <Form>

                    <div style={{paddingLeft: '10px'}}>
                        <div style={{paddingLeft: '50px'}}>
                            <label htmlFor='numeClient' className='forma-label-delegat'> Denumire societate </label>
                        </div>
                        <div className='form-element-trei'>
                            <span className='sc' >S.C.</span>
                            <Field type='text' id='numeClient' name='numeClient' className='emitent-field-complex' />
                            <Field as='select' id='tipClient' name='tipClient' className='field-element-select-complex'>
                                <option value='S.R.L.'> S.R.L. </option>
                                <option value="S.A."> S.A. </option>
                                <option value="S.C.A."> S.C.A. </option>
                                <option value="S.N.C."> S.N.C. </option>
                                <option value="S.C.S."> S.C.S. </option>
                            </Field>
                        </div>
                            <div className='error' style={{paddingLeft: '40px'}}>
                                <ErrorMessage name='numeClient' />
                            </div>
                    </div>

                    <div className='group-delegat-form'>
                        <div className='form-element'>
                            <label htmlFor='regCom' className='forma-label-delegat'> Numar Reg. Com. </label>
                            <Field type='text' id='regCom' name='regCom' className='delegat-field' placeholder='- numar reg Com -' />
                            <div className='error'>
                                <ErrorMessage name='regCom' />
                            </div>
                        </div>

                        <div className='form-element-dublu'>
                            <div>
                                <label htmlFor='codFiscal' className='forma-label-delegat'> Cod fiscal </label>
                                <Field type='text' id='codFiscal' name='codFiscal' className='delegat-field' placeholder='- cod fiscal-' />
                                <div className='error'>
                                    <ErrorMessage name='codFiscal' />
                                </div>
                            </div>
                            <div className='platitor-tva'>
                                <div className='platitor-tva-field'>
                                    <Field type='checkbox' id='codTva' name='codTva' />
                                </div> 
                                <label htmlFor='codTva' className='platitor-tva-label'> Platitor TVA </label>    
                            </div>
                        </div>
                    </div>

                    <div className='group-delegat-form'>
                        <div className='forma-element-delegat'>
                            <label htmlFor='telefon' className='forma-label-delegat'> Nr. telefon </label>
                            <Field type='text' id='telefon' name='telefon' className='delegat-field' placeholder=' - numar telefon -' />
                            <div className='error'>
                                <ErrorMessage name='telefon' />
                            </div> 
                        </div>

                        <div className='forma-element-delegat'>
                            <label htmlFor='email' className='forma-label-delegat'> Email </label>
                            <Field type='email' id='email' name='email' className='delegat-field' placeholder='- email -' />
                            <div className='error'>
                                <ErrorMessage name='email' />
                            </div>
                        </div>
                    </div>

                    <div className='button-container'>
                        <div className='form-element-button'>
                            <button type='reset' className='btn btn-danger'> Reset </button>
                        </div>

                        <div className='form-element-button'>
                            <Field>
                                {
                                    props => {
                                        console.log(props)
                                        return <button type='submit' className='btn btn-primary'> Salveaza </button>
                                    }
                                }
                            </Field>
                        </div>

                    </div>

                </Form>
            </Formik>

            <hr />

            <Link href='/clients'>
            <a className='btn btn-outline-secondary'> &lt;&lt;&lt; Back </a>
            </Link>

        </div>
    )

}

export default ClientForm

export async function getServerSideProps( context ) {

    const { params } = context
    const { client } = params

    const response = await fetch(`http://bogdanolar.pythonanywhere.com/clients?nume=${client}`)
    const data = await response.json()

    return {
        props: {
            data: data
        }
    }
}