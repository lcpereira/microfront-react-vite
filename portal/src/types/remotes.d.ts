declare module 'project_a/App' {
    const App: React.ComponentType;
    export default App;
}

declare module 'project_b/App' {
    const App: React.ComponentType;
    export default App;
}

declare module 'project_c/App' {
    interface UploadProps {
      email?: string;
    }

    const Component: React.ComponentType<UploadProps>;
    export default Component;
  }