/* *TODO - List when create new CorusePage
    *copy template and rename it
      > App.js add <Route exact path="/courses/work_energy/CorusePage"  ><CorusePage/></Route>
      > Courses.js add <li ><Link to = "/courses/work_energy/CorusePage" className = "Course">CorusePage</Link></li>
   
    In Var Score
    1.Change TotalQuestionNum 
    2.Add ScoreQuestionX = useRef(0) to every question we have.
    In function handleUpvote
    3. Change --> work1 : firebase.firestore.FieldValue.increment(1) to Coruse_Name
    In function handleReport
    3.1 Change On: "Work1" <-- to Coruse_Name
    In function sumScore() 
    3.2 Change "Coruse_Name": CompletionScore.current 
    In function correct(QuestionPage) & function incorrect(QuestionPage)
    4. Add switch case
    In function checkAnswer(QuestionNumber)
    5. Add switch case

    6. add pageX function
      - Change  <button className = "PreviousPage" onClick ={() => setPage(X)}>
                <button className = "NextPage" onClick ={() => setPage(X)}>

    In Bottom Part
    7. Add  if (page === x) {return (<div><Pagex/></div>)}
            else if (page === x && Answer3 === false) {return(<div><Pagex/></div>)}
            else if (page === x && Answer3 === true) {return(<div><PagexAnswered/></div>)}
yay
*/
