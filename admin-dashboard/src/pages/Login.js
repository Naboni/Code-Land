import { Button, Alert } from "antd";
import React, { Component, useEffect, useState } from "react";


import { LoginOutlined } from "@ant-design/icons";
import { oAuth } from "../services/githubAuthPopupSignin";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { authUser, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authUser) {
      navigate('/dashboard');
    }
  }, [authUser]);

    const handleSubmit = async (actionNumber) => {
        setIsLoading(true);
        // authenticate before creating a room
        try {
          if (!authUser) {
            const token = await oAuth();
            localStorage.setItem('O2', token);
            console.log("AAAA")
          } else {            
            throw new Error('Error');
          }
          setIsLoading(false);
        } catch (_) {
          setIsLoading(false);
          <Alert message="Success Text" type="success" />
        }
        navigate('/dashboard');
  };
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button type="primary" className="width-100" onClick={() => handleSubmit()} style={{width: "180px"}}>
          {<LoginOutlined />} Login
        </Button>
      </div>
    );
}
