import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import supabase from "../../Supabase";
import { useAuth } from "../../context/AuthProvider";
import { useEffect, useState } from "react";

export default function ResponseCard({ data }) {
  const { user } = useAuth();
  const [isLoading, setIsloading] = useState(true);
  return (
    <Card className="w-auto min-h-full border-4 justify-between">
      <CardBody>
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2 truncate font-bold"
        >
          {data?.creator}{" "}
        </Typography>
        <Typography className="font-bold" style={{ textTransform: "capitalize" }}>
          {
            data?.sprint_details?.filter(
              (item) => item.category == "pain" || "gain"
            )[0]?.category
          }:
        </Typography>
        <Typography>
          {
            data?.sprint_details?.filter(
              (item) => item.category == "pain" || "gain"
            )[0]?.content
          }{" "}
        </Typography>
      </CardBody>
    </Card>
  );
}
