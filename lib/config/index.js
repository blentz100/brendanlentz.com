// do not convert to ESM and/or TS -- this needs to be imported in CJS files like next.config.js too
module.exports = {
  // Site info
  siteName: "Brendan Lentz",
  siteDomain: "brendanlentz.com",
  siteLocale: "en-US",
  timeZone: "America/Phoenix", // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List
  baseUrl:
    // NOTE: no trailing slashes!
    process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" && process.env.NEXT_PUBLIC_VERCEL_URL !== undefined
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.IS_DEV_SERVER === true
      ? `http://localhost:${process.env.NEXT_DEV_PORT}`
      : "https://brendanlentz.com", // fallback to production URL
  onionDomain: "http://jarvis2i2vp4j4tbxjogsnqdemnte5xhzyi7hziiyzxwge3hzmh57zad.onion",
  shortDescription: "Brendan Lentz | Senior Software Engineer",
  longDescription:
    "Senior software engineer sharing ideas on building reliable software, simplifying systems, and taking ownership in engineering.",
  githubRepo: "blentz100/brendanlentz.com",
  webmentionId: "brendanlentz.com",
  giscusConfig: {
    // https://github.com/giscus/giscus-component/
    repo: "blentz100/brendanlentz.com",
    repoId: "R_kgDOHgGQIA",
    category: "General",
    categoryId: "DIC_kwDOHgGQIM4CQV7x",
  },

  // Me info
  authorName: "Brendan Lentz",
  authorEmail: "brendan.lentz@gmail.com",
  authorSocial: {
    github: "blentz100",
    linkedin: "brendanlentz",
  },
};
