"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Alert,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";

export function DialogDefault() {
  const router = useRouter();
  const [keyword, setKeyword] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const handleSubmit = async () => {
    try {
      router.push(`/dashboard/${keyword}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Create new project
      </Button>
      <Dialog open={open} handler={handleOpen} size="lg">
        <div className="flex justify-center items-center flex-col">
          <Alert
            open={error}
            onClose={() => setError(false)}
            className="w-[500px] mt-7"
            animate={{
              mount: { y: 0 },
              unmount: { y: 100 },
            }}
          >
            something went wrong, try again.
          </Alert>
          <DialogHeader>Content Writer - New Query</DialogHeader>
          <DialogBody>
            <div className="flex justify-center items-center">
              <div>
                <Typography
                  variant="small"
                  color="gray"
                  className="mb-2 flex items-center gap-1 font-normal"
                >
                  I would like to rank/create content for
                </Typography>
                <Input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="car insurance"
                  className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[500px]" }}
                />
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="gradient"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="black" onClick={handleSubmit}>
              <span>{loading ? "please wait..." : "Confirm"}</span>
            </Button>
          </DialogFooter>
        </div>
      </Dialog>
    </>
  );
}
