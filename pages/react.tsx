import { nextseo } from "next-seo";
import Content from "../components/Content";
import PageTitle from "../components/PageTitle";
import Link from "../components/Link";
import Image from "../components/Image";
import Blockquote from "../components/Blockquote";
import CodeBlock from "../components/CodeBlock";
import { H2 } from "../components/Heading";
import { UnorderedList, ListItem } from "../components/List";
import { useState } from "react";

const React = () => {
  const [name, setName] = useState("");
  const useStateSnippet = `
    const React = () => {
      const [name, setName] = useState("");
      return (
        <>
          <H2>basic useState hooks example</H2>
          Whatever gets input here :
          <input onChange={(e) => { setName(e.target.value) }} />
          <br />
          Should also show up here: <span>{name}</span>
        </>
      )};
  `;

  return (
    <>
      <div>
        <div>
          <H2>basic useState hooks example</H2>
          Whatever gets input here :
          <input
            maxLength={17}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          Should also show up here: <span>{name}</span>
        </div>
        <div>
          <pre>
            <code>
              <CodeBlock>{useStateSnippet}</CodeBlock>
            </code>
          </pre>
        </div>
      </div>
    </>
  );
};

export default React;
