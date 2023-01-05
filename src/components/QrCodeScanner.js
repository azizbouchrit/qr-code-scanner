import { BarcodeFormat, BrowserMultiFormatReader, DecodeHintType } from "@zxing/library";
import React, { useEffect, useMemo, useRef, useState } from "react";

const QrCodeScanner = () => {
  // const [selectedDeviceId, setSelectedDeviceId] = useState("");
  // const [videoInputDevices, setVideoInputDevices] = useState([]);
  const [code, setCode] = useState("");
  const ref = useRef(null);

  const reader = useMemo(() => {
    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE]);

    const instance = new BrowserMultiFormatReader();
    instance.timeBetweenDecodingAttempts = 500
    instance.hints = hints
    return instance;
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    reader.decodeFromConstraints(
      {
        audio: false,
        video: {
          facingMode: "environment",
        },
      },
      ref.current,
      (result, error) => {
        if (result) {
          setCode(result.text);
          console.log(result);
        }
        if (error) {
          console.log(error);
        }
      }
    );
    return () => {
      reader.reset();
    };
  }, [ref, reader]);

  const resetReader = () => {
    reader.reset();
  };

  return (
    <div>
      <video ref={ref} />
      <h3>Scanned text:</h3>
      <h2>{code}</h2>
      <button onClick={resetReader}>reset</button>
    </div>
  );
};

export default QrCodeScanner;
