import { all, call, fork, put, takeLatest } from 'redux-saga/effects'
import {
  ACTIVITIES_FAILURE,
  ACTIVITIES_SUCCESS,
  FETCH_ACTIVITIES,
  FETCH_REPOS,
  GET_REPOS_FAILURE,
  GET_REPOS_SUCCESS
} from '../constants'
import axios from '../../axios/instanceAxios'

async function fetchRepos (payload) {
  const { date, page } = payload
  return await axios
    .get(
      `/search/repositories?q=created:>${date}&sort=stars&order=desc&page=${page}`
    )
    .then((response) => {
      return response?.data
    })
}

function * fetchDataSaga ({ payload }) {
  try {
    const response = yield call(fetchRepos, payload)
    yield put({ type: GET_REPOS_SUCCESS, payload: response })
  } catch (error) {
    yield put({ type: GET_REPOS_FAILURE, payload: error?.response?.message })
  }
}

function * fetchCommitAdditionDeletion ({ payload }) {
  const { owner, repo } = payload
  try {
    const [firstResponse, secondResponse, thirdResponse] = yield Promise.all([
      axios.get(`/repos/${owner}/${repo}/stats/code_frequency`),
      axios.get(`/repos/${owner}/${repo}/stats/commit_activity`),
      axios.get(`/repos/${owner}/${repo}/stats/contributors`)
    ])
    yield put({
      type: ACTIVITIES_SUCCESS,
      payload: {
        firstResponse: firstResponse?.data,
        secondResponse: secondResponse?.data,
        thirdResponse: thirdResponse?.data
      }
    })
  } catch (error) {
    yield put({ type: ACTIVITIES_FAILURE, payload: error?.response?.message })
  }
}

function * allSagas () {
  yield takeLatest(FETCH_REPOS, fetchDataSaga)
  yield takeLatest(FETCH_ACTIVITIES, fetchCommitAdditionDeletion)
}

export default function * rootSaga () {
  yield all([fork(allSagas)])
}
