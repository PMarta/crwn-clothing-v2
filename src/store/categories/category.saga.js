import { all, call, put, takeLatest } from "redux-saga/effects";
import {fetchCategoriesFailed, fetchCategoriesSuccess } from "./category.action";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import CATEGORIES_ACTION_TYPES from "./category.types";


//await function is declined within the function->await=yield
//dispatch=put
export function* fetchCategoriesAsync(){
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments,'categories');//call(fn,arguments)

        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch(error) {
        yield put(fetchCategoriesFailed(error));
    }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)])
}