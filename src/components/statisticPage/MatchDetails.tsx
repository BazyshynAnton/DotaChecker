import { useEffect, useState } from "@/components/shared/reactImports"
import { useSelector } from "@/components/shared/reduxImports"
import {
  filterPlayersByTeam,
  getMatchResult,
} from "@/utils/statisticPage/matchDetailsUtils"

import type { RootState } from "@/store/store"
import type {
  MatchResult,
  PlayersByTeam,
} from "@/types/staticPage/matchDetailsTypes"

import styles from "@/styles/statisticPage/MatchDetails.module.scss"
import PlayersTableDetails from "./reusableMatchDetails/PlayersTableDetails"

export default function MatchDetails() {
  const { matchDetails } = useSelector(
    (store: RootState) => store.statisticPageSlice
  )

  const [resultOfMatch, setResultOfMatch] = useState<MatchResult>()
  const [playersByTeam, setPlayersByTeam] = useState<PlayersByTeam>()
  useEffect(() => {
    if (matchDetails) {
      setResultOfMatch(getMatchResult(380571223, matchDetails))
      setPlayersByTeam(filterPlayersByTeam(matchDetails))
    }
  }, [matchDetails])

  if (!playersByTeam) return <div>Loading...</div>

  return (
    <div className={styles.matchContainer}>
      <div className={styles.matchHeader}>
        <div className={styles.playedHero}></div>
        <div className={styles.matchResult}>
          <h4
            style={{
              color:
                resultOfMatch?.resultOfMatch === "WIN" ? "#92A525" : "#C23C2A ",
            }}
          >
            YOUR TEAM {"("}
            {resultOfMatch?.playerSide}
            {")"} {resultOfMatch?.resultOfMatch}
          </h4>
          <div className={styles.matchScoreAndTime}>
            <p className={styles.radiantScore}>{resultOfMatch?.radiantScore}</p>
            <p className={styles.matchDuration}>
              {resultOfMatch?.matchDuration}
            </p>
            <p className={styles.direScore}>{resultOfMatch?.direScore}</p>
          </div>
        </div>
      </div>
      <PlayersTableDetails playersTeam={playersByTeam?.playersRadiant} />
      <PlayersTableDetails playersTeam={playersByTeam?.playersDire} />
    </div>
  )
}