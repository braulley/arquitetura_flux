import { call, put, select } from 'redux-saga/effects';
import api from '../../services/api';
import { addFavoriteSuccess, addFavoriteFailure } from '../actions/favorites';

export function* addFavorite(action) {
    try {
        const { data } = yield call(api.get, `/repos/${action.payload.repository}`);

        const isDuplicated = yield select( state => state.favorites.data.find(favorite => favorite.id === data.id))
        
        if(isDuplicated){
            yield put(addFavoriteFailure("Repositório Duplicado."));        
        }else{
            const repositoryData = {
                id: data.id,
                name: data.full_name,
                description: data.description,
                url: data.html_url
            };
    
            yield put(addFavoriteSuccess(repositoryData));
        }        
    } catch (error) {
        yield put(addFavoriteFailure("Erro ao adicionar repositprorio!"));        
    }
}