import { useState, useEffect, useRef } from "react";
import { styled, keyframes } from "../../lib/styles/stitches.config";

// ── Mock data ──────────────────────────────────────────────────────────────────

const TRANSFER = {
  recipient: "First National Bank",
  bankName: "First National Bank",
  amount: 150000000,
  memo: "Series D",
  deliveryEstimate: "Same business day",
};

type TimelineStatus = "complete" | "active" | "pending";

interface TimelineStep {
  label: string;
  status: TimelineStatus;
  detail: string;
}

const TIMELINE: TimelineStep[] = [
  {
    label: "Transfer submitted",
    status: "complete",
    detail: "Request received and logged with a reference ID.",
  },
  {
    label: "Security review",
    status: "complete",
    detail: "Transfer details passed automated risk and account checks.",
  },
  {
    label: "Sent to partner bank",
    status: "active",
    detail: "The transfer is being routed through the banking network.",
  },
  {
    label: "Receiving institution",
    status: "pending",
    detail: "Awaiting acceptance from the recipient's bank.",
  },
  {
    label: "Funds delivered",
    status: "pending",
    detail: "Expected same business day if accepted before cutoff.",
  },
];

// ── Routing number validation ─────────────────────────────────────────────────

// ABA mod-10 weighted checksum (public algorithm, same as printed on checks)
function validateRoutingNumber(rtn: string): boolean {
  if (!/^\d{9}$/.test(rtn)) return false;
  const weights = [3, 7, 1, 3, 7, 1, 3, 7, 1];
  const sum = rtn.split("").reduce((acc, d, i) => acc + parseInt(d, 10) * weights[i], 0);
  return sum % 10 === 0;
}

