import styles from "./ModalAddUser.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { CancleIcon } from "../../../Components/Common/Icons/ActionIcons";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const cx = classNames.bind(styles);

const schema = yup
    .object({
        role: yup.number().moreThan(0, "This field is required"),
        name: yup.string().required("This field is required").trim(),
        email: yup.string().required("This field is required").email("This field must be a valid email").trim(),
        phone: yup.number().required("This field is required").length(10, "Phone number must have 10 digits").trim(),
        dob: yup.string().required("This field is required"),
    })
    .required()

function ModalAddUser({ closeModal }) {
    const [gender, setGender] = useState(true);
    const [status, setStatus] = useState(true);

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
        console.log(finalData);
        axios.post('https://65bc5f2952189914b5bdcf3a.mockapi.io/Users', finalData)
            .then(function () {
                alert("User added successfully!!!");
                closeModal();
            })
            .catch(function (error) {
                console.log(error);
                alert("User added failed! Please check all information and try again")
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
                            {...register("role")}
                        >
                            <option value={0}>Select one</option>
                            <option value={1}>Super Admin</option>
                            <option value={2}>Admin</option>
                            <option value={3}>Trainer</option>
                        </select>
                    </div>
                    {errors.role && <p className={cx("error")}>{errors.role?.message}</p>}

                    {/* Name */}
                    <div className={cx("field")}>
                        <label className={cx("label")}>Name</label>
                        <input
                            {...register("name")}
                            className={cx("input")}
                            placeholder="User name"
                        />
                    </div>
                    {errors.name && <p className={cx("error")}>{errors.name?.message}</p>}

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
                            <input type="radio" value={true} checked={gender === true} onChange={() => { setGender(true) }} />
                            Male
                        </span>
                        <span>
                            <input type="radio" value={false} checked={gender === false} onChange={() => { setGender(false) }} />
                            Female
                        </span>
                    </div>

                    {/* Status */}
                    <div className={cx("field")}>
                        <label className={cx("label")}>Status</label>
                        {status ?
                            <p
                                className={cx("switch", "active")}
                                onClick={() => { setStatus(false) }}
                            >
                                <span className={cx("status")}>Active</span>
                                <span className={cx("dot")}></span>
                            </p>
                            :
                            <p
                                className={cx("switch", "inactive")}
                                onClick={() => { setStatus(true) }}
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