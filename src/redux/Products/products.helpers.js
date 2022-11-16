import { firestore } from './../../firebase/utility';

export const handleAddProduct = product => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products') // find the product collection
      .doc()                  // make a new document
      .set(product)           // set values of the new doc to the sent product
      .then(() => {           // if this work, promise is resolved
        resolve();
      })
      .catch(err => {         // if an error occurs, we can reject the promise
        reject(err);
      })
  });
}

export const handleFetchProducts = ({ filterType, startAfterDoc, persistProducts=[] }) => {
  return new Promise((resolve, reject) => {
    const pageSize = 12;

    let ref = firestore.collection('products').orderBy('createdDate').limit(pageSize);

    if (filterType) ref = ref.where('productCategory', '==', filterType);
    if (startAfterDoc) ref = ref.startAfter(startAfterDoc);

    ref
      .get()
      .then(snapshot => {
        const totalCount = snapshot.size;

        const data = [
          ...persistProducts,
          ...snapshot.docs.map(doc => { //maps every doc that is on the snapshot, and returns all of the data on it
            return {
              ...doc.data(), //.data() is a method to return all the data relevant to the doc
              documentID: doc.id
            }
          })
        ];

        resolve({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          isLastPage: totalCount < 1
        });
      })
      .catch(err => {
        reject(err);
      })
  })
}

export const handleDeleteProduct = documentID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc(documentID)
      .delete() // DELETES FROM FIRESTORE
      .then(() => {
        console.log(documentID, 2)
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}

export const handleFetchProduct = (productID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc(productID)
      .get()
      .then(snapshot => {

        if (snapshot.exists) {
          resolve(
            snapshot.data()
          );
        }
      })
      .catch(err => {
        reject(err);
      })
  })
}