interface BankEntry { name: string; routing: string }
const BANK_DIRECTORY: BankEntry[] = [
  { name: "Abilene Teachers FCU", routing: "076008641" },
  { name: "Academy Bank", routing: "102003154" },
  { name: "Achieva Credit Union", routing: "114024642" },
  { name: "Advia Credit Union", routing: "272480678" },
  { name: "Affinity Federal Credit Union", routing: "118519687" },
  { name: "Alerus Financial", routing: "091300023" },
  { name: "Allegacy Federal Credit Union", routing: "253177049" },
  { name: "Alliant Credit Union", routing: "271081528" },
  { name: "Ally Bank", routing: "124003116" },
  { name: "Amalgamated Bank", routing: "026007411" },
  { name: "Amerant Bank", routing: "066086400" },
  { name: "America First Credit Union", routing: "324377516" },
  { name: "American Airlines Credit Union", routing: "303085772" },
  { name: "American Bank", routing: "105360962" },
  { name: "American Express National Bank", routing: "124085066" },
  { name: "American National Bank", routing: "104000016" },
  { name: "American Savings Bank", routing: "321379885" },
  { name: "Ameris Bank", routing: "061104119" },
  { name: "Anchor Bank", routing: "091215927" },
  { name: "Apple Bank for Savings", routing: "026001648" },
  { name: "Arvest Bank", routing: "082900872" },
  { name: "Associated Bank", routing: "075911988" },
  { name: "Atlantic Capital Bank", routing: "061121748" },
  { name: "Axos Bank", routing: "122287251" },
  { name: "Bank of America", routing: "026009593" },
  { name: "Bank of America — CA", routing: "121000358" },
  { name: "Bank of America — FL", routing: "063100277" },
  { name: "Bank of America — TX", routing: "111000025" },
  { name: "Bank of Hawaii", routing: "121301015" },
  { name: "Bank of Hope", routing: "122244184" },
  { name: "Bank of the West", routing: "121100782" },
  { name: "Bank OZK", routing: "082900321" },
  { name: "Banner Bank", routing: "123208028" },
  { name: "Baxter Credit Union", routing: "271025054" },
  { name: "Beacon Credit Union", routing: "274972056" },
  { name: "BECU", routing: "325081403" },
  { name: "Bellco Credit Union", routing: "302075023" },
  { name: "Beneficial Bank", routing: "236084285" },
  { name: "Bethpage Federal Credit Union", routing: "021202220" },
  { name: "BMO Harris Bank", routing: "071025661" },
  { name: "BOK Financial", routing: "103900036" },
  { name: "Bremer Bank", routing: "091000022" },
  { name: "Busey Bank", routing: "071102073" },
  { name: "California Bank & Trust", routing: "121002042" },
  { name: "Capital City Bank", routing: "063113057" },
  { name: "Capital One", routing: "056073612" },
  { name: "Capital One — NY", routing: "021407912" },
  { name: "Capital One — TX", routing: "111901014" },
  { name: "Capitol Federal Savings", routing: "101089742" },
  { name: "Carver Federal Savings Bank", routing: "021606353" },
  { name: "Cathay Bank", routing: "122016066" },
  { name: "Centennial Bank", routing: "082000549" },
  { name: "Central Bank", routing: "082907966" },
  { name: "Central Pacific Bank", routing: "121301126" },
  { name: "Century Bank", routing: "011304478" },
  { name: "Charles Schwab Bank", routing: "121202211" },
  { name: "Chemical Financial", routing: "072413829" },
  { name: "Choice Financial Group", routing: "092900383" },
  { name: "Citibank", routing: "021000089" },
  { name: "Citibank — CA", routing: "321171184" },
  { name: "Citibank — TX", routing: "113193532" },
  { name: "Citizens Bank", routing: "011500010" },
  { name: "Citizens Community Credit Union", routing: "291976971" },
  { name: "City National Bank", routing: "122016066" },
  { name: "Clearwater Credit Union", routing: "292976227" },
  { name: "Coastal Federal Credit Union", routing: "253279625" },
  { name: "Columbia Bank", routing: "323271627" },
  { name: "Columbia Credit Union", routing: "323078877" },
  { name: "Comerica Bank", routing: "072000096" },
  { name: "Commerce Bank", routing: "081000210" },
  { name: "Community Bank", routing: "021302648" },
  { name: "Community First Credit Union", routing: "291471024" },
  { name: "Congressional Bank", routing: "055001096" },
  { name: "ConnectOne Bank", routing: "021205486" },
  { name: "Cornerstone Bank", routing: "091402378" },
  { name: "Coulee Bank", routing: "091813088" },
  { name: "Credit Human Federal Credit Union", routing: "314088637" },
  { name: "Credit Union One", routing: "272480114" },
  { name: "Dacotah Bank", routing: "091400630" },
  { name: "Delta Community Credit Union", routing: "261071315" },
  { name: "Deseret First Credit Union", routing: "324377820" },
  { name: "Desert Financial Credit Union", routing: "122187238" },
  { name: "Dime Community Bank", routing: "021606749" },
  { name: "Discover Bank", routing: "031100649" },
  { name: "Dollar Bank", routing: "043309812" },
  { name: "Dupaco Community Credit Union", routing: "273975004" },
  { name: "Eagle Bank", routing: "055002707" },
  { name: "East West Bank", routing: "322070381" },
  { name: "Eastern Bank", routing: "011301798" },
  { name: "Elements Financial Credit Union", routing: "274471981" },
  { name: "ELGA Credit Union", routing: "272479177" },
  { name: "Empower Federal Credit Union", routing: "221381479" },
  { name: "Emprise Bank", routing: "101100045" },
  { name: "Ent Credit Union", routing: "302075492" },
  { name: "Enterprise Bank & Trust", routing: "081025092" },
  { name: "Envision Credit Union", routing: "263279282" },
  { name: "Equity Bank", routing: "101103429" },
  { name: "Everbank", routing: "063000225" },
  { name: "Exchange Bank", routing: "121104730" },
  { name: "Fairwinds Credit Union", routing: "263181368" },
  { name: "Farm Bureau Bank", routing: "311175093" },
  { name: "Farmers & Merchants Bank", routing: "122201580" },
  { name: "Farmers Bank & Trust", routing: "082913736" },
  { name: "Farmers State Bank", routing: "073901591" },
  { name: "Fifth Third Bank", routing: "042000314" },
  { name: "Fifth Third Bank — MI", routing: "072402473" },
  { name: "First Alliance Credit Union", routing: "291381105" },
  { name: "First American Bank", routing: "071119434" },
  { name: "First Busey Bank", routing: "071103619" },
  { name: "First Citizens Bank", routing: "053100300" },
  { name: "First Command Bank", routing: "111017694" },
  { name: "First Commonwealth Bank", routing: "043318092" },
  { name: "First Community Bank", routing: "051409677" },
  { name: "First Federal Savings", routing: "323070867" },
  { name: "First Financial Bank", routing: "042104428" },
  { name: "First Financial Federal Credit Union", routing: "265473538" },
  { name: "First Florida Credit Union", routing: "263177902" },
  { name: "First Hawaiian Bank", routing: "121301028" },
  { name: "First Horizon Bank", routing: "084000026" },
  { name: "First Internet Bank", routing: "074908594" },
  { name: "First Merchants Bank", routing: "074901752" },
  { name: "First Midwest Bank", routing: "071901604" },
  { name: "First National Bank", routing: "123456780" },
  { name: "First National Bank Alaska", routing: "325100065" },
  { name: "First National Bank of Omaha", routing: "104000016" },
  { name: "First Republic Bank", routing: "321081669" },
  { name: "First Savings Bank", routing: "074908883" },
  { name: "First Security Bank", routing: "092902294" },
  { name: "First State Bank", routing: "104102702" },
  { name: "First Tech Federal Credit Union", routing: "321180379" },
  { name: "First United Bank", routing: "111901115" },
  { name: "FirstBank", routing: "107002192" },
  { name: "Flagstar Bank", routing: "272471548" },
  { name: "Flushing Bank", routing: "021404161" },
  { name: "Founders Federal Credit Union", routing: "253178002" },
  { name: "Frost Bank", routing: "114000093" },
  { name: "Fulton Bank", routing: "031302955" },
  { name: "Gate City Bank", routing: "092901683" },
  { name: "GECU", routing: "312081089" },
  { name: "Genco Federal Credit Union", routing: "313185515" },
  { name: "Georgia's Own Credit Union", routing: "261070472" },
  { name: "Glacier Bank", routing: "092900203" },
  { name: "Golden 1 Credit Union", routing: "321175261" },
  { name: "Goldenwest Credit Union", routing: "324377199" },
  { name: "Government Employees Credit Union", routing: "314977200" },
  { name: "Granite State Credit Union", routing: "011401148" },
  { name: "Great Lakes Credit Union", routing: "271991802" },
  { name: "Greater Nevada Credit Union", routing: "322484401" },
  { name: "GreenState Credit Union", routing: "273976369" },
  { name: "Gulf Coast Bank & Trust", routing: "065402220" },
  { name: "Happy State Bank", routing: "111318960" },
  { name: "Harborstone Credit Union", routing: "325181028" },
  { name: "Heartland Bank", routing: "073901855" },
  { name: "Heritage Credit Union", routing: "275978097" },
  { name: "Hills Bank and Trust", routing: "073900938" },
  { name: "Home Federal Savings Bank", routing: "092900811" },
  { name: "HomeStreet Bank", routing: "325181928" },
  { name: "Honor Credit Union", routing: "272479201" },
  { name: "Horizon Bank", routing: "071212128" },
  { name: "HSBC Bank USA", routing: "021001088" },
  { name: "Huntington National Bank", routing: "044000024" },
  { name: "IBERIABANK", routing: "065403626" },
  { name: "Idaho Central Credit Union", routing: "324173183" },
  { name: "Illinois National Bank", routing: "071121151" },
  { name: "Inland Bank and Trust", routing: "071003829" },
  { name: "Investors Bank", routing: "021202960" },
  { name: "Iowa State Bank", routing: "073902977" },
  { name: "JPMorgan Chase", routing: "021000021" },
  { name: "JPMorgan Chase — CA", routing: "322271627" },
  { name: "JPMorgan Chase — IL", routing: "071000013" },
  { name: "JPMorgan Chase — OH", routing: "044000037" },
  { name: "JPMorgan Chase — TX", routing: "111000614" },
  { name: "Jewett City Savings Bank", routing: "211176382" },
  { name: "Kellogg Community Credit Union", routing: "272481749" },
  { name: "KeyBank", routing: "041001039" },
  { name: "KeyBank — NY", routing: "021300077" },
  { name: "KeyBank — OR", routing: "323271627" },
  { name: "Kinecta Federal Credit Union", routing: "322281507" },
  { name: "Knoxville TVA Employees Credit Union", routing: "264281578" },
  { name: "Lake Trust Credit Union", routing: "272479955" },
  { name: "LakeCity Bank", routing: "074908921" },
  { name: "Landmark Credit Union", routing: "275978250" },
  { name: "Latino Community Credit Union", routing: "253278741" },
  { name: "LendingClub Bank", routing: "124003116" },
  { name: "Liberty Bank", routing: "211175212" },
  { name: "Liberty Bay Credit Union", routing: "211382109" },
  { name: "Liberty Federal Credit Union", routing: "281282070" },
  { name: "Live Oak Bank", routing: "053112929" },
  { name: "Lone Star National Bank", routing: "114907603" },
  { name: "Los Angeles Federal Credit Union", routing: "322282603" },
  { name: "M&T Bank", routing: "022000046" },
  { name: "Mayo Employees Federal Credit Union", routing: "291481839" },
  { name: "MECU Credit Union", routing: "252070467" },
  { name: "Members 1st Credit Union", routing: "231379874" },
  { name: "Members Credit Union", routing: "253278466" },
  { name: "Merrimack Valley Credit Union", routing: "211489655" },
  { name: "Metropolitan Commercial Bank", routing: "026013576" },
  { name: "Mid America Credit Union", routing: "302079426" },
  { name: "MidFirst Bank", routing: "103112675" },
  { name: "Midwest BankCentre", routing: "081009428" },
  { name: "Mission Federal Credit Union", routing: "322281892" },
  { name: "Mountain America Credit Union", routing: "324079555" },
  { name: "Municipal Credit Union", routing: "026004695" },
  { name: "National Bank of Commerce", routing: "084301114" },
  { name: "National Penn Bank", routing: "031318354" },
  { name: "Navy Federal Credit Union", routing: "256074974" },
  { name: "NBT Bank", routing: "022000020" },
  { name: "New York Community Bank", routing: "021407912" },
  { name: "North Shore Bank", routing: "275978023" },
  { name: "Northwest Community Credit Union", routing: "323075880" },
  { name: "Northwest Federal Credit Union", routing: "255075576" },
  { name: "Northwest Savings Bank", routing: "043318168" },
  { name: "Numerica Credit Union", routing: "325182378" },
  { name: "OceanFirst Bank", routing: "021201943" },
  { name: "Ohio Valley Bank", routing: "044103536" },
  { name: "Old National Bank", routing: "071712179" },
  { name: "Old Second National Bank", routing: "071912668" },
  { name: "OneAZ Credit Union", routing: "122187433" },
  { name: "Oregon Community Credit Union", routing: "323075749" },
  { name: "ORNL Federal Credit Union", routing: "264279180" },
  { name: "Pacific City Bank", routing: "122253850" },
  { name: "Pacific Premier Bank", routing: "122242869" },
  { name: "Pacific Service Credit Union", routing: "321179420" },
  { name: "Park National Bank", routing: "044115809" },
  { name: "Patelco Credit Union", routing: "321076470" },
  { name: "Patriot Bank", routing: "211370545" },
  { name: "PenFed Credit Union", routing: "256078514" },
  { name: "Penn Community Bank", routing: "031318729" },
  { name: "Pentagon Federal Credit Union", routing: "256074974" },
  { name: "People First Federal Credit Union", routing: "231381468" },
  { name: "Peoples Bank", routing: "044115672" },
  { name: "Peoples Community Bank", routing: "111209923" },
  { name: "Pinnacle Bank", routing: "064209513" },
  { name: "Pioneer Bank", routing: "107083461" },
  { name: "Plumas Bank", routing: "121143600" },
  { name: "PNC Bank", routing: "043000096" },
  { name: "Ponce Financial Group", routing: "026013402" },
  { name: "Preferred Credit Union", routing: "272479283" },
  { name: "Premier America Credit Union", routing: "322282539" },
  { name: "Provident Bank", routing: "021913073" },
  { name: "Provident Credit Union", routing: "321177968" },
  { name: "QCR Holdings", routing: "071923613" },
  { name: "Quontic Bank", routing: "026015088" },
  { name: "Raymond James Bank", routing: "063100159" },
  { name: "Red River Bank", routing: "065301948" },
  { name: "Redstone Federal Credit Union", routing: "262275835" },
  { name: "Regions Bank", routing: "062000019" },
  { name: "ReliaBank", routing: "091409643" },
  { name: "Republic Bank", routing: "042100175" },
  { name: "Resource Center Credit Union", routing: "301179424" },
  { name: "Ridgewood Savings Bank", routing: "221476275" },
  { name: "River City Federal Credit Union", routing: "314977049" },
  { name: "River Valley Credit Union", routing: "242278980" },
  { name: "Riverview Bank", routing: "031309785" },
  { name: "SafeAmerica Credit Union", routing: "321177534" },
  { name: "Sallie Mae Bank", routing: "124085240" },
  { name: "San Diego County Credit Union", routing: "322281578" },
  { name: "Santander Bank", routing: "011075150" },
  { name: "Saratoga National Bank", routing: "021303729" },
  { name: "Schools First Federal Credit Union", routing: "322282001" },
  { name: "Scott Credit Union", routing: "281082471" },
  { name: "Seacoast Bank", routing: "267084580" },
  { name: "Security Service Federal Credit Union", routing: "314088637" },
  { name: "Service Credit Union", routing: "011401533" },
  { name: "Simmons Bank", routing: "082900432" },
  { name: "South State Bank", routing: "053207766" },
  { name: "Southeast Financial Credit Union", routing: "264281453" },
  { name: "Southside Bank", routing: "111920145" },
  { name: "Space Coast Credit Union", routing: "263182817" },
  { name: "State Employees Credit Union", routing: "253177049" },
  { name: "Sterling Bank", routing: "113122655" },
  { name: "Suncoast Credit Union", routing: "263177903" },
  { name: "SunTrust Bank", routing: "061000104" },
  { name: "Superior Credit Union", routing: "241282070" },
  { name: "Synovus Bank", routing: "061092387" },
  { name: "TD Bank", routing: "031101266" },
  { name: "TD Bank — ME", routing: "011600033" },
  { name: "Teachers Credit Union", routing: "271182978" },
  { name: "Texas Capital Bank", routing: "111017694" },
  { name: "Texas Tech Credit Union", routing: "311379433" },
  { name: "Third Federal Savings", routing: "241070953" },
  { name: "Tompkins Financial", routing: "021302994" },
  { name: "Tower Federal Credit Union", routing: "255074844" },
  { name: "Traditions Bank", routing: "031310687" },
  { name: "Tri Counties Bank", routing: "121141179" },
  { name: "TruMark Financial Credit Union", routing: "236084614" },
  { name: "Truist", routing: "053101121" },
  { name: "Truist — GA", routing: "061000104" },
  { name: "U.S. Bank", routing: "091000022" },
  { name: "U.S. Bank — CA", routing: "123103729" },
  { name: "UMB Bank", routing: "101000695" },
  { name: "Umpqua Bank", routing: "123205054" },
  { name: "Union Bank", routing: "122000496" },
  { name: "Union Savings Bank", routing: "211176232" },
  { name: "United Bank", routing: "051404260" },
  { name: "United Community Bank", routing: "061120084" },
  { name: "United Federal Credit Union", routing: "272483093" },
  { name: "United Nations Federal Credit Union", routing: "226078036" },
  { name: "University Credit Union", routing: "321180107" },
  { name: "University Federal Credit Union", routing: "314977405" },
  { name: "University of Iowa Community Credit Union", routing: "273975473" },
  { name: "USAA Federal Savings Bank", routing: "314074269" },
  { name: "UW Credit Union", routing: "275979507" },
  { name: "Valley National Bank", routing: "021201503" },
  { name: "Veridian Credit Union", routing: "273976671" },
  { name: "Vermont Federal Credit Union", routing: "211489181" },
  { name: "Vibe Credit Union", routing: "272480758" },
  { name: "Vibrant Credit Union", routing: "271183013" },
  { name: "Visions Federal Credit Union", routing: "222382292" },
  { name: "Washington Federal Bank", routing: "325070980" },
  { name: "Washington State Employees Credit Union", routing: "325182588" },
  { name: "WesBanco", routing: "043400036" },
  { name: "Wells Fargo", routing: "121042882" },
  { name: "Wells Fargo — CO", routing: "102000076" },
  { name: "Wells Fargo — TX", routing: "111900659" },
  { name: "West Michigan Community Bank", routing: "072412445" },
  { name: "Western Federal Credit Union", routing: "322281673" },
  { name: "WESTconsin Credit Union", routing: "291479873" },
  { name: "Wings Financial Credit Union", routing: "091908227" },
  { name: "Wintrust Bank", routing: "071000288" },
  { name: "Woodforest National Bank", routing: "114924742" },
  { name: "York Traditions Bank", routing: "031310695" },
  { name: "Zeal Credit Union", routing: "272480854" },
  { name: "Zions Bank", routing: "124000054" },
];

