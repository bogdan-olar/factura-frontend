
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState } from 'react'

function NewAccount({handleCreateAccount}) {

    const [mesaj, setMesaj] = useState('')

    const initialValues = {
        userName: '',
        email: '',
        functia: '',
        password: '',
        confirmPassword: ''
    }

    const submit = (values) => {
        fetch('https://bogdanolar.pythonanywhere.com/user/contNou', {
            method: 'POST',
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify(values)
        }).then( res => res.json() ).then( res => { 
                console.log(res) 
                if ( res === 'Utilizatorul exista') {setMesaj('Numele sau parola nu sunt disponibile. Va rugam sa alegeti altele...')}
                if( res === 'Sa creat cont nou') {  handleCreateAccount() }
            }).catch( err => console.log(err) ) 
    }

    const validate = (values) => {

        const errors = {}

        const campGol = '*Campul nu poate fi gol.'

        if(!values.userName) {
            errors.userName = campGol
        }
        if(!values.email) {
            errors.email = campGol
        }
        if(!values.functia) {
            errors.functia = campGol
        }
        if(!values.password) {
            errors.password = campGol
        }
        if(!values.confirmPassword) {
            errors.confirmPassword = campGol
        } else if( values.confirmPassword !== values.password ) {
            errors.confirmPassword = '*Parola nu este identica cu initiala.'
        }

        return errors
    }

    return(
        <div className='log-form-container'>

            <div className='logo-element'>
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-slack" viewBox="0 0 16 16">
                <path d="M3.362 10.11c0 .926-.756 1.681-1.681 1.681S0 11.036 0 10.111C0 9.186.756 8.43 1.68 8.43h1.682v1.68zm.846 0c0-.924.756-1.68 1.681-1.68s1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68a1.685 1.685 0 0 1-1.682-1.68v-4.21zM5.89 3.362c-.926 0-1.682-.756-1.682-1.681S4.964 0 5.89 0s1.68.756 1.68 1.68v1.682H5.89zm0 .846c.924 0 1.68.756 1.68 1.681S6.814 7.57 5.89 7.57H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.682 1.68-1.682h4.21zm6.749 1.682c0-.926.755-1.682 1.68-1.682.925 0 1.681.756 1.681 1.681s-.756 1.681-1.68 1.681h-1.681V5.89zm-.848 0c0 .924-.755 1.68-1.68 1.68A1.685 1.685 0 0 1 8.43 5.89V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68v4.21zm-1.681 6.748c.926 0 1.682.756 1.682 1.681S11.036 16 10.11 16s-1.681-.756-1.681-1.68v-1.682h1.68zm0-.847c-.924 0-1.68-.755-1.68-1.68 0-.925.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681h-4.21z"/>
                </svg>
                <span className='logo-text'>
                    eFactura
                </span>
            </div>

            <Formik initialValues={initialValues} onSubmit={submit} validate={validate}>
                <Form>
                    <div className='form-floating mb-3 log-input'>
                        <Field type='text' name='userName' id='userName' className='form-control' placeholder=' -- nume utilizator --' />
                        <label htmlFor='userName'> Nume utilizator </label>
                        <div className='error-log'>
                            <ErrorMessage name='userName' />
                        </div>
                    </div>

                    <div className='form-floating mb-3 log-input'>
                        <Field type='email' name='email' id='email' className='form-control' placeholder=' -- adresa de email --' />
                        <label htmlFor='email'> Adresa email </label>
                        <div className='error-log'>
                            <ErrorMessage name='email' />
                        </div>
                    </div>

                    <div className='form-floating mb-3 log-input'>
                        <Field type='text' name='functia' id='functia' className='form-control' placeholder=' -- functia ocupata in firma --' />
                        <label htmlFor='functia'> Functia ocupata </label>
                        <div className='error-log'>
                            <ErrorMessage name='functia' />
                        </div>
                    </div>

                    <div className='form-floating mb-3 log-input'>
                        <Field type='password' name='password' id='password' className='form-control' placeholder=' -- password --' />
                        <label htmlFor='password'> Password </label>
                        <div className='error-log'>
                            <ErrorMessage name='password' />
                        </div>
                    </div>
                                      
                    <div className='form-floating mb-3 log-input'>
                        <Field type='password' name='confirmPassword' id='confirmPassword' className='form-control' placeholder=' -- confirm password --' />
                        <label htmlFor='password'> Confirm password </label>
                        <div className='error-log'>
                            <ErrorMessage name='confirmPassword' />
                        </div>
                    </div>

                    <div>
                        {
                            mesaj
                        }
                    </div>

                    <div className='btn-div'>
                        <button type='submit' className='log-btn'> Creaza cont </button>
                    </div>

                    <div className='cont-nou-text'>
                        <span className='cont-nou-text-span' onClick={handleCreateAccount}> Inapoi la login </span>
                    </div>
                </Form>
            </Formik>
        </div>
    )

}

export default NewAccount