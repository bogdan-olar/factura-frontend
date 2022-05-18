import { Formik, Form, Field, ErrorMessage } from 'formik'

function FormaDelegat(props) {

    const initialValues = {
        nume: '',
        prenume: '',
        buletin: '',
        masina: ''
    }

    if( 'delegat' in props ) {
        initialValues.nume = props.delegat[0][1],
        initialValues.prenume = props.delegat[0][2],
        initialValues.buletin = props.delegat[0][3],
        initialValues.masina = props.delegat[0][4]
    }

    const validate = values => {
        const errors = {}

        const campGol = '*Campul nu trebuie sa fie gol.'

        if(!values.nume) {
            errors.nume = campGol
        }
        if(!values.prenume) {
            errors.prenume = campGol
        }
        if(!values.buletin) {
            errors.buletin = campGol
        }
        if(!values.masina) {
            errors.masina = campGol
        }

        return errors
    }

    const submit = (values) => {

        if( 'delegat' in props ) {
            return fetch('http://bogdanolar.pythonanywhere.com/delegat/update', {
                method: 'PUT',
                headers: { 'Content-type': 'application/json'},
                body: JSON.stringify({...values, 'id': props.delegat[0][0]})
            }).then( res => res.json() ).then( res => { props.aUF() } )
            .catch( err => console.log(err))
        }

        return fetch('http://bogdanolar.pythonanywhere.com/delegat/add', {
           method: 'POST',
           headers: { 'Content-type': 'application/json' },
           body: JSON.stringify(values)
        }).then( res => res.json() )
        .then( res => { props.aAF() } )
        .catch( err => console.log(err) ) 
    }

    return(
        <div className='forma-delegat-container'>
            <Formik initialValues={initialValues} validate={validate} onSubmit={submit}>
                <Form>
                    { 'delegat' in props ? 
                        <h4 className='title-form-delegat'> Modificati datele delagatului {props.delegat[0][1]} {props.delegat[0][2]} </h4> :
                        <h4 className='title-form-delegat'> Adaugati un delagat nou </h4>
                    }

                    <div className='group-delegat-form'>
                        <div className='forma-element-delegat'>
                            <label htmlFor='nume' className='forma-label-delegat'> Nume delegat </label>
                            <Field type='text' id='nume' name='nume' className='delegat-field' placeholder=' -- nume delegat --' ></Field>
                            <div className='error'>
                                <ErrorMessage name='nume' />
                            </div>
                        </div>
                        <div className='forma-element-delegat'>
                            <label htmlFor='prenume' className='forma-label-delegat'> Prenume delegat </label>
                            <Field type='text' id='prenume' name='prenume' className='delegat-field' placeholder=' -- prenume delegat --' ></Field>
                            <div className='error'>
                                <ErrorMessage name='prenume' />
                            </div>
                        </div>
                    </div>

                    <div className='group-delegat-form'>
                        <div className='forma-element-delegat'>
                            <label htmlFor='buletin' className='forma-label-delegat'> Serie buletin </label>
                            <Field type='text' id='buletin' name='buletin' className='delegat-field' placeholder=' -- serie buletin --' ></Field>
                            <div className='error'>
                                <ErrorMessage name='buletin' />
                            </div>
                        </div>
                        <div className='forma-element-delegat'>
                            <label htmlFor='masina' className='forma-label-delegat'> Numar masina </label>
                            <Field type='text' id='masina' name='masina' className='delegat-field' placeholder=' -- numar masina -- ' ></Field>
                            <div className='error'>
                                <ErrorMessage name='masina' />
                            </div>
                        </div>
                    </div>
                    <div className='button-container'>
                        <button type='button' className='btn btn-danger buton'
                                onClick={ 'delegat' in props ? () => props.aUF() : () => props.aAF() }> Cancel </button>
                        <button type='submit' className='btn btn-primary buton' > Salveaza </button>
                    </div>
                </Form>
            </Formik>
        </div>
    )

}

export default FormaDelegat