// ── Keyframes ─────────────────────────────────────────────────────────────────

const pulse = keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.35 },
});

// ── Styled components ─────────────────────────────────────────────────────────

const DemoWrapper = styled("div", {
  margin: "2rem 0 0",
});

const Section = styled("section", {
  marginTop: "3.5rem",

  "&:first-of-type": {
    marginTop: 0,
  },
});

// Demo card

const DemoCard = styled("div", {
  background: "$backgroundInner",
  border: "1px solid $kindaLight",
  borderRadius: "$rounded",
  boxShadow: "0 2px 16px rgba(0,0,0,0.055)",
  overflow: "hidden",
});

const CardHeader = styled("div", {
  padding: "1.1rem 1.6rem",
  borderBottom: "1px solid $kindaLight",
  background: "$superDuperLight",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.75rem",

  "@medium": {
    padding: "0.9rem 1.1rem",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "0.2rem",
  },
});

const CardTitle = styled("h2", {
  margin: 0,
  fontSize: "0.9rem",
  fontWeight: 600,
  color: "$mediumDark",
});

const StepIndicator = styled("span", {
  fontSize: "0.8rem",
  color: "$mediumLight",
  fontWeight: 500,
  whiteSpace: "nowrap",
});

const CardBody = styled("div", {
  padding: "1.6rem",

  "@medium": {
    padding: "1.2rem 1.1rem",
  },
});

