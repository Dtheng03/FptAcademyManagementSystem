import React from 'react'
import classNames from 'classnames/bind';
import styles from '../ViewClassPage.module.scss';
import { Layout, } from 'antd';






const cx = classNames.bind(styles);
const { Sider, Content } = Layout;



export default function TrainingProgram() {

  return (
    <div>

      <div className={cx("header-footer-1")}>
        <p className={cx("header-footer-training-program")}>DevOps Foudation</p>
        <p className={cx("header-footer-day")}>31 days (97 hours) | Modified on 23/7/2022 by <span className={cx("header-footer-name")}>Warrior Tran </span></p>
      </div>

      <div className={cx("header-footer-2")}>
        <Layout className={cx("layout-box-shadow")}>
          <Layout>
            <Sider width="26%" className={cx("header-footer-sider")}>
              <img src='https://i.pinimg.com/564x/da/cb/f3/dacbf3efff366047c516d8342c4e645b.jpg' alt='Avata' className={cx("avata")} />
              <img src='https://i.pinimg.com/564x/da/cb/f3/dacbf3efff366047c516d8342c4e645b.jpg' alt='Avata' className={cx("avata")} />
              <img src='https://i.pinimg.com/564x/da/cb/f3/dacbf3efff366047c516d8342c4e645b.jpg' alt='Avata' className={cx("avata")} />
            </Sider>
            <Content className={cx("header-footer-content")}>
              <div className={cx("header-footer-edit")}>
                <p className={cx("header-footer-content-linux")}>L i n u x</p>
                <div className={cx("header-footer-edit-button")}>
                  <p className={cx("header-footer-active")}>Active</p>
                </div>
              </div>

              <div className={cx("header-footer-edit-infomation")}>
                <p className={cx("header-footer-information")}>LIN v2.0 | 4 days (12hours) | on 23/07/2022 by Johny Deep </p>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>

      <div className={cx("header-footer-3")}>
        <Layout className={cx("layout-box-shadow")}>
          <Layout>
            <Sider width="26%" className={cx("header-footer-sider")}>
              <img src='https://i.pinimg.com/564x/da/cb/f3/dacbf3efff366047c516d8342c4e645b.jpg' alt='Avata' className={cx("avata")} />
              <img src='https://i.pinimg.com/564x/da/cb/f3/dacbf3efff366047c516d8342c4e645b.jpg' alt='Avata' className={cx("avata")} />
              <img src='https://i.pinimg.com/564x/da/cb/f3/dacbf3efff366047c516d8342c4e645b.jpg' alt='Avata' className={cx("avata")} />
            </Sider>
            <Content className={cx("header-footer-content")}>
              <div className={cx("header-footer-edit")}>
                <p className={cx("header-footer-content-linux")}>L i n u x</p>
                <div className={cx("header-footer-edit-button")}>
                  <p className={cx("header-footer-active")}>Active</p>
                </div>
              </div>

              <div className={cx("header-footer-edit-infomation")}>
                <p className={cx("header-footer-information")}>LIN v2.0 | 4 days (12hours) | on 23/07/2022 by Johny Deep </p>
              </div>

            </Content>

          </Layout>
        </Layout>
      </div>

    </div>
  )
}
