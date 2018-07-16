import React from 'react';
import { connect } from 'dva';
import Rstar from '../../components/Rstar'
import styles from './index.less';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <Rstar />
      <div className={styles.content}>conste</div>
      <div className={styles.footer}>You’re never wrong to do the right thing.</div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
