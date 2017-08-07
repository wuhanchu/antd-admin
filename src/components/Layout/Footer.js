import React from 'react'
<<<<<<< HEAD
import styles from './Footer.less'
import { config } from '../../utils'
=======
import { config } from 'utils'
import styles from './Footer.less'
>>>>>>> 6ae39bfd55e182f5d0b37a9192dfa1756787d5f4

const Footer = () => (<div className={styles.footer}>
  {config.footerText}
</div>)

export default Footer
