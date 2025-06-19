import { create } from "zustand";

export const authStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isLoggingIn: false,
    isSigningIn: false,
    isAdmin:false,

    checkAuth: async () => {
        try {
            const token = localStorage.getItem("user");
            const role = localStorage.getItem("role");
            if(!token && !role){
                set({ authUser: null, isCheckingAuth: false });
                return;
            }
            if(role === "Admin"){
                set({ isAdmin: true });
            }
            set({ authUser: token, isCheckingAuth: false });
        } catch (error) {
            console.error("Error in checkAuth:", error.message);
            set({ isCheckingAuth: false }); // Ensure state updates even on error
        }
    }
}));
