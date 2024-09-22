import type { Player } from "../statistic/tableDetails"

export interface UMatchData {
  fetchMatchData(): Promise<MatchData | string>
}

export interface InitialStatisticState {
  matchDetails: MatchDetails | null
  heroList: HeroList[] | null
  playersProfiles: PlayerProfile[] | null

  search: {
    [key: string]: string
  }

  error: string | null
}

export interface MatchData {
  heroListData: HeroList[]
  matchDetailsData: MatchDetails
  playerProfilesData: PlayerProfile[]
}

export interface HeroList {
  id: number
  name: string
  localized_name: string
}

export interface Match {
  match_id: number
  player_slot: number
  radiant_win: boolean
  hero_id: number
  start_time: number
  duration: number
  game_mode: number
  lobby_type: number
  version: number | null
  kills: number
  deaths: number
  assists: number
  average_rank: number
  xp_per_min: number
  gold_per_min: number
  hero_damage: number
  tower_damage: number
  hero_healing: number
  last_hits: number
  lane: number | string | null
  lane_role: number | string | null
  is_roaming: number | string | boolean | null
  cluster: number
  leaver_status: number
  party_size: number | null
  hero_variant: number
}

export interface MatchDetails {
  players: Player[]

  radiant_win: boolean
  duration: number
  pre_game_duration: number
  start_time: number
  match_id: number
  match_seq_num: number
  tower_status_radiant: number
  tower_status_dire: number
  barracks_status_radiant: number
  barracks_status_dire: number
  cluster: number
  first_blood_time: number
  lobby_type: number
  human_players: number
  leagueid: number
  game_mode: number
  flags: number
  engine: number
  radiant_score: number
  dire_score: number
  picks_bans: [
    {
      is_pick: boolean
      hero_id: number
      team: number
      order: number
    }
  ]
  od_data: {
    has_api: boolean
    has_gcdata: boolean
    has_parsed: boolean
  }
  metadata: null | any
  patch: number
  region: number
}

export interface PlayerProfile {
  error: any
  profile: {
    account_id: number
    avatar: string
    avatarmedium: string
    avatarfull: string
    profileurl: string
  }
  rank_tier: number | null
  leaderboard_rank: number | null
}