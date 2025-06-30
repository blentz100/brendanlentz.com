import { NextSeo } from "next-seo";
import Content from "../components/Content";
import PageTitle from "../components/PageTitle";
import { Button, CopyButton, Grid, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import CodePlayground from "./editor";

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
        <CodePlayground/>
      </Content>
    </>
  );
};

export default Tools;
