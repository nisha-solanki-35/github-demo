import { FETCH_ACTIVITIES, FETCH_REPOS } from '../constants'

export const fetchGithubRepos = (date, page) => {
  return { type: FETCH_REPOS, payload: { date, page } }
}

export const fetchActivities = (owner, repo) => {
  return { type: FETCH_ACTIVITIES, payload: { owner, repo } }
}
