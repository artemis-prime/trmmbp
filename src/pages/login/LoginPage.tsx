import React from 'react'

import type { AuthService } from '../../types/auth'

import LoginForm from './LoginForm'

const LoginPage: React.FC<{
  auth: AuthService
  defaultRoute?: string
}> = ({
  auth,
  defaultRoute 
}) => (
  <div className='just-form-outer'>
    <LoginForm defaultRoute={defaultRoute} auth={auth}/>
  </div>
)

export default LoginPage
