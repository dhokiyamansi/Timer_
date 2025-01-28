import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId); 
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    {/*return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;*/}
    return `${minutes }:${seconds }`;

  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg w-64 mx-auto mt-10">
      <h2 className="text-2xl text-white mb-6">Timer</h2>
      <div className="text-4xl font-bold text-white mb-6">
        {formatTime(time)}
      </div>
      <div className="flex space-x-4 mb-6">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-full"
          onClick={startTimer}
          disabled={isRunning}
        >
          Start
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-full"
          onClick={stopTimer}
          disabled={!isRunning}
        >
          Stop
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
      <button
        className="bg-yellow-500 text-white px-4 py-2 rounded-full mb-6"
        onClick={recordLap}
        disabled={!isRunning}
      >
        Lap
      </button>
      <div className="w-full text-white">
        <h3 className="text-xl mb-2">Laps</h3>
        <ul>
          {laps.map((lap, index) => (
            <li key={index} className="text-lg">
              Lap {index + 1}: {formatTime(lap)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Timer;