// Transfer fields

const FieldGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1.1rem",

  "@medium": {
    gridTemplateColumns: "1fr",
  },
});

const Field = styled("div", {
  display: "grid",
  gap: "0.2rem",
});

const FieldLabel = styled("span", {
  fontSize: "0.75rem",
  fontWeight: 500,
  color: "$mediumLight",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

const FieldValue = styled("span", {
  fontSize: "0.975rem",
  color: "$text",
  fontWeight: 500,
  lineHeight: 1.4,
});

const AmountInput = styled("input", {
  fontFamily: "$mono",
  fontSize: "0.95rem",
  fontWeight: 500,
  color: "$text",
  letterSpacing: "0.04em",
  background: "$backgroundInner",
  border: "1px solid $light",
  borderRadius: "0.4rem",
  padding: "0.45rem 0.75rem",
  outline: "none",
  transition: "border-color 0.15s ease",
  width: "14rem",
  "&:focus": { borderColor: "$link" },
});

const VerifiedBadge = styled("span", {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.25rem",
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "$success",
  background: "rgba(68, 162, 72, 0.1)",
  border: "1px solid rgba(68, 162, 72, 0.22)",
  borderRadius: "2rem",
  padding: "0.18rem 0.55rem",
  marginLeft: "0.5rem",
  verticalAlign: "middle",
});

const HelperText = styled("p", {
  margin: "1.25rem 0 0",
  fontSize: "0.85rem",
  color: "$medium",
  lineHeight: 1.55,
});

const Divider = styled("hr", {
  border: "none",
  borderTop: "1px solid $kindaLight",
  margin: "1.4rem 0",
});

// Buttons

const ButtonRow = styled("div", {
  display: "flex",
  gap: "0.7rem",
  alignItems: "center",
  marginTop: "1.6rem",
  flexWrap: "wrap",
});

const PrimaryButton = styled("button", {
  appearance: "none",
  border: "none",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.35rem",
  padding: "0.62rem 1.25rem",
  borderRadius: "0.45rem",
  fontSize: "0.875rem",
  fontWeight: 600,
  fontFamily: "inherit",
  background: "$link",
  color: "#ffffff",
  transition: "opacity 0.15s ease",

  "&:not(:disabled):hover": { opacity: 0.88 },
  "&:active": { opacity: 0.72 },
});

const SecondaryButton = styled("button", {
  appearance: "none",
  background: "none",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.35rem",
  padding: "0.62rem 1rem",
  borderRadius: "0.45rem",
  fontSize: "0.875rem",
  fontWeight: 500,
  fontFamily: "inherit",
  color: "$medium",
  border: "1px solid $light",
  transition: "border-color 0.15s ease, color 0.15s ease",

  "&:hover": {
    borderColor: "$mediumLight",
    color: "$mediumDark",
  },
});

const GhostButton = styled("button", {
  appearance: "none",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "0.83rem",
  color: "$mediumLight",
  fontFamily: "inherit",
  padding: "0.2rem 0",
  textDecoration: "underline",
  textDecorationColor: "$light",
  transition: "color 0.15s ease",

  "&:hover": { color: "$medium" },
});

// Routing number input

const RoutingField = styled("div", {
  display: "grid",
  gap: "0.2rem",
  gridColumn: "1 / -1",
});

const RoutingInputWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  flexWrap: "wrap",
});

