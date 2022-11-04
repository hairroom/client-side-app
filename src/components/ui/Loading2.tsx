import React from 'react'
import style from './Loading2.module.css'
import logo from '../../images/Logo.png'

export const Loading2 = () => {
  return (
    <div className={style['component-loading-2']}>
        <div className={style['container-loading-logo']}>
            <img src={logo} alt="Logo" className={style['loading-logo']} />
        </div>
    </div>
  )
}
