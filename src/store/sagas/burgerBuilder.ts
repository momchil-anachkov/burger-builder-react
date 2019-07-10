import axiosInstance from '../../axios';
import { put } from 'redux-saga/effects';
import { setIngredients, fetchIngredientsFail } from '../actions/burgerBuilder';

export function* initializeIngredientsSaga() {
  try {
    const response = yield axiosInstance.get('/ingredients');
    yield put(setIngredients(response.data));
  } catch (error) {
    yield put(fetchIngredientsFail());
  }
}
