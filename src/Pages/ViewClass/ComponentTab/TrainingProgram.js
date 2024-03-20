import React from 'react'
import classNames from 'classnames/bind';
import styles from '../ViewClassPage.module.scss';
import { ConfigProvider, Layout, } from 'antd';
import Modal from 'antd/es/modal/Modal';
import { useState } from 'react';
import { HomeworkIcon } from '../../../Components/Common/Icons/OtherIcons';
import { LectureIcon } from '../../../Components/Common/Icons/DeliveryTypesIcons';
import { GradeIcon } from '../../../Components/Common/Icons/IndicatorIcons';







const cx = classNames.bind(styles);
const { Sider, Content } = Layout;



export default function TrainingProgram() {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };


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

            <ConfigProvider
              theme={{
                components: {
                  Modal: {
                    contentBg: '#2D3748',
                    
                  }
                },
              }}
            >
              <Content className={cx("header-footer-content")}>
                <div className={cx("header-footer-edit")} onClick={handleShowModal}>
                  <p className={cx("header-footer-content-linux")}>L i n u x</p>
                  <div className={cx("header-footer-edit-button")}>
                    <p className={cx("header-footer-active")}>Active</p>
                  </div>
                </div>

                <div className={cx("header-footer-edit-infomation")}>
                  <p className={cx("header-footer-information")}>LIN v2.0 | 4 days (12hours) | on 23/07/2022 by Johny Deep </p>
                </div>

                <Modal

                  open={isModalVisible}
                  onCancel={handleCancelModal}
                  footer={null}

                >
                  <div className={cx("modal-box-icon")}>
                    <p className={cx("title-modal-box-footer")}>Fresher Develop Operation</p>
                  </div>

                  <div className={cx("modal-homework-icon")}>

                    Day 10 of 31
                  </div>
                  <div className={cx("modal-box-icon-unit6")}>

                    <p style={{ color: "white" }}>Unit 6 :</p>
                    <p className={cx("title-modal-box-footer")}>MVC Architecture in ASP.NET</p>
                  </div>
                  <div className={cx("modal-homework-icon")}>
                    <HomeworkIcon style={{ width: "20px", color: "white" }} />
                    <p>Location</p>
                    <p className={cx("modal-footer-ftown2")}>Ftown2</p>
                  </div>
                  <div className={cx("modal-box-icon")}>
                    <LectureIcon style={{ width: "20px", color: "white" }} />
                    <p style={{ color: "white" }}>Trainer</p>
                    <p className={cx("modal-footer-name")}>Dinh Vu Quoc Trung</p>
                  </div>
                  <div className={cx("modal-box-icon")}>
                    <GradeIcon style={{ width: "20px", color: "white" }} />
                    <p style={{ color: "white" }}>Admin</p>
                    <p className={cx("modal-footer-name")}>Ly Lien Lien Dung</p>
                  </div>
                </Modal>
              </Content>
            </ConfigProvider>
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

    </div >
  )
}