const RoutingInput = styled("input", {
  fontFamily: "$mono",
  fontSize: "0.95rem",
  fontWeight: 500,
  color: "$text",
  background: "$backgroundInner",
  border: "1px solid $light",
  borderRadius: "0.4rem",
  padding: "0.45rem 0.75rem",
  width: "10rem",
  outline: "none",
  transition: "border-color 0.15s ease",
  letterSpacing: "0.04em",

  "&:focus": { borderColor: "$link" },

  variants: {
    validity: {
      valid:   { borderColor: "$success" },
      invalid: { borderColor: "$error" },
      empty:   {},
    },
  },
});

const ValidationFeedback = styled("span", {
  fontSize: "0.8rem",
  fontWeight: 500,
  lineHeight: 1.3,

  variants: {
    state: {
      valid:        { color: "$success" },
      unrecognized: { color: "$medium" },
      invalid:      { color: "$error" },
      empty:        { color: "$mediumLight" },
    },
  },
});

// Bank search modal

const SearchTriggerLink = styled("button", {
  appearance: "none",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontFamily: "inherit",
  fontSize: "0.8rem",
  color: "$link",
  padding: 0,
  textDecoration: "underline",
  textDecorationColor: "rgba(14,109,194,0.3)",
  transition: "opacity 0.15s ease",
  "&:hover": { opacity: 0.72 },
});

const ModalBackdrop = styled("div", {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.35)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 200,
  padding: "1rem",
});

const ModalCard = styled("div", {
  background: "$backgroundInner",
  border: "1px solid $kindaLight",
  borderRadius: "$rounded",
  boxShadow: "0 8px 40px rgba(0,0,0,0.14)",
  width: "100%",
  maxWidth: "440px",
  maxHeight: "75vh",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

const ModalHeader = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1rem 1.25rem",
  borderBottom: "1px solid $kindaLight",
  flexShrink: 0,
});

const ModalTitle = styled("h3", {
  margin: 0,
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "$text",
});

const ModalCloseBtn = styled("button", {
  appearance: "none",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "$mediumLight",
  fontSize: "1.1rem",
  lineHeight: 1,
  padding: "0.15rem 0.3rem",
  borderRadius: "0.25rem",
  fontFamily: "inherit",
  transition: "color 0.12s ease, background 0.12s ease",
  "&:hover": { color: "$text", background: "$superLight" },
});

const ModalSearchInput = styled("input", {
  width: "100%",
  padding: "0.8rem 1.1rem",
  border: "none",
  borderBottom: "1px solid $kindaLight",
  background: "$superLight",
  fontSize: "0.9rem",
  color: "$text",
  fontFamily: "inherit",
  outline: "none",
  flexShrink: 0,
  "&::placeholder": { color: "$mediumLight" },
});

const BankList = styled("ul", {
  listStyle: "none",
  padding: 0,
  margin: 0,
  overflowY: "auto",
  height: "300px",
});

const BankRow = styled("li", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
  padding: "0.75rem 1.25rem",
  cursor: "pointer",
  borderBottom: "1px solid $superLight",
  transition: "background 0.1s ease",
  "&:hover": { background: "$superLight" },
  "&:last-child": { borderBottom: "none" },
});

const BankRowName = styled("span", {
  fontSize: "0.9rem",
  fontWeight: 500,
  color: "$text",
});

const BankRowRouting = styled("span", {
  fontFamily: "$mono",
  fontSize: "0.78rem",
  color: "$mediumLight",
  letterSpacing: "0.04em",
  flexShrink: 0,
});

const ModalEmptyState = styled("div", {
  padding: "2.5rem 1.25rem",
  textAlign: "center",
  color: "$mediumLight",
  fontSize: "0.875rem",
});

// Review

const ChecklistList = styled("ul", {
  listStyle: "none",
  padding: 0,
  margin: "1.1rem 0 0",
  display: "grid",
  gap: "0.6rem",
});

const ChecklistItem = styled("li", {
  display: "flex",
  alignItems: "flex-start",
  gap: "0.65rem",
  fontSize: "0.875rem",
  color: "$text",
  lineHeight: 1.5,
});

const CheckCircle = styled("span", {
  flexShrink: 0,
  width: "1.15rem",
  height: "1.15rem",
  borderRadius: "50%",
  background: "$success",
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.65rem",
  fontWeight: 700,
  marginTop: "0.1rem",
});

const RiskNote = styled("div", {
  marginTop: "1.1rem",
  padding: "0.8rem 1rem",
  borderRadius: "0.4rem",
  background: "rgba(247, 130, 0, 0.07)",
  border: "1px solid rgba(247, 130, 0, 0.2)",
  fontSize: "0.855rem",
  color: "$mediumDark",
  lineHeight: 1.55,
});

const SummaryGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",

  "@medium": {
    gridTemplateColumns: "1fr",
  },
});

// Submitted

const SuccessBanner = styled("div", {
  textAlign: "center",
  paddingBottom: "1.5rem",
});

const SuccessCircle = styled("div", {
  width: "2.75rem",
  height: "2.75rem",
  borderRadius: "50%",
  background: "rgba(68, 162, 72, 0.1)",
  border: "2px solid rgba(68, 162, 72, 0.28)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.15rem",
  margin: "0 auto 0.85rem",
  color: "$success",
});

