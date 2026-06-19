import { NextSeo } from "next-seo";
import Content from "../components/Content";
import PageTitle from "../components/PageTitle";
import SportsbookInsightsPlaceholder from "../components/sportsbook-insights/SportsbookInsightsPlaceholder";

const SportsbookInsights = () => {
  return (
    <>
      <NextSeo
        title="Sportsbook Insights"
        description="A serverless demo that transforms raw sportsbook market data into analytics-focused insights."
        openGraph={{
          title: "Sportsbook Insights",
        }}
      />

      <PageTitle>Sportsbook Insights</PageTitle>

      <Content>
        <SportsbookInsightsPlaceholder />
      </Content>
    </>
  );
};

export default SportsbookInsights;
