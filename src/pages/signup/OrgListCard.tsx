import React from 'react'

import type { TenantRef } from '../../types/auth'
import type { WizardStopProps } from '../../components'
import { BackAndForwardButtons, Link } from '../../components'

const OrgListCard: React.FC<WizardStopProps> = ({
  step,
  totalSteps,
  finalActionName,
  forward,
  back,
  isLoading,
  bucket
}) => {
  
  const goToApp = () => {
    forward && forward({afterList: 'dash'})
  }

  const createNewOrg = () => {
    forward && forward({afterList: 'newOrg'})
  }

  return (<>
    <div className='org-list-outer pseudo-form'>
      <p className='message-detail'>You are a member of the following Organizations:</p>
      <ul className='org-list'>
      {bucket.tenantOrgs.map((def: TenantRef) => (
        <li className='org-list-item' key={def.tenantId}>{def.tenantId}:&nbsp;{def.fullOrgName}</li>        
      ))}
      </ul>
      <p className='create-new-message'>
        You can access any of them from the dash, <br/>
        or you can <Link className='create-new-org-link' onClick={createNewOrg}>create a new one.</Link></p>
    </div>
    <BackAndForwardButtons
      step={step}
      totalSteps={totalSteps}
      finalActionName={finalActionName}
      disableForward={false}
      disableBack={false}
      forward={goToApp}
      back={back}
    />
  </>)
} 

export default OrgListCard
