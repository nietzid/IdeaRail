import {CheckCircleIcon, CheckIcon, XCircleIcon} from "@heroicons/react/24/outline";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button
} from "@material-tailwind/react";
import supabase from "../../Supabase";
import {useAuth} from "../../context/AuthProvider";
import {useEffect, useState} from "react";

export default function ResponseCard({data, votes}) {
    const {user} = useAuth();
    const [isLoading, setIsloading] = useState(true);

    function handleCheck(uuid) {
        return votes ?. some(item => uuid == item.uuid);
    }
    useEffect(() => {
        setIsloading(handleCheck(user.id));
    }, [votes])

    async function handleUpVote() {
        setIsloading(true);
        console.log(handleCheck(user.id));
        if (! handleCheck(user.id)) {
            await supabase.from('votes').insert([{
                    sprint_id: data.id,
                    uuid: user.id,
                    category: 1,
                    project_id: data.project_id
                },]).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    return (
        <Card className="m-4 ml-0 w-auto h-auto border-4 justify-between">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2 truncate font-bold">
                    {
                    data.creator
                } </Typography>
                <Typography> {
                    data.content
                } </Typography>
            </CardBody>
            <CardFooter className="pt-0 grid grid-cols-2 md:grid-cols-4 mx-auto">
                <Button 
                    disabled={
                        isLoading ? true : false
                    }
                    className={
                        `mr-2 mb-2 flex flex-row items-center justify-center ${
                            isLoading ? 'bg-blue-400' : 'bg-blue-600'
                        }`
                    }
                    onClick={
                        () => handleUpVote()
                }>
                    Spesific {
                    votes ?. length
                } </Button>
                <Button disabled={
                        isLoading ? true : false
                    }
                    className={
                        `mr-2 mb-2 flex flex-row items-center justify-center ${
                            isLoading ? 'bg-blue-400' : 'bg-blue-600'
                        }`
                    }
                    onClick={
                        () => handleUpVote()
                }>
                    Measurable {
                    votes ?. length
                } </Button>
                <Button disabled={
                        isLoading ? true : false
                    }
                    className={
                        `mr-2 mb-2 flex flex-row items-center justify-center ${
                            isLoading ? 'bg-blue-400' : 'bg-blue-600'
                        }`
                    }
                    onClick={
                        () => handleUpVote()
                }>
                    Timely <br />{
                    votes ?. length
                } </Button>
            </CardFooter>
        </Card>
    );
}   
