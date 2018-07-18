import React from 'react';
import { connect } from 'dva';
import Rstar from 'components/Rstar';
import RFooter from 'components/Footer';
import { LINKS, QUOTES } from 'utils/constants';
import avatar from 'assets/avatar.png';
import styles from './index.less';

const Home = () => {
  return (
    <div className={styles.normal}>
      <Rstar />
      <div className={styles.content}>
        <h1>Yyeo的个人网站<img src={avatar} alt="icon"/></h1>
        <h1>It’s building...</h1>
      </div>
      <RFooter className={styles.footer} links={LINKS} quotes={QUOTES}/>
    </div>
  );
}

Home.propTypes = {
};

export default connect()(Home);
