import '../CSS/roadmap.css';
import axios from '../axios';
import React, { createElement,useState, useEffect } from 'react';
import { async } from 'regenerator-runtime';

function Roadmap() {
    var coursesOfferInSpring= [];
    var coursesOfferInSummer= [];
    var coursesOfferInFall= [];
    var coursesOfferInWinter= [];
    var countYear=1;

    const [matrix, setMatrix] = useState([]);
    // const [courseAlreadyTaken, setCourseAlreadyTaken] = useState([]);
    var courseAlreadyTaken=["CSCI 40","CSCI 41","CSCI 60","MATH 75","MATH 75A"];
    useEffect(() => {

        async function getUserInfoWrapper() {
            createYear();
            window.sample=document.getElementsByClassName("year1")[0].cloneNode(true);
            viewCourse();
            //updates user state with user object from backend, matched by stored cookie id
            
        }

        getUserInfoWrapper();
        
    }, []);

    function createYear(){
        let dateDropdown = document.getElementById('year-dropdown'); 
        let currentYear = new Date().getFullYear();    
        let earliestYear = 2014;     
        while (currentYear >= earliestYear) {      
            let dateOption = document.createElement('option');          
            dateOption.text = currentYear;      
            dateOption.value = currentYear;        
            dateDropdown.add(dateOption);      
            currentYear -= 1;    
        }
    }
    function addYear(){
        console.log(window.sample)
        countYear++;
        let table =  document.getElementById("table");
        var newSample=window.sample.cloneNode(true);
        newSample.id="year"+countYear.toString();
        table.appendChild(newSample);
    }

    var display=document.getElementById("display");
    const filter= async(e)=>{
        
    }
    const viewCourse= async(e)=>{
        const req = await axios.get('/course')
                .then((res) => {
                    console.log(res);
                    for(let i of res.data.courses){
                        if(i.Prerequisites.length!=0)
                        {
                            OR=[];
                            console.log("has prerequesite",i.Prerequisites);
                            for (var element of i.Prerequisites)
                            {
                                if (element.includes(" (may be taken concurrently)")){
                                    element=element.replace(" (may be taken concurrently)","");
                                }
                                else if(element.includes("Permission from instructor OR"))
                                {
                                    break;
                                }
                                console.log(courseAlreadyTaken)
                                if((courseAlreadyTaken.filter((item) => item == element)[0]))
                                {
                                    console.log("Meet the requirement for "+i.classNameAb + " with " + element);
                                }
                                else if(element.includes("OR"))
                                {
                                    element=element.replace(" OR","");
                                    OR.push(element);
                                    console.log(element)
                                }
                                else{
                                    meetRequirement = false;
                                    console.log("Doesn't the requirement for "+i.classNameAb + " with " + element);
                                }
                            }
                            if(OR!=[] && meetRequirement==true && !element.includes("Permission from instructor OR"))
                            {
                                console.log(OR);
                                for (const element of OR)
                                {
                                    console.log(typeof(element))
                                    var courseMeetORRequirement=courseAlreadyTaken.filter((item) => item == element);
                                    console.log(courseMeetORRequirement)
                                    if(courseMeetORRequirement)
                                    {
                                        
                                        console.log("Meet the requirement for "+i.classNameAb + " with ",courseMeetORRequirement);
                                        meetRequirement = true;
                                        break;
                                    }
                                    meetRequirement = false;
                                    console.log("Doesn't meet the requirement for "+i.classNameAb + " because of ",element);

                                }
                            }
                            }
                        if(meetRequirement==true)
                        {
                            console.log(i,"Meet all requirement");
                            coursesOfferInSpring.push(i);
                            const springTerm = document.getElementsByClassName('course-dropdown');
                            Array.prototype.forEach.call (springTerm, function (node) {
                                let fallOptions = document.createElement("option");
                                fallOptions.text = i.classNameAb;
                                fallOptions.value = i.classNameAb;
                                node.appendChild(fallOptions);
                            } );
                        }
                        else
                        {
                            console.log(i,"Doesn't Meet all requirement");
                        }
                        
                            // coursesOfferInSpring.push(i);
                            // const springTerm = document.getElementsByClassName('course-dropdown');
                            // Array.prototype.forEach.call (springTerm, function (node) {
                            //     let fallOptions = document.createElement("option");
                            //     fallOptions.text = i.classNameAb;
                            //     fallOptions.value = i.classNameAb;
                            //     node.appendChild(fallOptions);
                            // } );
                            // coursesOfferInFall.push(i);
                            // const fallTerm = document.querySelectorAll('[id=fall-dropdown]');
                            // Array.prototype.forEach.call (fallTerm, function (node) {
                            //     let fallOptions = document.createElement("option");
                            //     fallOptions.text = i.classNameAb;
                            //     fallOptions.value = i.classNameAb;
                            //     node.appendChild(fallOptions);
                            // } );
                    }
                    
                })
                .catch((error) => {
                    console.log(error);
                })
    }
    // const filterSpring = async (e) => {
    //     //sending to server
    //     const req = await axios.post('/course/searchWithTermFilter', {"TermTypicallyOffered": "Spring"})
    //         .then((res) => {
    //             for(let i of res.data.courses){
    //                 coursesOfferInSpring.push(i);
    //                 const springTerm = document.getElementsByClassName('spring-dropdown');
    //                 Array.prototype.forEach.call (springTerm, function (node) {
    //                     let fallOptions = document.createElement("option");
    //                     fallOptions.text = i.classNameAb;
    //                     fallOptions.value = i.classNameAb;
    //                     node.appendChild(fallOptions);
    //                 } );
    //             }
    //             console.log("spring")
    //         }).catch((error) => {
    //             alert(error);
    //         });    
    // }    

    // const filterFall = async (e) => {
    //     //sending to server
    //     const req = await axios.post('/course/searchWithTermFilter', {"TermTypicallyOffered": "Fall"})
    //         .then((res) => {
    //             for(let i of res.data.courses){
    //                 coursesOfferInFall.push(i);
    //                 const fallTerm = document.querySelectorAll('[id=fall-dropdown]');
    //                 Array.prototype.forEach.call (fallTerm, function (node) {
    //                     let fallOptions = document.createElement("option");
    //                     fallOptions.text = i.classNameAb;
    //                     fallOptions.value = i.classNameAb;
    //                     node.appendChild(fallOptions);
    //                 } );
    //             }
    //             console.log("fall")
    //         }).catch((error) => {
    //             alert(error);
    //         });    
    // }

    document.getElementsByClassName("year-dropdown").onChange= function(e){
        console.log(e.target.value);
    }
    const getYear = async (e) =>{
        var td =document.getElementById(e.target.id).parentNode;
        td.innerHTML=e.target.value;
        var tr=td.parentNode;
        console.log(tr)
        tr.parentNode.id =e.target.value; //tbody's id
        var newYear=[];
        newYear.push(e.target.value);
        setMatrix(newYear);
        console.log(newYear);
        console.log(matrix);
    }
    const addCourse = async (e) =>{
        console.log(e.target.value);
    }
    
    var meetRequirement=true;
    var OR=[];

    const finalize = async (e) =>{
        console.log(e.target.parentNode.parentNode.parentNode);
        if(e.target.parentNode.parentNode.parentNode.id==""){
            alert("Please choose an academic year first");
        }
        else{
            //sending to server
            const req = await axios.post('/course/search', {"specific":e.target.value.toString()})
            .then((res) => {
                //data of the course will be res.data.courses[0]
                console.log(res.data.courses[0].Units);
                e.target.parentNode.nextElementSibling.innerHTML=res.data.courses[0].Units.toString();
                e.target.parentNode.innerHTML=e.target.value;
                // setCourseAlreadyTaken([res.data.courses[0]]);
                viewCourse();
            }).catch((error) => {
                console.log(error);
            });
        }
        // if(e.target.parentNode)
    }
    function refresh(){
        window.location.reload();
    }
    
    function print(){
        window.print();
    }
  return (
    <div className="Roadmap">
        <table id="table">
            <thead>
                <tr id='thead'>
                    <th className="year">Year</th>
                    <th className="spring" colSpan="2">Spring</th>
                    <th className="summer" colSpan="2">Summer</th>
                    <th className="fall" colSpan="2">Fall</th>
                    <th className="winter" colSpan="2">Winter</th>
                    <th className="comment">Comment</th>
                </tr>
            </thead>
            <tbody className="year1">
                <tr>
                    <td rowSpan="5" className="year"><select className='year-dropdown' id='year-dropdown' onChange={getYear}></select></td>
                    <td className="spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="comment"></td>
                </tr>
                <tr>
                    <td className="spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="comment"></td>
                </tr>
                <tr>
                    <td className="spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="comment"></td>
                </tr>
                <tr>
                    <td className="spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="comment"></td>
                </tr>
                <tr>
                    <td className="spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="spring"><select className='course-dropdown' onChange={finalize}></select></td>
                    <td className="Units"></td>
                    <td className="comment"></td>
                </tr>
            </tbody>
            
        </table>
        <button onClick={addYear}>Add year</button>
        <button onClick={print}>Print</button>
        <button onClick={refresh}>clear</button>
        <p id="display"> </p>
    </div>

  );
}

export default Roadmap;
