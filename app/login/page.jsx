"use client";

import React, { useLayoutEffect } from "react";
import styles from "./page.module.css";
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Button from "@/components/UI/Button/Button";
import { login } from "@/controllers/auth.controller";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import { Routes } from "@/routes/routes";
import { useWindowSize } from "react-use";
import useAuthStore from "@/store/store";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, setToken } = useAuthStore();

  const router = useRouter();
  useLayoutEffect(() => {
    if (isAuthenticated) {
      router.back();
    }
  }, []);

  const { width } = useWindowSize();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate: mutateLogin, isLoading: isLoadingLogin } = useMutation(login, {
    onSuccess: (data) => {
      const userData = data.data;
      setToken(userData.accessToken);
      setUser(userData.user);
      setIsAuthenticated(true);
      reset();
      router.push(Routes.NewQuotation);
    },
    onError: (error) => {
      toast(error.response.data.message);
    },
  });

  const onSubmit = (payload) => {
    mutateLogin(payload);
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.leftSection}>
          <div className={styles.login}>
            <h1 className={styles.header}>Sign In</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.loginForm}>
              <div className={styles.loginFormContainer}>
                <InputContainer
                  label='Email'
                  inputPlaceholder='Email'
                  inputType='email'
                  inputName='email'
                  register={register}
                  isRequired={true}
                  stackLabelInput={true}
                  alignLabelInput={false}
                  marginTop={15}
                  width={100}
                  widthUnit={"%"}
                  fontSize={20}
                  height={60}
                  heightUnit={"px"}
                />
                <InputContainer
                  label='Password'
                  inputPlaceholder='Password'
                  inputType='password'
                  inputName='password'
                  register={register}
                  isRequired={true}
                  stackLabelInput={true}
                  alignLabelInput={false}
                  marginTop={15}
                  width={100}
                  widthUnit={"%"}
                  fontSize={20}
                  height={60}
                  heightUnit={"px"}
                />
                <div className={styles.loginButtonContainer}>
                  <Button
                    title='Login'
                    fillBackground={true}
                    rounded={true}
                    paddingBottom={15}
                    paddingLeft={10}
                    paddingRight={10}
                    paddingTop={15}
                    fontSize={width > 1600 ? 24 : width > 1000 ? 20 : width > 768 ? 16 : 12}
                    width={30}
                    widthUnit={"%"}
                    loading={isLoadingLogin}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={`${styles.icon} ${styles.topRight}`}>
          <img
            src='assets/svg/login-page-icon.svg'
            alt=''
          />
        </div>
        {width > 2160 ? <img src='assets/images/login.png' /> : <img src='assets/images/login 1.png' />}
        <div className={`${styles.icon} ${styles.bottomLeft}`}>
          <img
            src='assets/svg/login-page-icon.svg'
            alt=''
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
