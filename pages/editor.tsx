import React, { useState, useEffect } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
  useSandpack,
  defaultDark,
  defaultLight,
} from "@codesandbox/sandpack-react";
import { useTheme } from "../hooks/use-theme";

const AutoClearConsole = () => {
  const { sandpack } = useSandpack();
  const [consoleKey, setConsoleKey] = useState(0);

  useEffect(() => {
    setConsoleKey((prev) => prev + 1);
  }, [sandpack.files["/index.js"].code]);

  return <SandpackConsole key={consoleKey} className="mt-2 border w-full min-h-[100px] rounded" />;
};

const CodePlayground = React.memo( () =>  {
  const { activeTheme } = useTheme();
  const sandpackTheme =
    activeTheme === "dark"
      ? {
          ...defaultDark,
          colors: {
            ...defaultDark.colors,
            surface1: "#111827",
            surface2: "#1f2937",
            surface3: "#374151",
            base: "#f3f4f6",
            clickable: "#d1d5db",
            hover: "#9ca3af",
            accent: "#60a5fa",
            disabled: "#6b7280",
          },
        }
      : defaultLight;

  return (
    <div className="flex flex-col items-center p-4 w-full max-w-2xl mx-auto">
      <SandpackProvider
        key={activeTheme || "light"}
        template="vanilla"
        theme={sandpackTheme}
        options={{ autoReload: true }}
        files={{
          "/index.js": {
            code: `import "./styles.css";

const root = document.getElementById("app");

root.innerHTML = \`
  <div class="preview-card">
    <h1>Sandbox Preview</h1>
    <p>Edit the code to see changes here.</p>
  </div>
\`;

console.log("Hello, world!");`,
            active: true,
          },
          "/styles.css": {
            code: `:root {
  color-scheme: ${activeTheme === "dark" ? "dark" : "light"};
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: ${activeTheme === "dark" ? "#111827" : "#f3f4f6"};
  color: ${activeTheme === "dark" ? "#f3f4f6" : "#111827"};
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.preview-card {
  width: min(100%, 28rem);
  padding: 1.5rem;
  border: 1px solid ${activeTheme === "dark" ? "#374151" : "#d1d5db"};
  border-radius: 0.75rem;
  background: ${activeTheme === "dark" ? "#1f2937" : "#ffffff"};
  text-align: center;
}

.preview-card h1 {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
}

.preview-card p {
  margin: 0;
  color: ${activeTheme === "dark" ? "#d1d5db" : "#4b5563"};
}`,
          },
        }}
      >
        <SandpackLayout>
          <SandpackCodeEditor className="w-full border rounded" />
        </SandpackLayout>
        <SandpackPreview
          showOpenInCodeSandbox={false}
          className="mt-4 border w-full rounded"
          style={{ height: 220 }}
        />
        <AutoClearConsole />
      </SandpackProvider>
    </div>
  );
});

export default CodePlayground;
