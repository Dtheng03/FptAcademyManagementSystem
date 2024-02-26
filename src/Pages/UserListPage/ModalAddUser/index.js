import styles from "./ModalAddUser.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { CancleIcon } from "../../../Components/Common/Icons/ActionIcons";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { notification } from "antd";

const cx = classNames.bind(styles);

const schema = yup
    .object({
        userType: yup.string().required("This field is required"),
        fullName: yup.string().required("This field is required").trim(),
        email: yup.string().required("This field is required").email("This field must be a valid email").trim(),
        phone: yup.string().required("This field is required").length(10, "Phone number must have 10 digits").trim(),
        dob: yup.string().required("This field is required"),
    })
    .required()

function ModalAddUser({ closeModal }) {
    const token = sessionStorage.getItem("token");
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const [gender, setGender] = useState("Male");
    const [status, setStatus] = useState("Active");

    // ham handle form add
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = (data, event) => {
        event.preventDefault();
        const finalData = { ...data, gender: gender, status: status }
        axios.post('http://fams-group1-net03.ptbiology.com/api/user/create-user', finalData)
            .then(function () {
                notification.success({
                    message: "Add new user successfully!"
                })
                closeModal();
            })
            .catch(function (error) {
                console.log(error);
                notification.error({
                    message: "Add new user failed!",
                    description: "Please try again!"
                })
            });
        reset();
    }

    return (
        <div className={cx("modal")}>
            <form
                className={cx("modal-container")}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className={cx("heading")}>
                    <button className={cx("close", "disabled")} />
                    <span>Add a new user</span>
                    <button
                        className={cx("close")}
                        type="reset"
                        onClick={() => {
                            reset()
                            closeModal()
                        }}
                    >
                        <CancleIcon />
                    </button>
                </div>

                <div className={cx("body")}>
                    {/* User type */}
                    <div className={cx("field")}>
                        <label className={cx("label")}>User type</label>
                        <select
                            className={cx("input")}
                            {...register("userType")}
                        >
                            <option value={0}>Select one</option>
                            <option value={"Super Admin"}>Super Admin</option>
                            <option value={"Admin"}>Admin</option>
                            <option value={"Trainer"}>Trainer</option>
                        </select>
                    </div>
                    {errors.userType && <p className={cx("error")}>{errors.userType?.message}</p>}

                    {/* Name */}
                    <div className={cx("field")}>
                        <label className={cx("label")}>Name</label>
                        <input
                            {...register("fullName")}
                            className={cx("input")}
                            placeholder="User name"
                        />
                    </div>
                    {errors.fullName && <p className={cx("error")}>{errors.fullName?.message}</p>}

                    {/* Email */}
                    <div className={cx("field")}>
                        <label className={cx("label")}>Email Address</label>
                        <input
                            {...register("email")}
                            className={cx("input")}
                            placeholder="Email address"
                        />
                    </div>
                    {errors.email && <p className={cx("error")}>{errors.email?.message}</p>}

                    {/* Phone */}
                    <div className={cx("field")}>
                        <label className={cx("label")}>Phone</label>
                        <input
                            {...register("phone")}
                            className={cx("input")}
                            type="tel"
                            pattern="[0-9]{10}"
                            placeholder="Phone number"
                        />
                    </div>
                    {errors.phone && <p className={cx("error")}>{errors.phone?.message}</p>}

                    {/* DOB */}
                    <div className={cx("field")}>
                        <label className={cx("label")}>Date of birth</label>
                        <input
                            {...register("dob")}
                            className={cx("input")}
                            type="date"
                        />
                    </div>
                    {errors.dob && <p className={cx("error")}>{errors.dob?.message}</p>}

                    {/* Gender */}
                    <div className={cx("field")}>
                        <label className={cx("label")}>Gender</label>
                        <span>
                            <input type="radio" value={true} checked={gender === "Male"} onChange={() => { setGender("Male") }} />
                            Male
                        </span>
                        <span>
                            <input type="radio" value={false} checked={gender === "Female"} onChange={() => { setGender("Female") }} />
                            Female
                        </span>
                    </div>

                    {/* Status */}
                    <div className={cx("field")}>
                        <label className={cx("label")}>Status</label>
                        {status ?
                            <p
                                className={cx("switch", "active")}
                                onClick={() => { setStatus("Inactive") }}
                            >
                                <span className={cx("status")}>Active</span>
                                <span className={cx("dot")}></span>
                            </p>
                            :
                            <p
                                className={cx("switch", "inactive")}
                                onClick={() => { setStatus("Active") }}
                            >
                                <span className={cx("dot")}></span>
                                <span className={cx("status")}>Inactive</span>
                            </p>
                        }
                    </div>

                    <div className={cx("field", "btn-group")}>
                        <button
                            className={cx("cancel")}
                            type="reset"
                            onClick={() => {
                                reset()
                                closeModal()
                            }}
                        >
                            Cancel
                        </button>
                        <button className={cx("save")} type="submit">Save</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ModalAddUser;