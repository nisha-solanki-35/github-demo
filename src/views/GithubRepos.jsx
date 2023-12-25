import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchActivities, fetchGithubRepos } from '../redux/actions'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Loader from '../components/Loader'
import moment from 'moment'
import {
  Collapse,
  Container,
  Grid
} from '@mui/material'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts/highcharts.src.js'
import HighchartsReact from 'highcharts-react-official'
import rightArrow from '../assets/images/rightArrow.svg'

function GithubRepos (props) {
  const { duration } = props
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  const [repos, setRepos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenRepo, setIsOpenRepo] = useState(false)
  const [repoId, setRepoId] = useState(0)
  const listRef = useRef()
  const previousProps = useRef({ page, duration }).current
  const { githubRepos, contributors, perWeekData } = useSelector(
    (state) => state.githubRepo
  )

  const perWeekDataUpToOneYear = useMemo(() => {
    setIsLoading(false)
    const data = {}
    if (perWeekData?.length > 0) {
      for (let index = 0; index < perWeekData.length; index++) {
        const timeStamp = perWeekData[index]?.week
        const time = moment.unix(timeStamp).format('DD-MM-YYYY') || ''
        data[time] = perWeekData[index]?.total
      }
      return { keys: Object.keys(data), values: Object.values(data) }
    }
  }, [perWeekData])

  const contribution = useMemo(() => {
    setIsLoading(false)
    if (contributors?.length > 0) {
      const contributionsss = {}
      const contributorsArr = []
      for (let index = 0; index < contributors.length; index++) {
        const weekData = contributors[index]?.weeks[0]
        const time = moment.unix(weekData?.w).format('DD-MM-YYYY') || ''

        if (contributors[index]?.weeks?.length > 0) {
          contributorsArr.push({
            name: contributors[index]?.author?.login,
            data: [[time, contributors[index]?.total]]
          })

          if (time in contributionsss) {
            contributionsss[time] =
              parseInt(contributionsss[time]) +
              parseInt(contributors[index]?.total)
          } else {
            contributionsss[time] = []
            contributionsss[time].push(parseInt(contributors[index]?.total))
          }
        }
      }
      const keys = Object.keys(contributionsss)
      return {
        keys,
        contributorsArr
      }
    }
  }, [contributors])

  const firstChartOptions = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Total Changes Across Contributors per Week'
    },
    xAxis: {
      categories: perWeekDataUpToOneYear?.keys,
      title: {
        text: 'Date'
      }
    },
    yAxis: {
      title: {
        text: 'Changes'
      }
    },
    series: [
      {
        name: 'Total Changes',
        data: perWeekDataUpToOneYear?.values
      }
    ],
    tooltip: {
      formatter: function () {
        return `Total Changes: ${this.y} at ${this.x}`
      }
    }
  }

  const secondChartOptions = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Contributors Total Changes per Week'
    },
    xAxis: {
      categories: contribution?.keys,
      type: 'Date',
      labels: {
        formatter: function () {
          return this.value
        }
      }
    },
    yAxis: {
      title: {
        text: 'Total Changes'
      }
    },
    tooltip: {
      formatter: function () {
        return `<b>${this.series.name}</b><br/>${this.key}<br/>Changes: ${this.y}`
      }
    },
    legend: {
      enabled: true
    },
    series: contribution?.contributorsArr
  }

  function getRepos (date, pageNo) {
    dispatch(fetchGithubRepos(date, pageNo))
  }

  useEffect(() => {
    getRepos(moment().subtract(duration, 'days').format('YYYY-MM-DD'), page)
    setIsLoading(true)
  }, [])

  useEffect(() => {
    if (previousProps.duration !== duration) {
      getRepos(moment().subtract(duration, 'days').format('YYYY-MM-DD'), page)
    }
    return () => {
      previousProps.duration = duration
    }
  }, [duration])

  useEffect(() => {
    if (previousProps.page !== page) {
      getRepos(moment().subtract(duration, 'days').format('YYYY-MM-DD'), page)
    }
    return () => {
      previousProps.page = page
    }
  }, [page])

  useMemo(() => {
    if (githubRepos && Object.keys(githubRepos)?.length > 0) {
      if (githubRepos?.items?.length > 0) {
        if (previousProps.duration !== duration) {
          setRepos(githubRepos?.items)
        } else {
          setRepos([...repos, ...githubRepos?.items])
        }
        setIsLoading(false)
      }
    }
  }, [githubRepos])

  function handleToggle (e, repo) {
    if (repoId === repo?.id) {
      setRepoId(0)
    } else {
      dispatch(fetchActivities(repo?.owner?.login, repo?.name))
      setIsLoading(true)
      setRepoId(repo?.id)
      setIsOpenRepo(true)
    }
  }

  const onScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current
      if (scrollTop + clientHeight === scrollHeight) {
        setPage(page + 1)
      }
    }
  }

  return (
    <div onScroll={onScroll} ref={listRef} className="list-container">
      <Container>
        {isLoading && <Loader isLoading={isLoading} />}
        {repos?.length > 0 &&
          repos?.map((repoData, index) => (
            <Card
              key={repoData?.id + 'id' + index}
              variant="outlined"
              sx={{
                border: 0,
                borderRadius: 4,
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                color: 'black',
                margin: '20px 0',
                display: 'grid'
              }}
              xs={12}
            >
              <Grid container spacing={2}>
                <Grid xs={3}>
                  <CardMedia
                    component="img"
                    image={repoData?.owner?.avatar_url}
                    alt="Image not available"
                    sx={{
                      height: '100%',
                      width: '100%'
                    }}
                  />
                </Grid>
                <Grid xs={8} spacing={2}>
                  <CardContent sx={{ margin: '10px 30px' }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {repoData?.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 'bold'
                      }}
                    >
                      {repoData?.description}
                    </Typography>
                    <Grid
                      xs={12}
                      container
                      sx={{
                        padding: '15px 0px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Grid
                        xs={2}
                        sx={{
                          padding: '10px 0',
                          background: 'green',
                          color: 'white',
                          borderRadius: '8px',
                          margin: '0 5px',
                          textAlign: 'center'
                        }}
                      >
                        {repoData?.stargazers_count || 'No stars'}
                      </Grid>
                      <Grid
                        xs={2}
                        sx={{
                          padding: '10px 0',
                          background: 'red',
                          color: 'white',
                          borderRadius: '8px',
                          margin: '0 5px',
                          textAlign: 'center'
                        }}
                      >
                        {repoData?.open_issues_count || 'No issues'}
                      </Grid>
                      <Grid
                        xs={6}
                        sx={{
                          padding: '10px 0',
                          color: 'black',
                          margin: '0 5px',
                          textAlign: 'center',
                          fontStyle: 'italic'
                        }}
                      >
                        Last pushed{' '}
                        {moment(repoData?.pushed_at).format(
                          'DD-MM-YYYY hh:mm A'
                        )}{' '}
                        by {repoData?.owner?.login}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Grid>
                <Grid
                  className={`toggle-img ${
                    repoId === repoData?.id ? 'rotateImg' : ''
                  }`}
                  xs={1}
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={rightArrow}
                    onClick={(e) => handleToggle(e, repoData)}
                  />
                </Grid>
                <Collapse in={isOpenRepo && repoId === repoData?.id}>
                  {perWeekDataUpToOneYear
                    ? (
                    <Card
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'center',
                        margin: '15px auto'
                      }}
                    >
                      <CardContent
                        sx={{
                          margin: '10px auto'
                        }}
                      >
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={firstChartOptions}
                        />
                      </CardContent>
                    </Card>
                      )
                    : (
                    <Card
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '10px'
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5">Data not available</Typography>
                      </CardContent>
                    </Card>
                      )}
                  {contribution
                    ? (
                    <Card
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '10px auto'
                      }}
                    >
                      <CardContent
                        sx={{
                          margin: '10px auto'
                        }}
                      >
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={secondChartOptions}
                        />
                      </CardContent>
                    </Card>
                      )
                    : (
                    <Card
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '10px'
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5">Data not available</Typography>
                      </CardContent>
                    </Card>
                      )}
                </Collapse>
              </Grid>
            </Card>
          ))}
      </Container>
    </div>
  )
}

GithubRepos.propTypes = {
  duration: PropTypes.number
}

export default GithubRepos
