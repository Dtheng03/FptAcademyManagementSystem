import {
  FocusIcon,
  GradeIcon,
  VerifiedUserIcon,
} from "../../../Components/Common/Icons/IndicatorIcons";
import {
  UserManagementIcon,
  SettingIcon,
} from "../../../Components/Common/Icons/NavMenuIcons";
import StatusChip from "../../../Components/Common/Status/StatusChip";
import style from "./General.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export default function General() {
  return (
    <div className={cx("container")}>
      <div className={cx("body")}>
        <div className={cx("display-box-1")}>
          <div className={cx("line-1")}>
            <div className={cx("inner-line")}>
              <div className={cx("icon")}>
                <GradeIcon />
              </div>
              <body2 className={cx("text")}>Lever</body2>
            </div>

            <body2 className={cx("level")}>All lever</body2>
          </div>

          <div className={cx("line-2")}>
            <div className={cx("inner-line")}>
              <div className={cx("icon")}>
                <UserManagementIcon />
              </div>
              <body2 className={cx("text")}>Attendee number</body2>
            </div>
            <body2 className={cx("number")}>20</body2>
          </div>

          <div className={cx("line-3")}>
            <div className={cx("inner-line")}>
              <div className={cx("icon")}>
                <VerifiedUserIcon />
              </div>
              <body2 className={cx("text")}>Output standard</body2>
            </div>
            <div className={cx("standar")}>
              <StatusChip title={"H4SD"} /> <StatusChip title={"K6SD"} />
              <StatusChip title={"H6SD"} />
            </div>
          </div>
        </div>
        <div className={cx("display-box-2")}>
          <div>
            <div className={cx("content")}>
              <SettingIcon />
              Technical Requirement(s)
            </div>
            <div className={cx("content")}>
              Trainees'PCs need to have following software installed & run
              without any issues:
            </div>
            <div>
              <li className={cx("list")}>Microsoft SQL Server 2005 Express</li>
              <li className={cx("list")}>Microsoft Visual Studio 2017</li>
              <li className={cx("list")}>
                Microsoft Office 2007 (Visio, Word, PowerPoint)
              </li>
            </div>
          </div>
        </div>
      </div>

      <div className={cx("body-2")}>
        <div className={cx("content-2")}>
          <div className={cx("text-head")}>
            <FocusIcon />
             Course objectivies
          </div>
          <div className={cx("text")}>
            This topic is to introduce about C# programming language knowledge;
            adapt trainees with skills, lessons and practices which is
            specifically used in the Fsoft projects.
          </div>
          <div className={cx("text")}>
            In details, after completing the topic ,trainees will: trainees
            topic, the completing after details,In
          </div>
          <ul>
            <li className={cx("text")}>
              Understand basic concepts of high-level programming languages
              (keyword, statement, operator, control-of-flow)
            </li>
            <li className={cx("text")}>
              Understand and distinguish two concepts: class (Class) and object
              (Object)
            </li>
            <li className={cx("text")}>
              Understand and apply object-oriented programming knowledge to
              resolve simple problems (Inheritance, Encapsulation, Abstraction,
              Polymorphism)
            </li>
            <li className={cx("text")}>
              Working with some of the existing data structures in C# (List,
              ArrayList, HashTable, Dictionary)
            </li>
            <li className={cx("text")}>
              Know how to control program errors (use try ... catch .. finally,
              throw, throws)
            </li>
            <li className={cx("text")}>
              Be able to working with concurrency and multi-thread in C#
            </li>
            <li className={cx("text")}>
              Be able to working with common classes in ADO.net: SqlConnection,
              SqlCommand, SqlParameter, SqlDataAdapter, SqlDataReader
            </li>
            <li className={cx("text")}>
              Be able to manipulate SQL data from Window Form Application via 4
              basic commands: Add, Update, Delete, Select
            </li>
            <li className={cx("text")}>
              Know how to design UI screen in Window Form Application
            </li>
            <li className={cx("text")}>
              Know how to use appropriate controls for each field/data type:
              Textbox, Label, Combobox, Radio, DateTimePicker, NumericUpDown,
              RichTextBox
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

