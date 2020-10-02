import React, { Component } from "react";
import { Route } from "react-router-dom";

import Title from "../Title/Title";
import TopNavbar from "../TopNavbar/TopNavbar";
import Home from "../Home/Home";
import Animals from "../Animals/Animals";
import Events from "../Events/Events";
import Chat from "../Chat/Chat";
import Organizations from "../Organizations/Organizations";
import AddEvent from "../AddEvent/AddEvent";
import EventPage from "../EventPage/EventPage";
import AddAnimal from "../AddAnimal/AddAnimal";
import AddTopic from "../AddTopic/AddTopic";
import AddOrganization from "../AddOrganization/AddOrganization";
import TopicPage from "../TopicPage/TopicPage";
import AnimalPage from "../AnimalPage/AnimalPage";
import OrganizationPage from "../OrganizationPage/OrganizationPage";

import config from "../../config";
import APIcontext from "../../APIcontext";

class App extends Component {
  // Create context/state variables that will serve the entire app.

  // The difference between local and global is:
  // global is all data
  // local is data in the zip code or +- 500 of the zip code
  state = {
    servErr: "",
    localArea: "45000",
    localEvents: [],
    localAnimals: [],
    localTopics: [],
    localPosts: [],
    localPictures: [],
    localOrganizations: [],
    globalEvents: [],
    globalAnimals: [],
    globalTopics: [],
    globalPosts: [],
    globalPictures: [],
    globalOrganizations: [],
    verification: false,
  };

  // Get area first, if they have entered it on the page before
  // it has been saved as a cookie. Otherwise,

  // Get local events, animals, users,

  componentDidMount() {
    if (localStorage.getItem("local_zip")) {
      this.setState({
        localArea: localStorage.getItem("local_zip"),
      });
      this.fetchData(localStorage.getItem("local_zip"));
    }

    Promise.all([
      fetch(`${config.API_ENDPOINT}/topics`),
      fetch(`${config.API_ENDPOINT}/animals`),
      fetch(`${config.API_ENDPOINT}/events`),
      fetch(`${config.API_ENDPOINT}/organizations`),
      fetch(`${config.API_ENDPOINT}/posts`),
    ])
      .then(([topicsRes, animalsRes, eventsRes, orgsRes, postRes]) => {
        if (!topicsRes.ok)
          return topicsRes.json().then((e) => Promise.reject(e));
        if (!animalsRes.ok)
          return animalsRes.json().then((e) => Promise.reject(e));
        if (!eventsRes.ok)
          return eventsRes.json().then((e) => Promise.reject(e));
        if (!orgsRes.ok) return orgsRes.json().then((e) => Promise.reject(e));
        if (!postRes.ok) return postRes.json().then((e) => Promise.reject(e));

        return Promise.all([
          topicsRes.json(),
          animalsRes.json(),
          eventsRes.json(),
          orgsRes.json(),
          postRes.json(),
        ]);
      })
      .then(
        ([
          globalTopics,
          globalAnimals,
          globalEvents,
          globalOrganizations,
          globalPosts,
        ]) => {
          this.setState({
            globalTopics,
            globalAnimals,
            globalEvents,
            globalOrganizations,
            globalPosts,
          });
        }
      )
      .catch((error) => {
        this.setState({ servErr: `${this.state.servErr}\n Error:\n${error}` });
      });
  }

  componentDidUpdate() {
    if (this.state.localArea && !this.state.verification) {
      if (this.state.localArea.length === 5) {
        this.fetchData(this.state.localArea);
        this.setState({ verification: true });
      }
    }
  }

  /**
   * @function fetchData used to get local data
   * @param {string || number} zip is to find data close to or in input zip
   */

