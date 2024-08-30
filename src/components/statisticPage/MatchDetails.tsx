import PlayersTableDetails from "./reusableMatchDetails/playersTableDetails/PlayersTableDetails"

import { MatchDetailsUtility } from "@/utils/statisticPage/MatchDetailsUtility"
import { useEffect, useState } from "@/components/shared/reactImports"
import { Image } from "@/components/shared/nextjsImports"
import { useSelector } from "@/components/shared/reduxImports"

import styles from "@/styles/statisticPage/MatchDetails.module.scss"

import type { RootState } from "@/store/store"
import type {
  MatchResult,
  PlayersByTeam,
} from "@/types/staticPage/matchDetailsTypes"

export default function MatchDetails() {
  const { matchDetails, heroList } = useSelector(
    (store: RootState) => store.statisticPageSlice
  )

  const [resultOfMatch, setResultOfMatch] = useState<MatchResult>()
  const [playersByTeam, setPlayersByTeam] = useState<PlayersByTeam>()
  useEffect(() => {
    if (matchDetails && heroList) {
      const mdUtility = new MatchDetailsUtility()
      setResultOfMatch(
        mdUtility.getMatchResult(86738694, matchDetails, heroList)
      )
      setPlayersByTeam(mdUtility.filterPlayersByTeam(matchDetails))
    }
  }, [heroList, matchDetails])

  if (!playersByTeam) return <div>Loading...</div>

  return (
    <div className={styles.match}>
      <div className={styles.match__header}>
        <div className={styles.match__header__playedHero}>
          <span>Played: </span>
          <Image
            src={`/pictures/dotaHeroIcon/${resultOfMatch?.playedHero}.png`}
            alt=""
            width={50}
            height={30}
          />
        </div>
        <div className={styles.match__result}>
          <h4
            style={{
              color: resultOfMatch?.resultOfMatch ? "#2eb872" : "#fa4659",
            }}
          >
            TEAM {resultOfMatch?.resultOfMatch ? "RADIANT" : "DIRE"} {"WIN"}
          </h4>
          <div className={styles.match__scoreAndTime}>
            <p className={styles.match__scoreAndTime__radiantScore}>
              {resultOfMatch?.radiantScore}
            </p>
            <p className={styles.match__scoreAndTime__duration}>
              {resultOfMatch?.matchDuration}
            </p>
            <p className={styles.match__scoreAndTime__direScore}>
              {resultOfMatch?.direScore}
            </p>
          </div>
        </div>
      </div>
      <PlayersTableDetails playersTeam={playersByTeam?.playersRadiant} />
      <PlayersTableDetails playersTeam={playersByTeam?.playersDire} />
    </div>
  )
}