const SuccessTitle = styled("h3", {
  margin: "0 0 0.35rem",
  fontSize: "1.1rem",
  fontWeight: 600,
  color: "$text",
});

const SuccessBody = styled("p", {
  margin: "0 0 1.25rem",
  fontSize: "0.875rem",
  color: "$medium",
  lineHeight: 1.65,
});

const ReferenceBlock = styled("div", {
  display: "inline-flex",
  flexDirection: "column",
  gap: "0.15rem",
  background: "$superLight",
  border: "1px solid $kindaLight",
  borderRadius: "0.45rem",
  padding: "0.6rem 1.1rem",
  textAlign: "left",
});

const ReferenceLabel = styled("span", {
  fontSize: "0.7rem",
  fontWeight: 600,
  color: "$mediumLight",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
});

const ReferenceId = styled("span", {
  fontFamily: "$mono",
  fontSize: "0.975rem",
  fontWeight: 600,
  color: "$text",
  letterSpacing: "0.04em",
});

const Timestamp = styled("p", {
  marginTop: "0.65rem",
  marginBottom: 0,
  fontSize: "0.78rem",
  color: "$mediumLight",
});

// Timeline

const TimelineContainer = styled("div", {
  marginTop: "1.75rem",
  paddingTop: "1.5rem",
  borderTop: "1px solid $kindaLight",
});

const TimelineSectionLabel = styled("h4", {
  margin: "0 0 1.2rem",
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "$mediumLight",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
});

const TimelineList = styled("ol", {
  listStyle: "none",
  padding: 0,
  margin: 0,
  position: "relative",

  "&::before": {
    content: '""',
    position: "absolute",
    left: "0.575rem",
    top: "1.25rem",
    bottom: "1.25rem",
    width: "1px",
    background: "$kindaLight",
    zIndex: 0,
  },
});

const TimelineEntry = styled("li", {
  display: "flex",
  gap: "0.9rem",
  alignItems: "flex-start",
  marginBottom: "1rem",
  cursor: "pointer",
  position: "relative",

  "&:last-child": {
    marginBottom: 0,
  },
});

const TimelineDot = styled("div", {
  flexShrink: 0,
  width: "1.15rem",
  height: "1.15rem",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.6rem",
  fontWeight: 700,
  zIndex: 1,
  marginTop: "0.15rem",

  variants: {
    status: {
      complete: {
        background: "$success",
        border: "2px solid $success",
        color: "#ffffff",
      },
      active: {
        background: "$warning",
        border: "2px solid $warning",
      },
      pending: {
        background: "$backgroundInner",
        border: "2px solid $light",
      },
    },
  },
});

const ActivePulse = styled("div", {
  width: "0.4rem",
  height: "0.4rem",
  borderRadius: "50%",
  background: "#ffffff",
  animation: `${pulse} 1.6s ease-in-out infinite`,
});

const TimelineContent = styled("div", {
  flex: 1,
  paddingBottom: "0.1rem",
});

const TimelineLabel = styled("span", {
  display: "block",
  fontSize: "0.875rem",
  lineHeight: 1.4,

  variants: {
    status: {
      complete: { color: "$text", fontWeight: 500 },
      active: { color: "$text", fontWeight: 600 },
      pending: { color: "$mediumLight", fontWeight: 400 },
    },
  },
});

const TimelineStatusBadge = styled("span", {
  fontSize: "0.73rem",
  fontWeight: 500,
  marginLeft: "0.45rem",

  variants: {
    status: {
      complete: { color: "$success" },
      active: { color: "$warning" },
      pending: { color: "$light" },
    },
  },
});

const TimelineDetail = styled("p", {
  margin: "0.35rem 0 0",
  fontSize: "0.825rem",
  color: "$medium",
  lineHeight: 1.55,
});

const ExpandHint = styled("span", {
  fontSize: "0.73rem",
  color: "$light",
  marginLeft: "0.4rem",
  fontWeight: 400,
});

// Friction callouts

const FrictionGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "0.75rem",
  margin: "0 0 2rem",

  "@medium": {
    gridTemplateColumns: "1fr",
  },
});

const FrictionItem = styled("div", {
  borderLeft: "2px solid $success",
  paddingLeft: "0.85rem",
});

const FrictionTitle = styled("p", {
  margin: "0 0 0.2rem",
  fontSize: "0.875rem",
  fontWeight: 600,
  color: "$text",
});

const FrictionDesc = styled("p", {
  margin: 0,
  fontSize: "0.8rem",
  color: "$medium",
  lineHeight: 1.55,
});

// Disclaimer

const DisclaimerBox = styled("p", {
  marginTop: "2rem",
  padding: "0.9rem 1.2rem",
  borderRadius: "0.45rem",
  background: "$superLight",
  border: "1px solid $kindaLight",
  fontSize: "0.8rem",
  color: "$mediumLight",
  lineHeight: 1.6,
  textAlign: "center",
});

// ── Component ─────────────────────────────────────────────────────────────────

type Step = "setup" | "review" | "submitted";

const statusLabel: Record<TimelineStatus, string> = {
  complete: "Done",
  active: "In progress",
  pending: "Pending",
};

type LookupState = "idle" | "loading" | "found" | "not-found" | "error";

