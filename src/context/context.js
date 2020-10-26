import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';
import { checkRateLimit, getRepos, getFollowers, getUser } from '../service/githubApi'
import Followers from '../components/Followers';
const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();


const GithubProvider = ({ children }) => {
    const [requestCount, setRequestCount] = useState(60);
    const [githubUser, setGithubUser] = useState();
    const [repos, setRepos] = useState();
    const [followers, setFollowers] = useState();


    const extractUser = (user) => {
        return checkRateLimit().then(({data}) => {
            const { remaining } = data.rate;
            if (remaining <= 3) 
                throw new Error("PLEASE TRY AFTER SOMETIME YOU HAVE EXCEDDED THE LIMIT")
            const userReq = getUser(user)
            const repoReq = getRepos(user);
            const followersReq = getFollowers(user);
            return axios.all([userReq, repoReq, followersReq])
        }).then(axios.spread((...responses)=>{
                console.log("here");
            const userInfo = responses[0]
            const repoInfo = responses[1]
            const followersInfo = responses[2]
            if (userInfo["message"] && userInfo["message"] == "NOT FOUND") 
                throw new Error("USER NOT FOUND")
            setGithubUser(userInfo.data);
            setRepos(repoInfo.data);
            setFollowers(followersInfo.data);
            }
            ))
    }


    useEffect(() => {
        checkRateLimit()
            .then(({ data }) => {
                const { remaining } = data.rate;
                return remaining;
            })
            .catch((err) => {
                console.log("error while fetching request count");
            })
    })

    return <GithubContext.Provider value={{ githubUser, followers, repos, requestCount, extractUser}}>{children}</GithubContext.Provider>
}

export { GithubContext, GithubProvider };