import { Sandpack } from "@codesandbox/sandpack-react";
import React from "react";

const Editor = React.memo(() => {
  return (
    <Sandpack
      template="vanilla"
      options={{
        layout: "preview", 
        showConsole: true,
        showInlineErrors: true,
      }}
    />
);
});

export default Editor;
