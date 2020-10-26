import axios from 'axios';
const rootUrl = 'https://api.github.com';


export const checkRateLimit = ()=>{
    const url = `${rootUrl}/rate_limit`
    return axios.get(url)
}
export const getUser = (user)=>{
    return axios.get(`${rootUrl}/users/${user}`)
}
export const getRepos = (user)=>{
    return axios.get(`${rootUrl}/users/${user}/repos?per_page=100`)
}
export const getFollowers = (user)=>{
    return axios.get(`${rootUrl}/users/${user}/followers`)
}
