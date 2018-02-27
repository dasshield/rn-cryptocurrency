import axios from "axios";
import {baseApiUrl} from "../configs/Variables";
import {FETCHING_COIN_DATA, FETCHING_COIN_DATA_FAIL, FETCHING_COIN_DATA_SUCCESS} from "./ActionTypes";

export default function FetchCoinData() {
    return dispatch => {
        dispatch({type: FETCHING_COIN_DATA});

        return axios.get(`${baseApiUrl}/v1/ticker/?limit=15`)
            .then(res => {
                dispatch({type: FETCHING_COIN_DATA_SUCCESS, payload: res.data})
            })
            .catch(err => {
                dispatch({type: FETCHING_COIN_DATA_FAIL, payload: err.data})
            });
    }
}