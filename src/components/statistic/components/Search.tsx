import { ChangeEvent, FormEvent } from "react"

import { useAppDispatch, useAppSelector } from "@/shared/reduxImports"
import { setMatchData, setSearch } from "@/store/statisticSlice"

import { MatchDataUtility } from "@/utils/statistic/MatchDataUtility"

import styles from "@/styles/statistic/Search.module.scss"

export default function Search() {
  const { search } = useAppSelector((store) => store.statisticSlice)
  const dispatch = useAppDispatch()

  const handleInputChange =
    (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value

      dispatch(setSearch({ type, value }))
    }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const mID = Number(search.matchID)
    const uMatchData = new MatchDataUtility()
    const matchData = await uMatchData.fetchMatchData(mID)
    dispatch(setMatchData(matchData))
  }

  const isDisabled = search.matchID.length < 10

  return (
    <form className={styles.search} onSubmit={handleFormSubmit}>
      <div className={styles.search__inputs}>
        <input
          type="number"
          value={search.matchID}
          placeholder="Match ID"
          onChange={handleInputChange("matchID")}
        />
      </div>
      <button
        type="submit"
        disabled={isDisabled}
        className={
          isDisabled
            ? styles.search__button_disabled
            : styles.search__button_enabled
        }
      >
        search
      </button>
    </form>
  )
}
