import fetch from "cross-fetch";
import numeral from "numeral";
import canonicalUrl from "get-canonical-url";
import urlParse from "url-parse";

// API endpoint
const HITS_ENDPOINT = "/api/hits/";

// don't continue if there isn't a span#meta-hits element on this page
const wrapper = document.getElementById("meta-hits");

// use <link rel="canonical"> to deduce a consistent identifier for this page
const canonical = canonicalUrl({
  normalize: true,
  normalizeOptions: {
    removeTrailingSlash: true,
    removeQueryParameters: true,
    stripHash: true,
  },
});

// page must have both span#meta-hits and canonical URL to enter
if (wrapper && canonical) {
  // javascript is enabled so show the loading indicator
  wrapper.style.display = "inline-flex";

  // get path and strip beginning and ending forward slash
  const slug = urlParse(canonical).pathname.replace(/^\/|\/$/g, "");

  fetch(`${HITS_ENDPOINT}?slug=${encodeURIComponent(slug)}`)
    .then((response) => response.json())
    .then((data) => {
      // pretty number and units
      const hitsComma = numeral(data.hits).format("0,0");
      const hitsPlural = data.hits === 1 ? "view" : "views";
      wrapper.title = `${hitsComma} ${hitsPlural}`;

      // finally inject the hits...
      const counter = document.getElementById("meta-hits-counter");
      if (counter) {
        counter.appendChild(document.createTextNode(hitsComma));
      }

      // ...and hide the loading spinner
      const spinner = document.getElementById("meta-hits-loading");
      if (spinner) {
        spinner.style.display = "none";
      }
    })
    .catch(() => {
      // something went horribly wrong, initiate coverup
      wrapper.style.display = "none";
    });
}
