import { TimerTracker } from "../components/common/TimerTracker.tsx";

export interface VisitsCounter {
  thisDay: number,
  thisWeek: number
}
export interface UserProfile {
  id: string,
  name: string,
  email: string,
  avatar_url: string,
}
export interface WebsiteInfo {
  title: string,
  icon: string,
  url: string,
  initialSeconds: number | null,
  weekInitialSeconds: number | null,
  visitsCounter: VisitsCounter,
  category: string
}

export interface CategoryObj {
  id: number,
  category: string
}

export interface DomainTimers {
  [domain: string]: {timer: TimerTracker, visitsCounter: VisitsCounter, weekInitialSeconds: number };
}
export interface GeneralStatistis {
  todaySitesVisited: number,
  allSitesVisited: number
}