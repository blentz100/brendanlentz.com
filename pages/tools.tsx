import { NextSeo } from "next-seo";
import Content from "../components/Content";
import PageTitle from "../components/PageTitle";
import { Button, CopyButton, Grid, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import CodePlayground from "./editor";
import NormalizeTool from "./tools/NormalizeTool";
import { styled } from "../lib/styles/stitches.config";

const ToolSection = styled("section", {
  marginTop: "3rem",

  "&:first-of-type": {
    marginTop: 0,
  },
});

const ToolHeading = styled("h2", {
  margin: "0 0 0.75rem 0",
  fontSize: "1.35rem",
  lineHeight: 1.2,
  color: "$text",
});

const Tools = () => {
  const [unixTimeStampInMilliseconds, setUnixTimeStampInMilliseconds] = useState(Date.now());
  const [unixTimeStampInSeconds, setUnixTimeStampInSeconds] = useState(Date.now());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setUnixTimeStampInMilliseconds(Math.floor(Date.now()));
      setUnixTimeStampInSeconds(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <NextSeo
        title="Tools"
        openGraph={{
          title: "Tools",
        }}
      />

      <PageTitle>Tools</PageTitle>

      <Content>
        <ToolSection>
          <ToolHeading>Unix Time</ToolHeading>
          <Grid>
            <Grid.Col span={7} style={{ alignContent: "center" }}>
              <Text suppressHydrationWarning>Current Unix Time in Milliseconds: {unixTimeStampInMilliseconds}</Text>
            </Grid.Col>
            <Grid.Col span={4}>
              <CopyButton value={unixTimeStampInMilliseconds.toString()}>
                {({ copied, copy }) => (
                  <Button color={copied ? "teal" : "blue"} onClick={copy}>
                    {copied ? `Copied timestamp` : "Copy" + " timestamp"}
                  </Button>
                )}
              </CopyButton>
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={7} style={{ alignContent: "center" }}>
              <Text suppressHydrationWarning>Current Unix Time in Seconds: {unixTimeStampInSeconds}</Text>
            </Grid.Col>
            <Grid.Col span={4}>
              <CopyButton value={unixTimeStampInSeconds.toString()}>
                {({ copied, copy }) => (
                  <Button color={copied ? "teal" : "blue"} onClick={copy}>
                    {copied ? "Copied timestamp" : "Copy" + " timestamp"}
                  </Button>
                )}
              </CopyButton>
            </Grid.Col>
          </Grid>
        </ToolSection>

        <ToolSection>
          <ToolHeading>Text Normalizer</ToolHeading>
          <NormalizeTool />
        </ToolSection>

        <ToolSection>
          <ToolHeading>Code Playground</ToolHeading>
          <CodePlayground />
        </ToolSection>
      </Content>
    </>
  );
};

export default Tools;
