import React, { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const{repos} = useContext(GithubContext);
  if(!repos || repos.length==0)
    return <div></div>
  let languageMap = new Map()
  let starLanguageMap = new Map()
  let forkCountMap = new Map()
  repos.forEach(element => {
    const {name,forks_count} = element
    if(forks_count && name)
      forkCountMap.set(name,forks_count)
    const lang = element["language"]
    const star = element["stargazers_count"]
    if(lang){
      if(languageMap.get(lang)){
         languageMap.set(lang,languageMap.get(lang)+1)
         starLanguageMap.set(lang,starLanguageMap.get(lang)+(star?star:0))
      }
      else {
        languageMap.set(lang,1);
        starLanguageMap.set(lang,(starLanguageMap.get(lang)?starLanguageMap.get(lang):0)+(star?star:0))
      }
    }
    else{
      starLanguageMap.set("other",(starLanguageMap.get("other")?starLanguageMap.get("other"):0)+(star?star:0));
    }
  });
  [...languageMap].map(e =>{ return e[1];}).slice().sort(function(a, b) {
    return a - b; 
  });
  [...starLanguageMap].map(e =>{ return e[1];}).slice().sort(function(a, b) {
    return a - b; 
  });
  [...forkCountMap].map(e =>{ return e[1];}).slice().sort(function(a, b) {
    return a - b; 
  });
  const chartData = [];
  const dchartData = [];
  let bar3dChart= [];
  forkCountMap.forEach((value,key)=>{
    const obj = {
      label: key,
      value: value
    }
    bar3dChart.push(obj)
  })
  bar3dChart = bar3dChart.slice(0,5)
  let count=0;
  languageMap.forEach((value,key)=>{
    const obj = {
      label: key,
      value: value
    }
    count+=value
    chartData.push(obj)
  })
  starLanguageMap.forEach((value,key)=>{
    const obj = {
      label: key,
      value: value
    }
    count+=value
    dchartData.push(obj)
  })

  if(count<repos.length)
    chartData.push({label:"other",value:repos.length-count})
  
  return (
    <section className='section'>
      <Wrapper className='section-center'>
      <Pie3D chartData={chartData}/>
      <Column3D chartData={dchartData}></Column3D>
      <Doughnut2D chartData={dchartData}/>
      <Bar3D chartData={bar3dChart}></Bar3D>
      <div></div>
      </Wrapper>
    </section>
  )
  
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
