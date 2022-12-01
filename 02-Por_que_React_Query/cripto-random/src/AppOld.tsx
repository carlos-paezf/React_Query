import { useEffect, useReducer, useState } from 'react'
import './App.css'
import { getRandomNumber } from './util/helpers/fetcher'


const AppOld = () => {
    const [ number, setNumber ] = useState<number>()
    const [ error, setError ] = useState<string>()
    const [ isLoading, setIsLoading ] = useState<boolean>( true )
    const [ dep, forceRefetch ] = useReducer( ( x ) => x + 1, 0 )

    useEffect( () => {
        setIsLoading( true )

        getRandomNumber()
            .then( setNumber )
            .catch( e => setError( e.message ) )
            .finally( () => setIsLoading( false ) )
    }, [ dep ] )

    return (
        <div className="App">
            {
                (
                    () => {
                        if ( isLoading ) return <h2>Loading...</h2>
                        else if ( !isLoading && error ) return <h2>Oh no!!! An error occurred: <code>{ error }</code></h2>
                        else return <h2>Random Number: { number }</h2>
                    }
                )()
            }

            <button onClick={ forceRefetch } disabled={ isLoading }>Generate a new random number</button>
        </div>
    )
}


export default AppOld
