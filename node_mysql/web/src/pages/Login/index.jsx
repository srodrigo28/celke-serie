import { useState } from "react"
import { useHistory } from "react-router-dom"

import api from '../../config/configApi'

export const Login = () => {
    const history = useHistory();

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const [status, setStatus] = useState({
        type: '',
        msn: '',
        loading: false
    })

    const valorInput = e => setUser({
        ...user, 
        [e.target.name]: e.target.value
    })

    const loginSubmit = async e => {
        e.preventDefault()
        setStatus( { loading: true } )
        /***
        const headers = {
            'Content-type': 'application/json'
        }
        
        await api.post('login', user, {headers})
        */
        await api.post('/login', user)
        .then( (res) => {
            console.log(res, user.email, user.password);
            setStatus({
                /***type: 'success',
                msn: res.data.msn, */
                loading: false
            });
            return history.push('/dasboard');
        })
        .catch( (error) => {
            if(error.res){
                console.log(error.res)
                setStatus({
                    type: 'error',
                    msn: error.res.data.msn,
                    loading: false
                })
            }else{
                console.log(error, 'Api não responde Ocorreu error')
                setStatus({
                    type: 'error',
                    msn: error.res.data.msn,
                    loading: false
                })
            }
        })
        
    }

    return(
        <div>
            <h1>Login</h1>
            { status.type === 'error' ? <p> {status.msn} </p> : "" } 

            { status.type === 'success' ? <p> {status.msn} </p> : "" } 

            { status.loading ? <p> Validando... </p> : "" } 

            <form onSubmit={loginSubmit}>
                <label>E-mail: </label>
                <input type="text" name="email" onChange={valorInput} />

                <label>Senha: </label>
                <input type="password" name="password" onChange={valorInput} />

                { status.loading ? <button type="submit" disabled>Aguarde ...</button> : <button type="submit">Acessar</button>}
            </form>
        </div>
    )
}