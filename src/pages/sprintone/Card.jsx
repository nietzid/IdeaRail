import { CheckCircleIcon, CheckIcon, XCircleIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
   
  export default function ResponseCard() {
    return (
      <Card className="m-4 ml-0 min-w-[320px] max-w-[320px] border-4">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2 font-bold">
            Arfiansyah Sucitra
          </Typography>
          <Typography>
            The place is close to Barceloneta Beach and bus stop just 2 min by
            walk and near to &quot;Naviglio&quot; where you can enjoy the main
            night life in Barcelona.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 flex flex-row">
          <Button className="mr-2 flex flex-row">
            <CheckCircleIcon className="h-6 w-6 font-bold mr-1" />
            0
          </Button>
          <Button className="flex flex-row">
            <XCircleIcon className="h-6 w-6 font-bold mr-1" />
            0
          </Button>
        </CardFooter>
      </Card>
    );
  }