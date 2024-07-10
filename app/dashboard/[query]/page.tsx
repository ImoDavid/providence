"use client";
import React, { useEffect } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Checkbox,
  Spinner,
} from "@material-tailwind/react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const projects = () => {
  const searchParams = useParams();
  const router = useRouter();
  const [content, setContent] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { query } = searchParams;
  const Scores = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://api.seocore.ai/scoring/scoring/",
        { query: decodeURIComponent(query).trim() },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIwNDc2NTA5LCJpYXQiOjE3MjAwNDQ1MDksImp0aSI6IjkzOWI3ZWVkYmJjNjQ3OGRhNmY4YzE3Mzc4NGYwOTc1IiwidXNlcl9pZCI6MX0.FZjVwILZxGFO1bgrtVTCh1QLWhxu3pU6SbVwUvfmxl4",
          },
        }
      );

      setContent(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      router.push("/");
    }
  };

  useEffect(() => {
    Scores();
    return () => {};
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          {" "}
          <Spinner className="h-12 w-12" />
        </div>
      ) : (
        <TransactionsTable data={content} router={router} keyword={query} />
      )}
    </>
  );
};
export default projects;

const TABLE_HEAD = [
  "select",
  "google rank",
  "content score",
  "length(words)",
  "page title",
  "url",
];

function TransactionsTable({ data, router, keyword }) {
  const lastObject = data[data.length - 1]?.user_score_id;
  return (
    <Card className="h-full w-full mt-10">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Select Competitors
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Select competitors to use as reference for creating guidelines
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <Button
              onClick={() => router.push(`/dashboard/${keyword}/${lastObject}`)}
              className="flex items-center gap-3"
              size="sm"
            >
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Next
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70 capitalize"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    <Checkbox color="blue" defaultChecked />
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {index + 1}
                  </Typography>
                </td>
                <td className="p-4">
                  <Chip
                    color={
                      item?.score?.["Overall Score"] > 70
                        ? "green"
                        : item?.score?.["Overall Score"] <= 70 &&
                          item?.score?.["Overall Score"] >= 40
                        ? "yellow"
                        : "red"
                    }
                    value={item?.score?.["Overall Score"] || 0}
                    className="w-8 flex justify-center"
                  />
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item?.score?.Meta_Description?.Length}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item?.website_info?.title}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item?.url
                      ? `${item.url.substring(0, 20)}${
                          item.url.length > 20 ? "..." : ""
                        }`
                      : "N/A"}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm">
            1
          </IconButton>
          <IconButton variant="text" size="sm">
            2
          </IconButton>
          <IconButton variant="text" size="sm">
            3
          </IconButton>
          <IconButton variant="text" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" size="sm">
            8
          </IconButton>
          <IconButton variant="text" size="sm">
            9
          </IconButton>
          <IconButton variant="text" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
