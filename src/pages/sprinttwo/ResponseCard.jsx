import { Card, CardBody, Typography } from "@material-tailwind/react";

export default function ResponseCard({ data }) {
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
        <Typography>
          <p className="font-bold">{"User: "}</p>
          {
            data?.sprint_details?.filter((item) => item.category == "user")[0]
              ?.content
          }{" "}
        </Typography>

        <Typography>
          <p className="font-bold">{"Existing Process: "}</p>
          {
            data?.sprint_details?.filter(
              (item) => item.category == "existing_process"
            )[0]?.content
          }{" "}
        </Typography>

        <Typography>
          <p className="font-bold">{"Goals: "}</p>
          {
            data?.sprint_details?.filter((item) => item.category == "goals")[0]
              ?.content
          }{" "}
        </Typography>
      </CardBody>
    </Card>
  );
}