  fetchData = (zip) => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/topics/zip/${zip}`),
      fetch(`${config.API_ENDPOINT}/animals/zip/${zip}`),
      fetch(`${config.API_ENDPOINT}/events/zip/${zip}`),
      fetch(`${config.API_ENDPOINT}/organizations/zip/${zip}`),
      fetch(`${config.API_ENDPOINT}/posts`),
    ])
      .then(([topicsRes, animalsRes, eventsRes, orgsRes, postsRes]) => {
        if (!topicsRes.ok)
          return topicsRes.json().then((e) => Promise.reject(e));
        if (!animalsRes.ok)
          return animalsRes.json().then((e) => Promise.reject(e));
        if (!eventsRes.ok)
          return eventsRes.json().then((e) => Promise.reject(e));
        if (!orgsRes.ok) return orgsRes.json().then((e) => Promise.reject(e));
        if (!postsRes.ok) return postsRes.json().then((e) => Promise.reject(e));

        return Promise.all([
          topicsRes.json(),
          animalsRes.json(),
          eventsRes.json(),
          orgsRes.json(),
          postsRes.json(),
        ]);
      })
      .then(
        ([
          localTopics,
          localAnimals,
          localEvents,
          localOrganizations,
          localPosts,
        ]) => {
          this.setState({
            localTopics,
            localAnimals,
            localEvents,
            localOrganizations,
            localPosts,
          });
        }
      )
      .catch((error) => {
        this.setState({ servErr: `${this.state.servErr}\n Error:\n${error}` });
      });
  };

  /**
   * All handle functions to update app state.
   */

  handleAddAnimal = (animal) => {
    this.setState({ globalAnimals: [...this.state.globalAnimals, animal] });
  };

  handleAddEvent = (event) => {
    this.setState({ globalEvents: [...this.state.globalEvents, event] });
  };

  handleAddTopic = (topic) => {
    this.setState({ globalTopics: [...this.state.globalTopics, topic] });
  };

  handleAddPost = (post) => {
    this.setState({ globalPosts: [...this.state.globalPosts, post] });
  };

  handleAddOrganization = (organization) => {
    this.setState({
      globalOrganizations: [...this.state.globalOrganizations, organization],
    });
  };

  handleAddPicture = (picture) => {
    this.setState({ globalPictures: [...this.state.globalPictures, picture] });
  };

  handleDeleteUser = (userid) => {
    this.setState({
      globalUsers: this.state.globalUsers.filter((user) => user.id !== userid),
    });
  };

  handleDeleteAnimal = (animalid) => {
    this.setState({
      globalAnimals: this.state.globalAnimals.filter(
        (animal) => animal.id !== animalid
      ),
    });
  };

  handleDeleteEvent = (eventid) => {
    this.setState({
      globalEvents: this.state.globalEvents.filter(
        (event) => event.id !== eventid
      ),
    });
  };

  handleDeleteTopic = (topicid) => {
    this.setState({
      globalTopics: this.state.globalTopics.filter(
        (topic) => topic.id !== topicid
      ),
    });
  };

  handleDeletePost = (postid) => {
    this.setState({
      globalPosts: this.state.globalPosts.filter((post) => post.id !== postid),
    });
  };

  handleDeleteOrganization = (orgid) => {
    this.setState({
      globalOrganizations: this.state.globalOrganizations.filter(
        (org) => org.id !== orgid
      ),
    });
  };

  handleDeletePicture = (pictureid) => {
    this.setState({
      globalPictures: this.state.globalPictures.filter(
        (picture) => picture.id !== pictureid
      ),
    });
  };

  handleSetglobalArea = (val) => {
    this.setState({
      globalArea: val,
    });
  };

  // All routes to enable navigation

  renderRoutes() {
    return (
      <>
        <Route exact path="/" component={Home} />
        <Route exact path="/animals" component={Animals} />
        <Route path="/events" component={Events} />
        <Route path="/chat" component={Chat} />
        <Route exact path="/organizations" component={Organizations} />
        <Route path="/create-event" component={AddEvent} />
        <Route path="/event/:event_id" component={EventPage} />
        <Route path="/create-animal" component={AddAnimal} />
        <Route path="/create-topic" component={AddTopic} />
        <Route path="/create-organization" component={AddOrganization} />
        <Route path="/topic/:topic_id" component={TopicPage} />
        <Route exact path="/animals/:animal_id" component={AnimalPage} />
        <Route
          exact
          path="/organizations/:org_id"
          component={OrganizationPage}
        />
      </>
    );
  }

  /**  @param value used to make contained data provided through APIcontext.Provider component*/

  render() {
    const value = {
      localArea: this.state.localArea,
      localEvents: this.state.localEvents,
      localAnimals: this.state.localAnimals,
      localTopics: this.state.localTopics,
      localPosts: this.state.localPosts,
      localPictures: this.state.localPictures,
      localOrganizations: this.state.localOrganizations,
      globalEvents: this.state.globalEvents,
      globalAnimals: this.state.globalAnimals,
      globalTopics: this.state.globalTopics,
      globalPosts: this.state.globalPosts,
      globalPictures: this.state.globalPictures,
      globalOrganizations: this.state.globalOrganizations,
      setLocalArea: this.handleSetLocalArea,
      addEvent: this.handleAddEvent,
      addTopic: this.handleAddTopic,
      addAnimal: this.handleAddAnimal,
      addPost: this.handleAddPost,
      addOrganization: this.handleAddOrganization,
      addPicture: this.handleAddPicture,
      deleteEvent: this.handleDeleteEvent,
      deleteTopic: this.handleDeleteTopic,
      deleteAnimal: this.handleDeleteAnimal,
      deletePost: this.handleDeletePost,
      deleteOrganizaton: this.handleDeleteOrganization,
      deletePicture: this.handleDeletePicture,
    };

    // Title and TopNavbar components display on every page.

    return (
      <APIcontext.Provider value={value}>
        <div className="App">
          <Title />
          <TopNavbar />
          {this.state.servErr.length > 0 ? this.state.servErr : null}
          <main>{this.renderRoutes()}</main>
        </div>
      </APIcontext.Provider>
    );
  }
}

export default App;
