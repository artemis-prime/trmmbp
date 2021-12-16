import React from 'react'
import { observer } from 'mobx-react'
import cx from 'classnames'

import { makeStyles } from '../../style'

import type { NavElement, SimpleHandler } from '../../types'

import { toKebabCase } from '../../util'

import ButtonMenu from './ButtonMenu'
import NavElementMenu from './NavElementMenu'
import LinkButton from '../LinkButton'

import type { AuthService } from '../../types/auth'

const useStyles = makeStyles()((theme: any) => ({
  menuGroupOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    '.$rightMenu &': {
      justifyContent: 'flex-end',
    },
    '&:last-child': {
     // paddingLeft: theme.spacing(2)  
    },
    paddingRight: theme.ext.menuButton.paddingLeft 
  },
  menuButton: {
    ...theme.ext.menuButton
  },
  buttonText: {
    ...theme.ext.menuButtonLabel
  },
}))

const MenuButtons: React.FC<{
  auth: AuthService
  navElements: NavElement[]
  handlers?: Map<string, SimpleHandler>
  groupClassName?: string
}>  = observer(({ 
  auth,
  navElements,
  handlers,
  groupClassName
}) => {

  const { classes: s } = useStyles()
  
  return (
    <div className={cx(s.menuGroupOuter, (groupClassName) ? groupClassName : '')} >
      {navElements.map((element) => {
        const buttonVariant = 
          ((element.ext && element.ext.variant) ? element.ext.variant : 'text') as ('text' | 'outlined' | 'contained' | undefined)
        let title = (element.title === 'Account') ? ((auth.currentUser) ? auth.currentUser.displayName : 'Account') : element.title 

        return (
          (!element.loggedInOnly || element.loggedInOnly && !!auth.currentUser) && (element.subElements ? (
            <ButtonMenu
              id={toKebabCase(title)}
              text={title}
              icon={element.uiElement}
              key={toKebabCase(title)}
            >
              <NavElementMenu elements={element.subElements as NavElement[]} handlers={handlers}/>
            </ButtonMenu>
          ) : (
            <LinkButton 
              key={toKebabCase(title)}
              buttonProps={{ 
                size: 'medium',
                variant: buttonVariant,
                className: cx(s.menuButton, 'link-button', `button-variant-${buttonVariant}`),
                classes: {label: s.buttonText}
              }} 
              to={element.to}
            >
              {title}
            </LinkButton >
          )))
      })}
    </div>
  )
}) 

export default MenuButtons
