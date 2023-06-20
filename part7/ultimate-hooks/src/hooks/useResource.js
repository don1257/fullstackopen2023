import {useEffect, useState} from "react";
import {createNewResource, getAllResources} from "../services/request";

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    const create = (resource) => {
        createNewResource(baseUrl,resource)
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllResources(baseUrl);
            setResources(data);
        };

        fetchData();
    }, [baseUrl]);


    const service = {
        create
    }

    return [
        resources, service
    ]
}
