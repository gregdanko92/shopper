import { auth } from './../../firebase/utility'
import { takeLatest, put, all, call } from 'redux-saga/effects'
import { setProducts, setProduct, fetchProductsStart } from './products.actions'
import { handleAddProduct, handleFetchProducts,
  handleFetchProduct, handleDeleteProduct } from './products.helpers'
import productsTypes from './products.types'

export function* addProduct({ payload }) {

  try {
    const timestamp = new Date();
    yield handleAddProduct({ //see relevant helper function, async code will occur
      ...payload, //take all of the data we gathered from the component
      productAdminUserUID: auth.currentUser.uid, // add this field to the product
      createdDate: timestamp // add this field to the product
    });
    yield put(
      fetchProductsStart() //updates the rendered products
    );


  } catch (err) {
    // console.log(err);
  }

}

export function* onAddProductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export function* fetchProducts({ payload }) {
  try {
    const products = yield handleFetchProducts(payload); //brings in the helper function
    yield put( //waits for the helper funciton to then set the products
      setProducts(products)
    );

  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts)
} // just setting up the call of it's secondary function

export function* deleteProduct({ payload }) {
  try {
    yield handleDeleteProduct(payload)
    yield put (
      fetchProductsStart()
    );

  } catch (err) {
    // console.log(err);
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct)
}

export function* fetchProduct({ payload }) {
  try {
    const product = yield handleFetchProduct(payload)
    yield put(
      setProduct(product)
    )

  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchProductStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct)
}


export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
    call(onFetchProductStart),
  ])
}