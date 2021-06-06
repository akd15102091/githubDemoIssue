import React, {useEffect, useState} from "react";
import axios from "axios"
function GithubIssue(){
    const [data,setData] = useState({
        title:"",
        description:"",
        assignee:"",
    })

    const [assignees,setAssignee] = useState([])
    const [issues,setIssues] = useState([])

    const user='akd15102091';
    const repo='githubDemoIssue';
    //const list = [];
   
    useEffect(() => {
        axios
        .get(`https://api.github.com/repos/${user}/${repo}/assignees`)
        .then(res=>{
            //console.log(res.data)
            setAssignee(res.data)
        })
        .catch(err=>{
            console.log(err)
        })


        axios
        .get(`https://api.github.com/repos/${user}/${repo}/issues`)
        .then(res=>{
            var result=[] ;
            var iss = res.data ;
            for(let i=0;i<iss.length;i++){
                var obj = {
                    "title": iss[i]["title"],
                    "description":iss[i]["body"],
                }
                result.push(obj)
            }
            //console.log(result)
            setIssues(result)
        })
        .catch(err=>{
            console.log(err)
        })
        },[])
    //console.log("gfjgtf")

    
   
    const InputEvent = (event) => {
        const {name,value} = event.target ;

        setData((preval) => {
            return {
                ...preval,
                [name]:value,
            }
        })
    }
     const fetchdata = (e) =>{
        console.log(`Title is ${data.title}. Desc is ${data.description}. Assignee is ${data.assignee}.`)
        var temp ={"title":data.title, "body":data.description, "assignees":[data.assignee]} 
        // alert(`Title is ${data.title}. Desc is ${data.description}. Assignee is ${data.assignee}.`)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `token ${process.env.REACT_APP_TOKEN}` },
            body: JSON.stringify(temp)
        };
          fetch(`https://api.github.com/repos/${user}/${repo}/issues`, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
         
       
         console.log("hello")
        alert(`Title is ${data.title}. Desc is ${data.description}. Assignee is ${data.assignee}.`)
    
    }

    
    return (
        <React.Fragment>
        <h2>Lattice Friday Talks</h2>
        <div>
                  <div>
                        <form onSubmit={fetchdata} >
                        
                        <input type="text" name="title" placeholder="Title" onChange={InputEvent} required/>
                        <br/>
                        <br/>
                        <textarea name="description" placeholder="Type your Description" onChange={InputEvent} required></textarea>
                        <br/>
                        <br/>
                        <select className="form-input align-center" name="assignee" onChange={InputEvent} required="required">
                          <option value="none">--- Select An Assignee ---</option>
                          {
                              assignees.map(assign => (
                                <option value= {assign.login}>{assign.login}</option>
                              ))
                          }                       
                      </select>
                      <br/>
                      
                      <br/><br/>
                        
                        <button type="submit">Create An Issue</button>
                        
                      </form>
                      </div>

            
        <div>
            <br/><br/><br/><br/>
            <center>
                <h3>Issues List</h3>
                <table border="1" >
                        <tr>
                            <th>Issue Title</th>
                            <th>Issue Description</th>
                        </tr>

                        {
                            issues.map(issue => (
                            <tr>
                            <td>{issue.title}</td>
                            <td>{issue.description}</td>
                            </tr>
                            ))
                        }
                    </table>
              </center>
        </div>


         </div>
                      
        </React.Fragment>
    )
}
export default GithubIssue;