import { NextSeo } from "next-seo";
import Content from "../components/Content";
import PageTitle from "../components/PageTitle";
import SportsbookInsights from "../components/sportsbook-insights/SportsbookInsights";

const SportsbookInsightsPage = () => {
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
        <SportsbookInsights />
      </Content>
    </>
  );
};

export default SportsbookInsightsPage;
