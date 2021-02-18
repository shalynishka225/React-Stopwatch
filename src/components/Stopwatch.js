import React, { useState, useRef } from "react";
import { Button, Col, Row } from "antd";
import {
  CaretRightOutlined,
  PauseOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import "./Stopwatch.css";

const Stopwatch = () => {
  const [timer, setTimer] = useState(3595);
  const [isActive, setIsActive] = useState(false);
  const increment = useRef(null);

  const handleStart = () => {
    if (!isActive) {
      setIsActive(true);
      increment.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    }
  };

  const handlePause = () => {
    clearInterval(increment.current);
    setIsActive(false);
  };

  const handleReset = () => {
    clearInterval(increment.current);
    setIsActive(false);
    setTimer(0);
  };

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  return (
    <Row>
      <Col span={12} offset={6}>
        <div className="stopwatch-body">
          <p>{formatTime()}</p>
          <Button
            onClick={() => {
              setTimeout(() => {
                handleStart();
              }, 300);
            }}
          >
            <CaretRightOutlined />
          </Button>
          <Button
            onDoubleClick={() => {
              setTimeout(() => {
                handlePause();
              }, 300);
            }}
          >
            <PauseOutlined />
          </Button>
          <Button
            onClick={() => {
              setTimeout(() => {
                handleReset();
              }, 300);
            }}
          >
            <RedoOutlined />
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default Stopwatch;
