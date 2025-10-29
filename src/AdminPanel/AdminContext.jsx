import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import { db } from "../firebase";
import {
    collection,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    arrayUnion,
    onSnapshot,
    getDoc,
    setDoc
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

export const AdminContext = createContext();

export default function AdminProvider({ children }) {
    // Consume the definitive userRole directly from AuthContext
    const { currentUser, userRole } = useContext(AuthContext);

    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [helpMessages, setHelpMessages] = useState([]);
    const [getInTouchMessages, setGetInTouchMessages] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [slideshowImages, setSlideshowImages] = useState([]);
    const [siteSettings, setSiteSettings] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        // We already have the correct userRole from context, no need to calculate it.
        const unsubscribers = [];

        // --- PUBLIC DATA LISTENERS ---
        unsubscribers.push(onSnapshot(doc(db, "siteSettings", "config"), (doc) => { setSiteSettings(doc.exists() ? doc.data() : {}); }));
        unsubscribers.push(onSnapshot(collection(db, "products"), (snapshot) => { setProducts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))); }));
        unsubscribers.push(onSnapshot(query(collection(db, "categories"), orderBy("name")), (snapshot) => { setCategories(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))); }));
        unsubscribers.push(onSnapshot(query(collection(db, "shopSlideshow"), orderBy("createdAt", "desc")), (snapshot) => { setSlideshowImages(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))); }));

        // --- ADMIN/STAFF DATA LISTENERS ---
        const isAuthorized = ['admin', 'staff', 'delivery'].includes(userRole);
        if (isAuthorized) {
            const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"));
            unsubscribers.push(onSnapshot(ordersQuery, (snapshot) => {
                const updatedOrders = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, createdAt: doc.data().createdAt?.toDate(), updatedAt: doc.data().updatedAt?.toDate(), lastStatusUpdate: doc.data().lastStatusUpdate?.toDate() }));
                setOrders(updatedOrders);
            }));

            if (userRole === 'admin') {
                unsubscribers.push(onSnapshot(query(collection(db, "reviews"), orderBy("createdAt", "desc")), (snapshot) => { setReviews(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))); }));
                unsubscribers.push(onSnapshot(collection(db, "users"), (snapshot) => { setUsers(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))); }));
                unsubscribers.push(onSnapshot(query(collection(db, "helpMessages"), orderBy("createdAt", "desc")), (snapshot) => { setHelpMessages(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))); }));
                unsubscribers.push(onSnapshot(query(collection(db, "subscribers"), orderBy("subscribedAt", "desc")), (snapshot) => { setSubscribers(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))); }));
                unsubscribers.push(onSnapshot(query(collection(db, "getInTouch"), orderBy("createdAt", "desc")), (snapshot) => {
                    setGetInTouchMessages(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                }));
            }
        } else {
            setOrders([]);
            setReviews([]);
            setUsers([]);
            setHelpMessages([]);
            setSubscribers([]);
            setGetInTouchMessages([]);
        }

        setIsLoading(false);

        return () => { unsubscribers.forEach(unsub => unsub()); };
    }, [currentUser, userRole]); // Depend on userRole to re-evaluate when it changes

    // --- DATA MUTATION FUNCTIONS ---
    const addProduct = (product) => addDoc(collection(db, "products"), product);
    const updateProduct = (productId, updatedProduct) => updateDoc(doc(db, "products", productId), updatedProduct);
    const deleteProduct = (productId) => deleteDoc(doc(db, "products", productId));
    const addCategory = (categoryData) => addDoc(collection(db, "categories"), categoryData);
    const updateCategory = (id, updatedData) => updateDoc(doc(db, "categories", id), updatedData);
    const deleteCategory = (id) => deleteDoc(doc(db, "categories", id));
    const addSlideshowImage = (imageData) => addDoc(collection(db, "shopSlideshow"), { ...imageData, createdAt: new Date() });
    const deleteSlideshowImage = (id) => deleteDoc(doc(db, "shopSlideshow", id));
    const updateSiteSetting = (key, value) => setDoc(doc(db, "siteSettings", "config"), { [key]: value }, { merge: true });
    const addOrder = async (orderData) => { const docRef = await addDoc(collection(db, "orders"), orderData); return docRef.id; };
    const updateOrderStatus = (orderId, status) => updateDoc(doc(db, "orders", orderId), { status, updatedAt: new Date(), lastStatusUpdate: new Date() });
    const markProductAsReviewed = (orderId, productId) => updateDoc(doc(db, "orders", orderId), { reviewedProducts: arrayUnion(productId) });
    const addReview = (reviewData) => addDoc(collection(db, "reviews"), reviewData);
    const deleteReview = (reviewId) => deleteDoc(doc(db, "reviews", reviewId));
    const addHelpMessage = (messageData) => addDoc(collection(db, "helpMessages"), { ...messageData, isRead: false, createdAt: new Date() });
    const markHelpMessageAsRead = (messageId) => updateDoc(doc(db, "helpMessages", messageId), { isRead: true });
    const deleteHelpMessage = (messageId) => deleteDoc(doc(db, "helpMessages", messageId));
    const deleteSubscriber = (subscriberId) => deleteDoc(doc(db, "subscribers", subscriberId));
    const getOrderById = async (orderId) => { const orderDocRef = doc(db, "orders", orderId); const orderSnap = await getDoc(orderDocRef); return orderSnap.exists() ? { id: orderSnap.id, ...orderSnap.data() } : null; };
    const listenToUserOrders = useCallback((userId, callback) => { if (!userId) return () => { }; const q = query(collection(db, "orders"), where("userId", "==", userId), orderBy("createdAt", "desc")); return onSnapshot(q, (snapshot) => callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))); }, []);
    const addGetInTouchMessage = (messageData) => addDoc(collection(db, "getInTouch"), { ...messageData, isRead: false, createdAt: new Date() });
    const markGetInTouchMessageAsRead = (messageId) => updateDoc(doc(db, "getInTouch", messageId), { isRead: true });
    const deleteGetInTouchMessage = (messageId) => deleteDoc(doc(db, "getInTouch", messageId));

    const contextValue = {
        products, orders, categories, reviews, users, helpMessages, getInTouchMessages, slideshowImages, siteSettings, isLoading, subscribers,
        addProduct, updateProduct, deleteProduct,
        addCategory, updateCategory, deleteCategory,
        addSlideshowImage, deleteSlideshowImage,
        updateSiteSetting,
        addOrder, updateOrderStatus, getOrderById, listenToUserOrders,
        addReview, markProductAsReviewed, deleteReview,
        addHelpMessage, markHelpMessageAsRead, deleteHelpMessage,
        addGetInTouchMessage, markGetInTouchMessageAsRead, deleteGetInTouchMessage,
        deleteSubscriber
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};