import React, { useState, useRef } from "react";
import { Button, Col, Row } from "antd";
import {
  CaretRightOutlined,
  PauseOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { debounce } from "lodash";
import "./Stopwatch.css";

const Stopwatch = () => {
  const [timer, setTimer] = useState(3595);
  const [isActive, setIsActive] = useState(false);
  const increment = useRef(null);

  const handleStart = debounce(() => {
    if (!isActive) {
      setIsActive(true);
      increment.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    }
  }, 300);

  const handlePause = debounce(() => {
    clearInterval(increment.current);
    setIsActive(false);
  }, 300);

  const handleReset = debounce(() => {
    clearInterval(increment.current);
    setIsActive(false);
    setTimer(0);
  }, 300);

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
          <Button onClick={handleStart}>
            <CaretRightOutlined />
          </Button>
          <Button onDoubleClick={handlePause}>
            <PauseOutlined />
          </Button>
          <Button onClick={handleReset}>
            <RedoOutlined />
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default Stopwatch;
