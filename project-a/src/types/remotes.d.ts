declare module 'portal/Login' {
    const Component: React.ComponentType;
    export default Component;
}

declare module 'portal/authStore' {
    export const useAuthStore: <T>(selector: (state) => T) => T;
}
