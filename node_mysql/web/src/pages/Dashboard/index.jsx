import { useContext } from "react"
import { Context } from "../../Context/AuthContext"

export const Dashboard = () => {
    const token = localStorage.getItem('@AppToken')

    const { authenticated } = useContext(Context);
    console.log( 'Situação Login: ' + authenticated );

    return(
        <div>
            <h1>Dashboard</h1>
            <p> { token } </p>
        </div>
    )
}