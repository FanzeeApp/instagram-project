import { apiclient } from "../../config/api.config"

export default async  function gitHomePosts(page = 1 , limit = 10) {
    const res = await apiclient.get(`posts/home?page=${page}&limit=${limit}`)
    return res.data
};
