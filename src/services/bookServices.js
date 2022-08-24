import { db } from '../firebaseConfig'

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'

const AnnCollectionRef = collection(db, 'Announcements')
const ConCollectionRef = collection(db, 'ContactUs')

class AnnouncementService {
  addAnn = (newAnn) => {
    return addDoc(AnnCollectionRef, newAnn)
  }
  updateAnn = (id, updatedAnn) => {
    const annDoc = doc(db, 'Announcements', id)
    return updateDoc(annDoc, updatedAnn)
  }
  deleteAnn = (id) => {
    const annDoc = doc(db, 'Announcements', id)
    return deleteDoc(annDoc)
  }
  getAllAnn = () => {
    return getDocs(AnnCollectionRef)
  }
  getAnn = (id) => {
    const annDoc = doc(db, 'Announcements', id)
    return getDoc(annDoc)
  }

  addCon = (newCon) => {
    return addDoc(ConCollectionRef, newCon)
  }
  updateCon = (id, updatedCon) => {
    const conDoc = doc(db, 'ContactUs', id)
    return updateDoc(conDoc, updatedCon)
  }
  deleteCon = (id) => {
    const conDoc = doc(db, 'ContactUs', id)
    return deleteDoc(conDoc)
  }
  getAllCon = () => {
    return getDocs(ConCollectionRef)
  }
  getCon = (id) => {
    const conDoc = doc(db, 'ContactUs', id)
    return getDoc(conDoc)
  }
}

export default new AnnouncementService()
