import React from 'react'

import type { AuthService } from '../../types/auth'

import ResetPasswordForm from './ResetPasswordForm'

import './style.scss'

const ResetPasswordPage: React.FC<{
  auth: AuthService
}> = ({
  auth
}) => {
  return (
    <div className='just-form-outer'>
      <ResetPasswordForm prompt='Update password' auth={auth} />
    </div>
  )
}

export default ResetPasswordPage