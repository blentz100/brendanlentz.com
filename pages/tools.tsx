import { NextSeo } from "next-seo";
import Content from "../components/Content";
import PageTitle from "../components/PageTitle";
import { Button, CopyButton, Grid, Text } from "@mantine/core";
import { useEffect, useState } from "react";

const Tools = () => {
  const [reactUnixTimeStampInMilliseconds, setReactUnixTimeStampInMilliseconds] = useState(Date.now());
  const [reactUnixTimeStampInSeconds, setReactUnixTimeStampInSeconds] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setReactUnixTimeStampInMilliseconds(Math.floor(Date.now()));
      setReactUnixTimeStampInSeconds(Math.floor(Date.now() / 1000));
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
            <Text suppressHydrationWarning>
              Current React Unix Time in Milliseconds: {reactUnixTimeStampInMilliseconds}
            </Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <CopyButton value={reactUnixTimeStampInMilliseconds.toString()}>
              {({ copied, copy }) => (
                <Button color={copied ? "teal" : "blue"} onClick={copy}>
                  {copied ? "Copied timestamp" : "Copy" + " timestamp"}
                </Button>
              )}
            </CopyButton>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={7} style={{ alignContent: "center" }}>
            <Text suppressHydrationWarning>Current React Unix Time in Seconds: {reactUnixTimeStampInSeconds}</Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <CopyButton value={reactUnixTimeStampInSeconds.toString()}>
              {({ copied, copy }) => (
                <Button color={copied ? "teal" : "blue"} onClick={copy}>
                  {copied ? "Copied timestamp" : "Copy" + " timestamp"}
                </Button>
              )}
            </CopyButton>
          </Grid.Col>
        </Grid>
      </Content>
    </>
  );
};

export default Tools;
