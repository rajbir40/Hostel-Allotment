import React, { createContext, useState, useEffect } from 'react';

// Create a UserContext
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check if user data exists in localStorage when the app loads
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser)); // Set the user if found
        }
    }, []);

    // Function to log in (for demo purposes)
    const login = (userData) => {
        setUser(userData); // Update the context with user data
        localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
    };

    // Function to log out
    const logout = () => {
        setUser(null); // Clear user data in context
        localStorage.removeItem('user'); // Remove user data from localStorage
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
