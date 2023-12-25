import React, { useState } from 'react'
import Header from '../components/Header'
import GithubRepos from './GithubRepos'

function GithubReposIndex () {
  const [duration, setDuration] = useState(7)

  const handleChange = (e) => {
    setDuration(e?.target?.value)
  }

  return (
    <>
      <Header
        heading="Most Starred Repos"
        duration={duration}
        handleChange={handleChange}
      />
      <GithubRepos duration={duration} />
    </>
  )
}

export default GithubReposIndex
