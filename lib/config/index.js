// do not convert to ESM and/or TS -- this needs to be imported in CJS files like next.config.js too
module.exports = {
  // Site info
  siteName: "Brendan Lentz",
  siteDomain: "jarv.is",
  siteLocale: "en-US",
  timeZone: "America/Phoenix", // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List
  baseUrl:
    // NOTE: no trailing slashes!
    process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" &&
    process.env.NEXT_PUBLIC_VERCEL_URL !== undefined
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.IS_DEV_SERVER === true
      ? `http://localhost:${process.env.NEXT_DEV_PORT}`
      : "https://jarv.is", // fallback to production URL
  onionDomain:
    "http://jarvis2i2vp4j4tbxjogsnqdemnte5xhzyi7hziiyzxwge3hzmh57zad.onion",
  shortDescription: "Front-End Web Developer in Phoenix, AZ",
  longDescription:
    "Hi there! I'm a frontend web developer based in Phoenix, Arizona specializing in the Javascript and React.",
  githubRepo: "blentz100/homepage/",
  verifyGoogle: "qQhmLTwjNWYgQ7W42nSTq63xIrTch13X_11mmxBE9zk",
  verifyBing: "164551986DA47F7F6FC0D21A93FFFCA6",
  fathomSiteId: "PIUEIVIZ",
  webmentionId: "jarv.is",
  giscusConfig: {
    // https://github.com/giscus/giscus-component/
    repo: "blentz100/homepage",
    repoId: "R_kgDOHgGQIA",
    category: "General",
    categoryId: "DIC_kwDOHgGQIM4CQV7x",
  },

  // Me info
  authorName: "Brendan Lentz",
  authorEmail: "jake@jarv.is",
  authorSocial: {
    github: "blentz100",
    twitter: "jakejarvis",
    facebook: "jakejarvis",
    keybase: "jakejarvis",
    medium: "jakejarvis",
    linkedin: "jakejarvis",
    instagram: "jakejarvis",
  },
};
