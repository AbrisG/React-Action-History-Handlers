import "./App.css";
import ActionStackProvider from "./components/ActionStackProvider";
import withActionStack from "./components/withActionStack";

import ProviderObject from "./components/ProviderObject";
import HocObject from "./components/HocObject";
import HookObject from "./components/HookObject";

function App() {
  //not providing the onUpdate function for the sake of the demonstration
  const HocObjectWithActionStack = withActionStack(HocObject, {
    initialValue: { dev: true, qa: false },
  });
  return (
    <div className="App">
      <header className="App-header">
        <HocObjectWithActionStack />
        <HookObject />
        {/* not providing the onUpdate function for the sake of the demonstration */}
        <ActionStackProvider initialValue={{ dev: true, qa: false }}>
          <ProviderObject />
        </ActionStackProvider>
      </header>
    </div>
  );
}

export default App;
