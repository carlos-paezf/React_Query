import './App.css'
import { useRandom } from './util/hooks/useRandom'


const App = () => {
    const query = useRandom()

    return (
        <div className="App">
            <div className="App">
                {
                    (
                        () => {
                            if ( query.isFetching || query.isLoading ) {
                                return <h2>Loading...</h2>
                            }
                            else if ( !query.isLoading && !query.isFetching && query.isError ) {
                                return <h2>Oh no!!! An error occurred: <code>{ `${ query.error }` }</code></h2>
                            }
                            else {
                                return <h2>Random Number: { query.data }</h2>
                            }
                        }
                    )()
                }

                <button onClick={ () => query.refetch() } disabled={ query.isFetching }>Generate a new random number</button>
            </div>
        </div>
    )
}


export default App
