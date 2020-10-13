import React from 'react'
import { Wrapper, Label } from './styles'

const Search = ({ label, children, error, relative }) => (
  <Wrapper error={error} relative={relative}>
    {children} 
  </Wrapper>
)

export default InputField
