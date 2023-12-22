import React, { useState } from "react";
import { useForm } from "react-hook-form";
import publicRequest, { publicPost } from "../services/publicRequest";
import { LOGIN } from "../services/apiEndPoints";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LOGINSTYLES from "./login.module.scss";
import { Eye, EyeOff, Loader } from "react-feather";
import loader from "./../../assets/gif/loader.bc8314aa27bf3d756d8d.gif";

const Login = () => {
  const navigate = useNavigate();
  const [passwordVisibility, SetPasswordVisibility] = useState(true);
  const defaultValues = {
    mobileNumber: "",
    password: "",
  };
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });
  console.log("isSubmitting", isSubmitting);
  const handleFormSubmit = async () => {
    const values = getValues();
    const res = await publicRequest.post(LOGIN, {
      Username: values.mobileNumber,
      Password: values.password,
    });
    if (res) {
      if (res?.data?.success) {
        toast.success("Login Successful");
        localStorage.setItem(
          "token",
          btoa(values.mobileNumber + ":" + values.password)
        );
        localStorage.setItem("userId", res?.data?.userDetail?.data?.UserId);
        localStorage.setItem("userName", res?.data?.userDetail?.data?.Name);
        navigate("/");
      } else {
        toast.error(res?.data?.errormessage || "Invalid Credentials");
      }
    }
  };
  return (
    <div>
      <>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className={LOGINSTYLES.loginContainer}>
            <div className={LOGINSTYLES.loginBox}>
              <div className={LOGINSTYLES.loginField}>
                <label>Mobile Number :</label>
                <input
                  placeholder="Enter Mobile Number"
                  name="mobileNumber"
                  type="string"
                  // maxLength={10
                  {...register("mobileNumber", {
                    required: true,
                  })}
                  value={watch("mobileNumber")}
                  onChange={(e) => {
                    const value = e.target.value;
                    console.log(
                      "/[0-9]{1,10}/.test(value)",
                      /[0-9]{1,10}/.test(value)
                    );
                    if (
                      (/[0-9]{1,10}/.test(value) && value.length <= 10) ||
                      value === ""
                    ) {
                      setValue("mobileNumber", value);
                    }
                  }}
                />
                {errors?.mobileNumber?.type === "required" && (
                  <span className={LOGINSTYLES.errorSpan}>
                    Mobile Number is required
                  </span>
                )}
              </div>
              <div
                className={`${LOGINSTYLES.loginField} ${LOGINSTYLES.relative}`}
              >
                <label>Password :</label>
                <input
                  type={passwordVisibility ? "password" : "string"}
                  placeholder="Enter password"
                  {...register("password", { required: true })}
                />
                {passwordVisibility ? (
                  <Eye
                    className={LOGINSTYLES.eyeButton}
                    onClick={() => SetPasswordVisibility(false)}
                  />
                ) : (
                  <EyeOff
                    className={LOGINSTYLES.eyeButton}
                    onClick={() => SetPasswordVisibility(true)}
                  />
                )}
                {errors?.password?.type === "required" && (
                  <span className={LOGINSTYLES.errorSpan}>
                    Password is required
                  </span>
                )}
              </div>
              <button
                className={LOGINSTYLES.loginButton}
                disabled={isSubmitting ? true : false}
                type="submit"
              >
                {isSubmitting ? (
                  <img src={loader} className={LOGINSTYLES.loader} />
                ) : (
                  "Log In"
                )}
              </button>
            </div>
          </div>
        </form>
      </>
    </div>
  );
};

export default Login;
