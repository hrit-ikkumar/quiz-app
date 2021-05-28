import { Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import firebase from "./firebase/firebase";

// Stylesheet
import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// Components
import Home from "./screens/Home/Home";
import OneTimeDashBoard from "./screens/OneTimeDashboard/OneTimeDashboard";
import CreateQuiz from "./screens/CreateQuiz/CreateQuiz";
import JoinQuiz from "./screens/JoinQuiz/JoinQuiz";
import UserDashboard from "./screens/UserDashboard/UserDashboard";
import CreatedSuccesfully from "./screens/CreatedSuccesfully/CreatedSuccesfully";
import NotFoundPage from "./screens/NotFoundPage";
import AttemptQuiz from "./screens/Attempted/AttemptQuiz";
import Appbar from "./components/Appbar/Appbar";
import Responses from "./screens/Response/Responses";

const App = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const createUserInDB = async () => {
      if (user.uid)
        if (
          firebase.auth().currentUser.metadata.lastSignInTime ===
          firebase.auth().currentUser.metadata.creationTime
        ) {
          try {
            await fetch("/API/users/create", {
              method: "POST",
              body: JSON.stringify({
                uid: user.uid,
                name: user.name,
                email: user.email,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            console.log("posted");
          } catch (error) {
            console.log("User Creation Error: ", error);
          }
        }
    };
    createUserInDB();
  }, [user]);

  return (
    <div className="App">
      {!firebase.auth().currentUser ? (
        <Home setUser={setUser} />
      ) : (
        <>
          <div>
            <Appbar user={user} setUser={setUser} />
          </div>
          <Switch>
            <Route exact path="/">
              <OneTimeDashBoard user={user} />
            </Route>
            <Route path="/dashboard">
              <UserDashboard user={user} />
            </Route>
            <Route path="/create-quiz">
              <CreateQuiz user={user} />
            </Route>
            <Route
              path="/created-succesfully/:quizCode"
              component={CreatedSuccesfully}
            />
            <Route path="/join-quiz">
              <JoinQuiz user={user} />
            </Route>
            <Route path="/attempt-quiz/:quizCode" component={AttemptQuiz} />
            <Route path="/responses/:quizCode" component={Responses} />
            <Route component={NotFoundPage} />
          </Switch>
        </>
      )}
    </div>
  );
};

export default App;
