import { useState, useContext } from "react"
import { Context } from "../../Context/AuthContext"

import { useHistory } from "react-router-dom"

import api from '../../config/configApi'

export const Login = () => {

    const history = useHistory();
    
    const { authenticated } = useContext(Context);
    console.log( 'Situação Login: ' + authenticated );


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
        await api.post('/login', user)
        .then( (res) => {
            setStatus({
                /***type: 'success',
                msn: res.data.msn, */
                loading: false
            });
            localStorage.setItem('@AppToken', JSON.stringify(res.data.token))
            return history.push('/dasboard')
        }).catch((error) => {
            if(error.res){
                console.log(error, '1. Api não responde Ocorreu error')
                setStatus({
                    type: 'error',
                    msn: '1. Api não responde Ocorreu error',
                    loading: false
                });
            }else{
                console.log(error, '2. Api não responde Ocorreu error')
                setStatus({
                    type: 'error',
                    msn: '2. Api não responde Ocorreu error',
                    loading: false
                })
            }
        })
        
    }
    
    return(
        <div>
            <h1>Login</h1>

            { status.type == 'error' ? <p> {status.msn} </p> : "" } 

            { status.type === 'success' ? <p> {status.msn} </p> : "" } 

            { status.loading ? <p> Validando... </p> : "" } 

            <form onSubmit={loginSubmit}>
                <label>E-mail: </label>
                <input type="text" name="email" onChange={valorInput} />

                <label>Senha: </label>
                <input type="password" name="password" autoComplete="on" onChange={valorInput} />

                { status.loading ? <button type="submit" disabled>Aguarde ...</button> : <button type="submit">Acessar</button>}
            </form>
        </div>
    )
}