import styles from "../SyllabusDescription/SyllabusDescription.module.scss"
import classNames from "classnames/bind";
import axios from "axios";
import { useEffect, useState } from "react"; 

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
    return formattedDate;
}

function SyllabusDescription({ id }) {
    const [data, setData] = useState(null); // Initialize data state to null
    const cx = classNames.bind(styles);

    useEffect(() => {
        if (!id) return;

        axios
          .get(
            `http://fams-group1-net03.ptbiology.com/api/syllabus/view-details-syllabus?syllabusId=${id}`
          )
          .then((response) => {
            // Handle successful response
            console.log("Response from API:", response.data);
            setData(response.data.data); // Set data to response.data.data
          })
          .catch((error) => {
            // Handle error
            console.error("Error fetching data:", error);
          });
    }, [id]);    

    // Render null if data is not yet fetched
    if (!data) return null;

    const createdByFullName = data.createdBy && data.createdBy.fullName;
    const createdDate = data.trainingUnits[0]?.trainingContents[0]?.trainingMaterials[0]?.createdDate;

    return (
        <div className={cx("description-title")}>
            <div className={cx("line-1")}>
                <h4 className={cx("day-number")}>{data.duration.day}</h4>
                <p className={cx("description-text")}>
                    days ({data.duration.hour} hours)
                </p>
            </div>

            <div className={cx("line-2")}>
                <p className={cx("description-text")}>
                    Modified on {formatDate(createdDate)} by
                </p>
                <p className={cx("author")}>{createdByFullName}</p>
            </div>
        </div>
    );
}

export default SyllabusDescription;
