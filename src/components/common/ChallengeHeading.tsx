import { Typography } from '@mui/material'
import React from 'react'

const ChallengeHeading = ({
    label
}:{label:string}) => {
  return (
      <Typography variant="h4" gutterBottom className='text-sm'>
          {label}
      </Typography>
  )
}

export default ChallengeHeading