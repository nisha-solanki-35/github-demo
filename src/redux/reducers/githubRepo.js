import {
  ACTIVITIES_FAILURE,
  ACTIVITIES_SUCCESS,
  GET_REPOS_FAILURE,
  GET_REPOS_SUCCESS
} from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_REPOS_SUCCESS:
      return {
        ...state,
        githubRepos: action.payload
      }
    case GET_REPOS_FAILURE:
      return {
        ...state,
        repoResMessage: action.payload
      }
    case ACTIVITIES_SUCCESS:
      return {
        ...state,
        perWeekData: action.payload.secondResponse,
        contributors: action.payload.thirdResponse
      }
    case ACTIVITIES_FAILURE:
      return {
        ...state,
        resMessage: action.payload
      }
    default:
      return state
  }
}