const WireTransferDemo = () => {
  const [step, setStep] = useState<Step>("setup");
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [routingNumber, setRoutingNumber] = useState("");
  const [bankName, setBankName] = useState<string | null>(null);
  const [lookupState, setLookupState] = useState<LookupState>("idle");
  const [showBankSearch, setShowBankSearch] = useState(false);
  const [bankSearchQuery, setBankSearchQuery] = useState("");
  const [amountStr, setAmountStr] = useState(String(TRANSFER.amount));
  const [referenceId, setReferenceId] = useState("");
  const [submittedAt, setSubmittedAt] = useState("");
  const skipLookupRef = useRef(false);

  const routingValid = validateRoutingNumber(routingNumber);
  const isNineDigits = /^\d{9}$/.test(routingNumber);

  useEffect(() => {
    if (!routingValid) {
      setBankName(null);
      setLookupState("idle");
      return;
    }
    if (skipLookupRef.current) {
      skipLookupRef.current = false;
      return;
    }
    setLookupState("loading");
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/routing-lookup?rtn=${routingNumber}`);
        const data = await res.json();
        if (data.code === 200 && data.name) {
          setBankName(data.name);
          setLookupState("found");
        } else {
          setBankName(null);
          setLookupState("not-found");
        }
      } catch {
        setBankName(null);
        setLookupState("error");
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [routingNumber, routingValid]);

  const routingInputValidity = !isNineDigits
    ? "empty"
    : routingValid
      ? "valid"
      : "invalid";

  const routingFeedback: { state: "valid" | "unrecognized" | "invalid" | "empty"; text: string } =
    routingNumber === ""
      ? { state: "empty",        text: "Enter a 9-digit ABA routing number" }
      : !isNineDigits
        ? { state: "empty",        text: "A routing number should be exactly 9 digits" }
      : !routingValid
        ? { state: "invalid",      text: "We don't recognize that routing number, please double check it." }
        : lookupState === "loading"
          ? { state: "empty",        text: "Checking..." }
          : lookupState === "found" && bankName
            ? { state: "valid",        text: `✓ ${bankName}` }
            : lookupState === "not-found"
              ? { state: "invalid",      text: "We don't recognize that routing number, please double check it." }
              : lookupState === "error"
                ? { state: "unrecognized", text: "✓ Valid — lookup unavailable" }
                : { state: "empty",        text: "Checking..." };

  const openBankSearch = () => {
    setBankSearchQuery("");
    setShowBankSearch(true);
  };

  const closeBankSearch = () => setShowBankSearch(false);

  const handleSelectBank = (routing: string, name: string) => {
    skipLookupRef.current = true;
    setRoutingNumber(routing);
    setBankName(name);
    setLookupState("found");
    setShowBankSearch(false);
    setBankSearchQuery("");
  };

  const filteredBanks = BANK_DIRECTORY.filter((b) =>
    b.name.toLowerCase().includes(bankSearchQuery.toLowerCase())
  );

  useEffect(() => {
    if (!showBankSearch) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeBankSearch(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showBankSearch]);

  const handleSubmit = () => {
    const rand = (n: number) => Math.random().toString(36).toUpperCase().slice(2, 2 + n);
    setReferenceId(`WT-${rand(4)}-${rand(4)}`);
    setSubmittedAt(new Date().toLocaleString("en-US", {
      month: "long", day: "numeric", year: "numeric",
      hour: "numeric", minute: "2-digit", timeZoneName: "short",
    }));
    setStep("submitted");
    setExpandedItem(null);
  };

  const handleReset = () => {
    setStep("setup");
    setExpandedItem(null);
    setRoutingNumber("");
    setBankName(null);
    setLookupState("idle");
    setAmountStr(String(TRANSFER.amount));
    setReferenceId("");
    setSubmittedAt("");
  };

  const toggleTimeline = (idx: number) => {
    setExpandedItem(expandedItem === idx ? null : idx);
  };

  return (
    <>
      <DemoWrapper>
        {/* Friction callouts */}
        <FrictionGrid>
          <FrictionItem>
            <FrictionTitle>Find your bank by name</FrictionTitle>
            <FrictionDesc>Don't know the routing number? Search by bank name and we'll fill it in.</FrictionDesc>
          </FrictionItem>
          <FrictionItem>
            <FrictionTitle>Digits only</FrictionTitle>
            <FrictionDesc>The field rejects anything that isn't a number. No formatting errors possible.</FrictionDesc>
          </FrictionItem>
          <FrictionItem>
            <FrictionTitle>Live validation</FrictionTitle>
            <FrictionDesc>Routing numbers are checked before you submit, not after.</FrictionDesc>
          </FrictionItem>
        </FrictionGrid>

        {/* Interactive demo */}
        <Section>
          <DemoCard>
            <CardHeader>
              <CardTitle>Wire Transfer Demo</CardTitle>
              <StepIndicator>
                {step === "setup" && "Step 1 of 3 · Setup"}
                {step === "review" && "Step 2 of 3 · Review"}
                {step === "submitted" && "Step 3 of 3 · Submitted"}
              </StepIndicator>
            </CardHeader>

            <CardBody>
              {step === "setup" && (
                <>
                  <FieldGrid>
                    <Field>
                      <FieldLabel>Recipient</FieldLabel>
                      <FieldValue>
                        {TRANSFER.recipient}
                        <VerifiedBadge aria-label="Recipient verified">✓ Verified</VerifiedBadge>
                      </FieldValue>
                    </Field>
                    <Field>
                      <FieldLabel>Amount</FieldLabel>
                      <AmountInput
                        type="text"
                        inputMode="numeric"
                        value={(() => {
                          if (!amountStr) return "";
                          const [intPart, decPart] = amountStr.split(".");
                          const formatted = (parseInt(intPart || "0", 10) || 0).toLocaleString();
                          return "$" + formatted + (decPart !== undefined ? "." + decPart : "");
                        })()}
                        onChange={(e) => {
                          const stripped = e.target.value.replace(/[^0-9.]/g, "");
                          const parts = stripped.split(".");
                          if (parts.length > 2) return;
                          if (parts[1] !== undefined && parts[1].length > 2) return;
                          setAmountStr(stripped);
                        }}
                        aria-label="Transfer amount in dollars"
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Memo</FieldLabel>
                      <FieldValue>{TRANSFER.memo}</FieldValue>
                    </Field>
                    <RoutingField>
                      <FieldLabel>Routing number</FieldLabel>
                      <RoutingInputWrapper>
                        <RoutingInput
                          type="text"
                          inputMode="numeric"
                          maxLength={9}
                          value={routingNumber}
                          validity={routingInputValidity}
                          onChange={(e) => setRoutingNumber(e.target.value.replace(/\D/g, "").slice(0, 9))}
                          aria-label="ABA routing number"
                          spellCheck={false}
                        />
                        <ValidationFeedback state={routingFeedback.state}>
                          {routingFeedback.text}
                        </ValidationFeedback>
                      </RoutingInputWrapper>
                      <div style={{ marginTop: "0.35rem" }}>
                        <SearchTriggerLink onClick={openBankSearch}>
                          Don't know it? Search here.
                        </SearchTriggerLink>
                      </div>
                    </RoutingField>
                  </FieldGrid>
                  <HelperText>
                    Typical delivery: {TRANSFER.deliveryEstimate}. Double-check recipient details before continuing.
                  </HelperText>
                  <ButtonRow>
                    <PrimaryButton
                      onClick={() => setStep("review")}
                      disabled={!routingValid}
                      css={!routingValid ? { opacity: 0.45, cursor: "not-allowed" } : {}}
                    >
                      Review transfer →
                    </PrimaryButton>
                  </ButtonRow>
                </>
              )}

              {step === "review" && (
                <>
                  <SummaryGrid>
                    <Field>
                      <FieldLabel>Recipient</FieldLabel>
                      <FieldValue>{TRANSFER.recipient}</FieldValue>
                    </Field>
                    <Field>
                      <FieldLabel>Amount</FieldLabel>
                      <FieldValue>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: amountStr.includes(".") ? 2 : 0, maximumFractionDigits: 2 }).format(parseFloat(amountStr) || 0)}</FieldValue>
                    </Field>
                    <Field css={{ gridColumn: "1 / -1" }}>
                      <FieldLabel>Routing number</FieldLabel>
                      <FieldValue css={{ fontFamily: "$mono", letterSpacing: "0.04em" }}>
                        {routingNumber}
                        {bankName && (
                          <VerifiedBadge aria-label="Routing number verified">{bankName}</VerifiedBadge>
                        )}
                      </FieldValue>
                    </Field>
                    <Field>
                      <FieldLabel>Memo</FieldLabel>
                      <FieldValue>{TRANSFER.memo}</FieldValue>
                    </Field>
                  </SummaryGrid>

                  <Divider />

                  <FieldLabel as="p" style={{ margin: 0 }}>Confirm before sending</FieldLabel>
                  <ChecklistList>
                    <ChecklistItem>
                      <CheckCircle aria-hidden>✓</CheckCircle>
                      Recipient name and bank have been verified
                    </ChecklistItem>
                    <ChecklistItem>
                      <CheckCircle aria-hidden>✓</CheckCircle>
                      <span>Amount of <strong>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: amountStr.includes(".") ? 2 : 0, maximumFractionDigits: 2 }).format(parseFloat(amountStr) || 0)}</strong> is correct</span>
                    </ChecklistItem>
                    <ChecklistItem>
                      <CheckCircle aria-hidden>✓</CheckCircle>
                      I understand this transfer cannot be reversed once processed
                    </ChecklistItem>
                  </ChecklistList>

                  <RiskNote>
                    Wire transfers cannot be reversed once processed. Please confirm all details are correct before submitting.
                  </RiskNote>

                  <ButtonRow>
                    <PrimaryButton onClick={handleSubmit}>
                      Submit transfer
                    </PrimaryButton>
                    <SecondaryButton onClick={() => setStep("setup")}>
                      ← Edit details
                    </SecondaryButton>
                  </ButtonRow>
                </>
              )}

              {step === "submitted" && (
                <>
                  <SuccessBanner>
                    <SuccessCircle aria-hidden>✓</SuccessCircle>
                    <SuccessTitle>Transfer request received</SuccessTitle>
                    <SuccessBody>
                      Your transfer request has been received and is now being processed.
                      You'll see status updates below as it moves through the banking network.
                    </SuccessBody>
                    <ReferenceBlock>
                      <ReferenceLabel>Reference ID</ReferenceLabel>
                      <ReferenceId>{referenceId}</ReferenceId>
                    </ReferenceBlock>
                    <Timestamp>Submitted {submittedAt}</Timestamp>
                  </SuccessBanner>

                  <TimelineContainer>
                    <TimelineSectionLabel>Transfer status</TimelineSectionLabel>
                    <TimelineList role="list">
                      {TIMELINE.map((item, idx) => (
                        <TimelineEntry
                          key={idx}
                          onClick={() => toggleTimeline(idx)}
                          role="listitem"
                          aria-expanded={expandedItem === idx}
                        >
                          <TimelineDot status={item.status} aria-hidden>
                            {item.status === "complete" && "✓"}
                            {item.status === "active" && <ActivePulse />}
                          </TimelineDot>
                          <TimelineContent>
                            <TimelineLabel status={item.status}>
                              {item.label}
                              <TimelineStatusBadge status={item.status}>
                                · {statusLabel[item.status]}
                              </TimelineStatusBadge>
                              {expandedItem !== idx && (
                                <ExpandHint aria-hidden>▾</ExpandHint>
                              )}
                            </TimelineLabel>
                            {expandedItem === idx && (
                              <TimelineDetail>{item.detail}</TimelineDetail>
                            )}
                          </TimelineContent>
                        </TimelineEntry>
                      ))}
                    </TimelineList>
                  </TimelineContainer>

                  <ButtonRow>
                    <GhostButton onClick={handleReset}>Start over</GhostButton>
                  </ButtonRow>
                </>
              )}
            </CardBody>
          </DemoCard>
        </Section>

        <DisclaimerBox>
          This is an independent product engineering concept built as an application artifact. It is not affiliated with any real bank.
        </DisclaimerBox>
      </DemoWrapper>

      {/* Bank search modal */}
      {showBankSearch && (
        <ModalBackdrop onClick={closeBankSearch}>
          <ModalCard
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal
            aria-label="Search for a bank by name"
          >
            <ModalHeader>
              <ModalTitle>Search by bank name</ModalTitle>
              <ModalCloseBtn onClick={closeBankSearch} aria-label="Close">✕</ModalCloseBtn>
            </ModalHeader>

            <ModalSearchInput
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              type="text"
              placeholder="Search banks..."
              value={bankSearchQuery}
              onChange={(e) => setBankSearchQuery(e.target.value)}
              aria-label="Search banks"
            />

            <BankList role="list">
              {filteredBanks.length > 0 ? (
                filteredBanks.map((bank) => (
                  <BankRow
                    key={bank.name}
                    onClick={() => handleSelectBank(bank.routing, bank.name)}
                    role="listitem"
                  >
                    <BankRowName>{bank.name}</BankRowName>
                    <BankRowRouting>{bank.routing}</BankRowRouting>
                  </BankRow>
                ))
              ) : (
                <ModalEmptyState>No banks match &ldquo;{bankSearchQuery}&rdquo;</ModalEmptyState>
              )}
            </BankList>
          </ModalCard>
        </ModalBackdrop>
      )}
    </>
  );
};

export default WireTransferDemo;
