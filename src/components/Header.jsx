import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'

function Header (props) {
  const { heading, duration, handleChange } = props

  return (
    <Card
      sx={{
        position: 'sticky',
        top: '0',
        background: '#fff',
        zIndex: '9'
      }}
    >
      <CardHeader
        action={
          <FormControl
            sx={{
              position: 'fixed',
              right: '16px',
              top: '6px'
            }}
          >
            <InputLabel id="demo-simple-select-autowidth-label">
              Time
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={duration}
              onChange={handleChange}
              autoWidth
              label="Time"
            >
              <MenuItem value={7}>Last 1 Week</MenuItem>
              <MenuItem value={14}>Last 2 Weeks</MenuItem>
              <MenuItem value={30}>Last 1 Month</MenuItem>
            </Select>
          </FormControl>
        }
        title={heading}
        sx={{
          display: 'flex',
          justifyContent: 'between',
          alignItems: 'center',
          position: 'sticky',
          top: '0',
          background: '#fff',
          zIndex: '9'
        }}
      ></CardHeader>
    </Card>
  )
}

Header.propTypes = {
  heading: PropTypes.string,
  duration: PropTypes.number,
  handleChange: PropTypes.func
}

export default Header
