import React, { useEffect } from 'react';
import { Link, Navigate, redirect, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CheckUser } from './slicer/authSlicer';

const ProtectedRoute = ({ children }) => {

    const dispatch = useDispatch()
    const status = useSelector((state) => state.auth.status)
    const isAuthenticated = !!localStorage.getItem('skyn_token'); // Check if token exists

    return (
        isAuthenticated ? children : <Navigate to="/login" />
    );
};

export default ProtectedRoute;
