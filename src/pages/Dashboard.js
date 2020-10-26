import React from 'react';
import { Info, Repos, User, Search, Navbar,Loader } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
const Dashboard = () => {
  const [isLoader,setIsLoader] = React.useState(false);

  return (
    <main>
   {/* <Navbar></Navbar> / */}
   <Search setIsLoader={setIsLoader}></Search> 
   {isLoader?(<Loader></Loader>): (<div><Info></Info> <User></User><Repos></Repos></div>)}
   </main>
  );
};

export default Dashboard;
