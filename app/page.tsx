"use client";
import React, { useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { DialogDefault } from "./components/dialog";
const Home = () => {
  const Scores = async () => {
    try {
      const res = await axios.get(
        "https://api.seocore.ai/scoring/content/137",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIwNDc2NTA5LCJpYXQiOjE3MjAwNDQ1MDksImp0aSI6IjkzOWI3ZWVkYmJjNjQ3OGRhNmY4YzE3Mzc4NGYwOTc1IiwidXNlcl9pZCI6MX0.FZjVwILZxGFO1bgrtVTCh1QLWhxu3pU6SbVwUvfmxl4",
          },
        }
      );

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
   // Scores();
  }, []);

  return (
    <>
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Your Projects
        </Typography>
      </div>

      <DialogDefault />
    </>
  );
};

export default Home;
