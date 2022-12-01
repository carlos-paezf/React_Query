import { useQuery } from "@tanstack/react-query"
import { getRandomNumber as fetcher } from "../helpers/fetcher"


export const useRandom = () => {
    const query = useQuery( [ 'randomNumber' ], fetcher )

    return query
}