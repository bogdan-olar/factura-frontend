import { Formik, Form, Field, ErrorMessage } from 'formik'

function Emitent(props) {

    const { emitent } = props

    const initialValues = {
        numeSocietate: emitent[1],
        tipSocietate: emitent[2],
        regComertului: emitent[3],
        codFiscal: emitent[4],
        codTva: emitent[5] === '1' ? true : false,
        capitalSocial: emitent[6],
        localitate: emitent[7],
        strada: emitent[8],
        numar: emitent[9],
        scara: emitent[10],
        apartament: emitent[11],
        judet: emitent[12],
        telefon: emitent[13],
        email: emitent[14],
        contIBAN: emitent[15],
        denumireBanca: emitent[16]
    }

    function submit(values) {
        console.log( JSON.stringify(values) )
        return fetch('http://bogdanolar.pythonanywhere.com/emitent/update', {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(values)
        }).then( res => res.json() ).then( res => console.log(res) ).catch( err => console.log(err) )
    }

    function validate(values) {
        const error = {}

        if(!values.numeSocietate) {
            error.numeSocietate = '* Campul trebuie completat obligatoriu.'
        }

        if(!values.codFiscal) {
            error.codFiscal = '* Campul trebuie completat obligatoriu.'
        } else if (isNaN(values.codFiscal)) {
            error.codFiscal = '* Codul fiscal trebuie sa contina numai numere.'
        } else if (values.codFiscal < 0) {
            error.codFiscal = '* Codul fiscal nu poate fi negativ.'
        }

        console.log('error', error)
        return error
    }

    return(
        <div className="container">

             <Formik initialValues={initialValues} onSubmit={submit} validate={validate}>
                <Form>

                    <h4 style={{paddingLeft: '20px', paddingBottom: '20px'}}> Date despre emitent: </h4>

                    <div style={{paddingLeft: '10px'}}>
                        <div style={{paddingLeft: '50px'}}>
                            <label htmlFor='numeSocietate' className='forma-label-delegat'> Denumire societate </label>
                        </div>
                        <div className='form-element-trei'>
                            <span className='sc' >S.C.</span>
                            <Field type='text' id='numeSocietate' name='numeSocietate' className='emitent-field-complex' />
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
                        <div className='forma-element-delegat'>
                            <label htmlFor='regComertului' className='forma-label-delegat'> Numar Registrul Comertului </label>
                            <Field type='text' id='regComertului' name='regComertului' className='delegat-field' placeholder='ex. j32/299/2022' />
                        </div>

                            <div className='forma-element-delegat'>
                                <label htmlFor='codFiscal' className='forma-label-delegat' > Codul fiscal </label>
                                <Field type='text' id='codFiscal' name='codFiscal' className='delegat-field' />
                                <div className='error' >
                                    <ErrorMessage name='codFiscal' />
                                </div>
                            </div>
                                                    
                            <div className='platitor-tva'>
                                <div className='platitor-tva-field'   style={{paddingTop: '20px'}} >
                                    <Field type='checkbox' id='codTva' name='codTva' />
                                </div> 
                                <label htmlFor='codTva' className='platitor-tva-label' style={{paddingTop: '22px'}}> Platitor TVA </label>    
                            </div>
                        </div>

                
                    <div className='forma-element-delegat'>
                        <label htmlFor='capitalSocial' className='forma-label-delegat'> Capital social </label>
                        <Field type='text' id='capitalSocial' name='capitalSocial' className='delegat-field' placeholder='ex. 200' />
                    </div>
     

                    <hr />
                    <h4 style={{paddingLeft: '30px'}}> Adresa societate </h4>

                    <div className='group-delegat-form'>
                        <div className='form-element'>
                            <label htmlFor='localitate' className='forma-label-delegat'> Localitate </label>
                            <Field type='text' id='localitate' name='localitate' className='delegat-field' placeholder=' -- Localitate sediu social --' />
                        </div>

                        <div className='form-element'>
                            <label htmlFor='strada' className='forma-label-delegat'> Strada </label>
                            <Field type='text' id='strada' name='strada' className='delegat-field' style={{minWidth: '300px'}} placeholder='-- Str. sediu social --' />
                        </div>

                        <div className='form-element'>
                            <label htmlFor='numar' className='forma-label-delegat'> Numar </label>
                            <Field type='text' id='numar' name='numar' className='delegat-field' placeholder='-- numar --' />
                        </div>
                    </div>

                    <div className='group-delegat-form'>
                        <div className='form-element'>
                            <label htmlFor='scara' className='forma-label-delegat'> Scara </label>
                            <Field type='text' id='scara' name='scara' className='delegat-field' placeholder='-- scara --' />
                        </div>

                        <div className='form-element'>
                            <label htmlFor='apartament' className='forma-label-delegat'> Numar apartament </label>
                            <Field type='text' id='apartament' name='apartament' className='delegat-field' placeholder='--numar apartament--' />
                        </div>

                        <div className='form-element'>
                            <label htmlFor='judet' className='forma-label-delegat'> Judet </label>
                            <Field type='text' id='judet' name='judet' className='delegat-field' placeholder='Judet sediu' />
                        </div>
                    </div>

                    <hr />
                    <h4 style={{paddingLeft: '30px'}}> Date de contact </h4>

                    <div className='group-delegat-form'>
                        <div className='form-element'>
                            <label htmlFor='telefon' className='forma-label-delegat'> Telefon </label>
                            <Field type='text' id='telefon' name='telefon' className='delegat-field' />
                        </div>

                        <div className='form-element'>
                            <label htmlFor='email' className='forma-label-delegat'> Email </label>
                            <Field type='email' id='email' name='email' className='delegat-field' style={{minWidth: '300px'}} />
                        </div>
                    </div>

                    <hr />
                    <h4 style={{paddingLeft: '30px'}}> Date bancare </h4>

                    <div className='group-delegat-form'>
                        <div className='form-element'>
                            <label htmlFor='contIBAN' className='forma-label-delegat'> Cont IBAN </label>
                            <Field type='text' id='contIBAN' name='contIBAN' className='delegat-field' style={{minWidth: '300px'}} />
                        </div>

                        <div className='form-element'>
                            <label htmlFor='denumireBanca' className='forma-label-delegat'> Denumire banca </label>
                            <Field type='text' id='denumireBanca' name='denumireBanca' className='delegat-field' style={{minWidth: '300px'}} />
                        </div>
                    </div>

                <div className='button-container'>
                    <div className='form-element-button'>
                        <button type='reset' className='btn btn-danger'> Reset form </button>
                    </div>
                    <div className='form-element-button'>
                        <Field>
                            {
                                (values) => {
                                    return <button type='submit' className='btn btn-primary'> Salveaza </button>
                                }
                            }
                        </Field>
                    </div>
                </div>

                </Form>
            </Formik> 

        </div>
    )

}

export default Emitent

export async function getServerSideProps() {
    const res = await fetch('http://bogdanolar.pythonanywhere.com/emitent')
    const data = await res.json()

    return{
        props: {
            emitent: data,
        }
    }
}