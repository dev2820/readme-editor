import { BlockEditor } from './components/BlockEditor';
import { Button } from './components/ui/Button';

function App() {
  return (
    <>
      <main className="w-full">
        <div className="flex flex-row justify-center overflow-hidden">
          <div className="w-200 h-160 overflow-auto">
            <BlockEditor></BlockEditor>
          </div>
        </div>
        <Button>Hello World</Button>
      </main>
    </>
  );
}

export default App;
