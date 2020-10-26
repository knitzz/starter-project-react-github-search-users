import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import {GithubContext} from '../context/context';
const Search = ({setIsLoader}) => {
  let [isErr,setIsErr] = useState(true);
  let [errMsg,setErrMsg] = useState("error");
  let {requestCount} = useContext(GithubContext);
  let {extractUser} = useContext(GithubContext)
  let [user,setUser] = React.useState("")
  const handleSubmit = (e)=>{
    e.preventDefault()
    setIsLoader(true);
    extractUser(user).then(()=>{
      setIsLoader(false);
    })
    .catch((err)=>{
      setIsLoader(false);
      setIsErr(false);
      setErrMsg("Please check if the user Exists or Try after sometime");
      console.log("erroor yar")
    })
      
  }
  const OnInputChange = (e)=>{
      setUser(e.target.value);
   }
  return (
    <section className="section">
      <Wrapper className="section-center">
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <MdSearch></MdSearch>
            <input type="text" placeholder="type github user" onChange={OnInputChange}/>
            <button type="submit" disabled={!user}>Search<span>Please type something</span></button>
          </div>
        </form>
        <h3>request : {requestCount} / 60</h3>
        <article hidden={isErr}><p>{errMsg.toString()}</p></article>
      </Wrapper>
    </section>
  )
};

const Wrapper = styled.div`
  position: relative;
  display: grid;
  gap: 1rem 1.75rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr max-content;
    align-items: center;
    h3 {
      padding: 0 0.5rem;
    }
  }
  .form-control {
    background: var(--clr-white);
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    column-gap: 0.5rem;
    border-radius: 5px;
    padding: 0.5rem;
    input {
      border-color: transparent;
      outline-color: var(--clr-grey-10);
      letter-spacing: var(--spacing);
      color: var(--clr-grey-3);
      padding: 0.25rem 0.5rem;
    }
    input::placeholder {
      color: var(--clr-grey-3);
      text-transform: capitalize;
      letter-spacing: var(--spacing);
    }
    button {
      position:relative;
      border-radius: 5px;
      border-color: transparent;
      padding: 0.25rem 0.5rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      background: var(--clr-primary-5);
      color: var(--clr-white);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--clr-primary-8);
        color: var(--clr-primary-1);
        span{
          display:inline-block;
        }
      }
      span{
        display:none;
        position:absolute;
        left:-50px;
        top:20px;
        font-size:1rem;
        background:black;
        padding:5px;
        border-radius:5px;
      }
    }
    button:disabled{
      background: grey;
      color: var(--clr-white);
      cursor: not-allowed;
      
    }

    svg {
      color: var(--clr-grey-5);
    }
    input,
    button,
    svg {
      font-size: 1.3rem;
    }
    @media (max-width: 800px) {
      button,
      input,
      svg {
        font-size: 0.85rem;
      }
      button{
        span{
          font-size:0.75rem;
        }
      }
      
    }
  }
  h3 {
    margin-bottom: 0;
    color: var(--clr-grey-5);
    font-weight: 400;
  }
`;
const ErrorWrapper = styled.article`
  position: absolute;
  width: 90vw;
  top: 0;
  left: 0;
  transform: translateY(-100%);
  text-transform: capitalize;
  p {
    color: red;
    letter-spacing: var(--spacing);
  }
`;
export default Search;
