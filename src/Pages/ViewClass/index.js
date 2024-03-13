import classNames from 'classnames/bind';
import styles from './ViewClassPage.module.scss';
import React from 'react';
import { MoreIcon } from '../../Components/Common/Icons/ActionIcons';
import { LabIcon, LectureIcon, ReviewIcon, ExamIcon, WorkshopIcon } from '../../Components/Common/Icons/DeliveryTypesIcons';
import { Layout, Collapse, ConfigProvider } from 'antd';
import { TrainingCalendarIcon } from '../../Components/Common/Icons/NavMenuIcons';
import { AlarmIcon, HomeworkIcon } from '../../Components/Common/Icons/OtherIcons';
import { GradeIcon, SupplierIcon } from '../../Components/Common/Icons/IndicatorIcons';
import { useState } from 'react';
import { DatePicker, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { CreateIcon } from '../../Components/Common/Icons/DocManageIcons';
import TrainingProgram from './ComponentTab/TrainingProgram';
import Syllabus from '../../Components/Common/SyllabusTab/syllabus/syllabus'
import Schedule from "../ViewClass/CalenderTimeFrame/Schedule";
// import Collapse from 'rc-collapse';












const cx = classNames.bind(styles);
const { Sider, Content } = Layout;

const { RangePicker } = DatePicker;


function ViewClass() {
    //Calendar time frame
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleDateChange = (dates) => {
        if (dates) {
            setStartDate(dates[0]);
            setEndDate(dates[1]);
        } else {
            setStartDate(null);
            setEndDate(null);
        }
    };

    const syllabusNames = [
        "Training Program",
        "Attendee List",
        "Budget",
        "Others",
    ];
    const items = [
        {
            label: <Link className={cx("menu-icon")} to path="view-class"><CreateIcon style={{ margin: "0px 5px 0px 0px", width: "18%" }} /> Edit class</Link>,
            key: '0'
        }
    ];
    const [activeComponent, setActiveComponent] = useState("TrainingProgram");
    const handleTabClick = (component) => {
        setActiveComponent(component);
    };

    return (
        <div className={cx("container")}>
            <div className={cx("header")}>
                <div className={cx("header-class")}>
                    <span className={cx("span")}>C l a s s</span>
                    <div className={cx("header-fresher")}>
                        <div className={cx("space-fresher-planning")}>
                            <p className={cx("font-fresher")}>Fresher Develop Operation </p>
                            <div className={cx("planning")}>
                                <p className={cx("planning-status")}>Planning</p>
                            </div>


                        </div>

                        <ConfigProvider
                            theme={{
                                components: {
                                    Dropdown: {
                                        colorTextHeading: "blue"
                                    },
                                },
                            }}
                        >

                            <div className={cx("button-moreIcon")}>
                                {/* <button className={cx("button")} onClick={handleButtonClicked}><MoreIcon /></button> */}
                                <Dropdown
                                    menu={{
                                        items,
                                    }}
                                    trigger={['click']}
                                >
                                    <MoreIcon />
                                </Dropdown>
                            </div>
                        </ConfigProvider>
                    </div>

                    <div className={cx("class-code")}>
                        HCM22_FR_DevOps_01

                        <div className={cx("underline")}>
                            _________________________________________________________________________________________________
                        </div>
                    </div>

                    <div className={cx("footer-header-class")}>
                        <p className={cx("day")}>31</p>
                        <div className={cx("day-details")}>
                            days (97 hours) |

                            <LabIcon />
                            <LectureIcon />
                            <ExamIcon />
                            <WorkshopIcon />
                            <ReviewIcon />

                        </div>
                    </div>
                </div>
            </div>

            <div className={cx("body")}>
                <Layout className={cx("layout-style")}>

                    <Layout>
                        <Sider width="33%" className={cx("sider-style")}>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Collapse: {
                                            colorTextHeading: "#fff",
                                            headerPadding: "13px 16px 13px 16px"
                                        }
                                    },
                                }}
                            >


                                <Collapse style={{ backgroundColor: '#2D3748', flex: '1', color: '#fff' }} expandIconPosition='end'>
                                    <Collapse.Panel header={<div className={cx("sider-header")}><TrainingCalendarIcon /> General </div>} key="1">
                                        <div className={cx("sider-body-alarm")}>
                                            <AlarmIcon />
                                            <p className={cx("sider-body-items")}>Class time </p>
                                            <p className={cx("sider-body-time")}>09:00 - 12:00</p>
                                        </div>

                                        <div className={cx("sider-body-homework")}>
                                            <HomeworkIcon />
                                            <p className={cx("sider-body-items")}>Location </p>
                                            <div className={cx("sider-body-location")}>
                                                <span className={cx("sider-body-item-location")}>Ftown1</span>
                                                <span className={cx("sider-body-item-location")}>Ftown2</span>
                                            </div>
                                        </div>

                                        <div className={cx("sider-body-homework")}>
                                            <LectureIcon />
                                            <p className={cx("sider-body-items")}>Trainer </p>
                                            <div className={cx("sider-body-name")}>
                                                <span className={cx("sider-body-item-name")}>
                                                    Dinh Vu Quoc Trung</span>
                                                <span className={cx("sider-body-item-name")}>
                                                    Ba Chu Heo</span>
                                                <span className={cx("sider-body-item-name")}>
                                                    Heo Cheo Ba</span>
                                                <span className={cx("sider-body-item-name")}>
                                                    Tap The Lop</span>

                                            </div>
                                        </div>

                                        <div className={cx("sider-body-homework")}>
                                            <GradeIcon />
                                            <p className={cx("sider-body-items")}>Admin </p>
                                            <div className={cx("sider-body-name")}>
                                                <span className={cx("sider-body-item-name")}>
                                                    Ly Lien Lien Dung</span>
                                                <span className={cx("sider-body-item-name")}>
                                                    Dung Lien Lien Ly</span>

                                            </div>
                                        </div>

                                        <div className={cx("sider-body-homework")}>
                                            <SupplierIcon />
                                            <p className={cx("sider-body-items")}>FSU </p>
                                            <div className={cx("sider-body-location")}>
                                                <span className={cx("sider-body-item-supplierIcon")}>FHM</span>
                                                <span className={cx("sider-body-item-supplierIcon")}>
                                                    BaCH@fsoft.com.vn
                                                </span>
                                            </div>
                                        </div>

                                        <div className={cx("sider-underline")}>
                                            ___________________
                                        </div>

                                        <div className={cx("sider-body-alarm")}>
                                            <p className={cx("sider-body-items")}>Created </p>
                                            <span className={cx("sider-body-item-created")}>
                                                25/03/2022 by DanPL
                                            </span>
                                        </div>

                                        <div className={cx("sider-body-alarm")}>
                                            <p className={cx("sider-body-items")}>Review </p>
                                            <span className={cx("sider-body-item-review")}>
                                                30/03/2022 by TrungDVQ
                                            </span>
                                        </div>

                                        <div className={cx("sider-body-alarm")}>
                                            <p className={cx("sider-body-items")}>Approve </p>
                                            <span className={cx("sider-body-item-approve")}>
                                                02/04/2022 by VongNT
                                            </span>
                                        </div>
                                    </Collapse.Panel>
                                </Collapse>
                            </ConfigProvider>


                            <ConfigProvider
                                theme={{
                                    components: {
                                        Collapse: {
                                            colorTextHeading: "#fff",
                                            headerPadding: "12px 16px 12px 16px"


                                        }
                                    },
                                }}
                            >
                                <div className={cx("attendee-position")}>
                                    <Collapse style={{ backgroundColor: '#2D3748', flex: '1', color: '#fff' }} expandIconPosition='end'>
                                        <Collapse.Panel header={<div className={cx("sider-header")} style={{ width: "100%", margin: "auto" }}><GradeIcon /> Attendee <p className={cx("attendee-name")}>Fresher</p> </div>} key="1">
                                            {/* Nội dung và icon */}
                                            <div className={cx("attendee-content")}>
                                                <div className={cx("attendee-background-color")}>
                                                    <p className={cx("attendee-items-planned")}>Planned</p>
                                                    <p className={cx("attendee-items-number-planned")}> 10 </p>
                                                </div>
                                                <div className={cx("attendee-background-color-accepted")}>
                                                    <p className={cx("attendee-items-accepted")}>Accepted</p>
                                                    <p className={cx("attendee-items-number-accepted")}> 9 </p>
                                                </div>
                                                <div className={cx("attendee-background-color-actual")}>
                                                    <p className={cx("attendee-items-actual")}> Actual</p>
                                                    <p className={cx("attendee-items-number-actual")}> 9 </p>
                                                </div>
                                            </div>
                                        </Collapse.Panel>
                                    </Collapse>
                                </div>
                            </ConfigProvider>
                        </Sider>



                        <Content className={cx("content-style")}>
                            <ConfigProvider
                                theme={{
                                    components: {

                                        Collapse: {
                                            colorTextHeading: "#fff",
                                            headerPadding: "11.3px 15px 9px 15px"
                                        },
                                        RangePicker: {

                                        }
                                    },
                                }}
                            >
                                {/* <Collapse style={{ backgroundColor: '#2D3748', flex: '1', color: '#fff' }} expandIconPosition='end'>
                                    <Collapse.Panel header={
                                        <div className={cx("sider-header")}>
                                            <TrainingCalendarIcon /> Time frame
                                            <RangePicker
                                                placeholder={['dd/mm/yyyy', 'dd/mm/yyyy']}
                                                format={['DD/MM/YYYY', 'DD/MM/YYYY']}
                                                style={{ backgroundColor: "#fff" }}
                                                value={[startDate, endDate]}
                                                onChange={handleDateChange}
                                            />
                                        </div>} key="1">

                                        <div className={cx("collapse-content")}>
                                            <div>
                                                <Calendar />
                                            </div>
                                        </div>
                                    </Collapse.Panel>
                                </Collapse> */}
                                <Schedule/>
                            </ConfigProvider>
                        </Content>

                    </Layout>

                    <div className={cx("footer-style")}>
                        <div className={cx("syllabus_tab_button")}>
                            {syllabusNames.map((name, index) => (
                                <Syllabus key={index} name={name} />
                            ))}
                        </div>
                        {/* Add more buttons for other tabs if needed */}

                        <div className={cx("content-container")}>
                            {activeComponent === "TrainingProgram" && <TrainingProgram />}
                            {/* Add more conditions for other components */}
                            {activeComponent === "AttendeeList"}
                            {activeComponent === "BudGetTab"}
                            {activeComponent === "Others"}
                        </div>

                    </div>
                </Layout>
            </div>
        </div>


    );
}
export default ViewClass;




