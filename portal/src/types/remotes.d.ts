declare module 'register/App' {
    const App: React.ComponentType;
    export default App;
}

declare module 'upload/App' {
    interface UploadProps {
      email?: string;
    }

    const Component: React.ComponentType<UploadProps>;
    export default Component;
  }