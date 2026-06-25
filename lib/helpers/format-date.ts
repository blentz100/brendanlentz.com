import dayjs from "dayjs";
import dayjsUtc from "dayjs/plugin/utc";
import dayjsTimezone from "dayjs/plugin/timezone";
import dayjsRelativeTime from "dayjs/plugin/relativeTime";
import dayjsLocalizedFormat from "dayjs/plugin/localizedFormat";
import dayjsAdvancedFormat from "dayjs/plugin/advancedFormat";
import "dayjs/locale/en";
import { timeZone } from "../config";

// bare date/time strings with no UTC offset (e.g. blog front matter's "2024-01-15") have no instant of
// their own, so they're treated as wall-clock time in the configured zone. Anything that already names an
// instant (an ISO string with "Z"/an offset, a Date, an epoch number) must be parsed as that instant first --
// dayjs.tz(string, zone) otherwise discards the string's own offset and reinterprets its digits as local time
// in the target zone, silently shifting it by the zone's UTC offset.
const isNaiveDateString = (date?: dayjs.ConfigType): boolean =>
  typeof date === "string" && !/Z$|[+-]\d{2}:?\d{2}$/.test(date.trim());

// normalize timezone and locale across the site, both server and client side, to prevent hydration errors by returning
// an instance of dayjs with these defaults set.
const IsomorphicDayJs = (date?: dayjs.ConfigType): dayjs.Dayjs => {
  // plugins
  dayjs.extend(dayjsUtc);
  dayjs.extend(dayjsTimezone);
  dayjs.extend(dayjsRelativeTime);
  dayjs.extend(dayjsLocalizedFormat);
  dayjs.extend(dayjsAdvancedFormat);

  return (isNaiveDateString(date) ? dayjs.tz(date, timeZone) : dayjs(date).tz(timeZone)).locale("en");
};

// simple wrapper around dayjs.format()
// date defaults to now, format defaults to ISO 8601 (e.g. 2022-04-07T21:53:33-04:00)
export const formatDate = (date?: dayjs.ConfigType, formatStr?: string) => {
  return IsomorphicDayJs(date).format(formatStr);
};

// returns the human-friendly difference between now and given date (e.g. "5 minutes", "9 months", etc.)
// set `{ suffix: true }` to include the "... ago" or "in ..." for past/future
export const formatTimeAgo = (date: dayjs.ConfigType, options?: { suffix?: boolean }) => {
  return IsomorphicDayJs().isBefore(date)
    ? IsomorphicDayJs(date).toNow(!options?.suffix)
    : IsomorphicDayJs(date).fromNow(!options?.suffix);
};
