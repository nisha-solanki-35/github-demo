import React from 'react'
import PropTypes from 'prop-types'
import { Backdrop, CircularProgress } from '@mui/material'

function Loader (props) {
  const { isLoading } = props

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={!!isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

Loader.propTypes = {
  isLoading: PropTypes.bool
}

export default Loader
