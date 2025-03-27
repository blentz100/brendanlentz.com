
import React, { useState, useEffect } from "react";
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, SandpackConsole, useSandpack } from "@codesandbox/sandpack-react";
const AutoClearConsole = () => {
  const { sandpack } = useSandpack();
  const [consoleKey, setConsoleKey] = useState(0);

  useEffect(() => {
    setConsoleKey((prev) => prev + 1);
  }, [sandpack.files["/index.js"].code]);

  return <SandpackConsole key={consoleKey} className="mt-2 border w-full min-h-[100px] bg-gray-100 rounded" />;
};

const CodePlayground = React.memo( () =>  {
  return (
    <div className="flex flex-col items-center p-4 w-full max-w-2xl mx-auto">
      <SandpackProvider
        template="vanilla"
        options={{ autoReload: true }}
        files={{
          "/index.js": {
            code: "console.log('Hello, world!');",
            active: true,
          },
        }}
      >
        <SandpackLayout>
          <SandpackCodeEditor className="w-full border rounded" />
        </SandpackLayout>
        <AutoClearConsole />
        <SandpackPreview className="mt-4 border w-full min-h-[100px] bg-gray-100 rounded" />
      </SandpackProvider>
    </div>
  );
});

export default CodePlayground;
