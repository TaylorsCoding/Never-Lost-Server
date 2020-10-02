import React, { Component } from "react";
import "./EventPage.css";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import ApiContext from "../../APIcontext";
import Post from "../Post/Post";
import config from "../../config";

/**
 * Documentation
 *
 * Serves to display all information about individual event on its own page.
 * Allows for the creation of posts.
 *
 * @class EventPage
 *
 * @param state.postVer indicates if a message has been included in the post.
 *
 * @param defaultProps.match.params contains @param event_id to get the event to display on the page
 *
 *
 * @function handleSubmit posts data to server to create a Post.
 */

export default class EventPage extends Component {
  state = {
    servErr: "",
    postVer: true,
  };
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;

  handleSubmit(e, event_id) {
    e.preventDefault();

    if (e.target["content"].value.length === 0) {
      this.setState({ postVer: false });
      return;
    }

    const post = {
      content: e.target["content"].value,
      event_id: parseInt(event_id),
    };

    fetch(`${config.API_ENDPOINT}/posts`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((e) => Promise.reject(e));
        }
        return response.json();
      })
      .then((post) => {
        this.context.addPost(post);
        this.props.history.push(`/event/${event_id}`);
        window.location.reload(false);
      })
      .catch((error) => {
        this.setState({ servErr: error });
      });
  }
  /**
   * @param globalEvents holds all events
   * @param globalPosts holds all posts
   * @param globalOrganizations holds all organizations
   * @param globalAnimals holds all animals
   *
   * @param event_id is the id of the event displayed on this page
   * @param event is the event displayed on this page
   * @param posts are all the posts made on this event
   * @param org is the associated organization, if there is one
   * @param animal is the associated animal, if there is one
   *
   *
   * The event information is displayed, the associated animal and organization
   * displayed conditionally based on whether they exist or not. Then the posts
   * on this event are displayed, as well as a form to create a new post.
   */
  render() {
    const {
      globalEvents = [],
      globalPosts = [],
      globalOrganizations = [],
      globalAnimals = [],
    } = this.context;
    const { event_id } = this.props.match.params;
    const event = globalEvents.find((event) => event.id === parseInt(event_id));
    const posts = globalPosts.filter(
      (post) => post.event_id === parseInt(event_id)
    );
    const org = globalOrganizations.find(
      (org) => org.id === parseInt(event.org_id)
    );
    const animal = globalAnimals.find(
      (animal) => animal.id === parseInt(event.animal_id)
    );
    return (
      <ErrorBoundary>
        <div className="event-content">
          {this.state.servErr.length > 0 ? this.state.servErr : null}
          <div>
            <h1>Event: {event ? event.title : null}</h1>
            <p>{org ? `Has to do with the ${org.name} organization.` : null}</p>
            <p>
              {animal
                ? `Has to do with ${animal.name}, the ${animal.breed} ${animal.species}.`
                : null}
            </p>
            <p>Type: {event ? event.type : null}</p>
            {event ? (
              <>
                <p>Description</p>
                <p className="description">
                  {event ? event.description : null}
                </p>
              </>
            ) : null}

            <p>Date Published: {event ? event.date_published : null}</p>
          </div>
          <div className="posts">
            <h2>Posts</h2>
            {posts.map((post) => (
              <Post
                className="ind-post"
                key={post.id}
                content={post.content}
                event_id={post.event_id}
                date_published={post.date_published}
              />
            ))}
          </div>
          <div>
            <form
              className="post-form"
              onSubmit={(e) =>
                this.handleSubmit(e, this.props.match.params.event_id)
              }
            >
              <div>
                <label htmlFor="event-page-post-content">New Post</label>
              </div>
              <div>
                <label>
                  {this.state.postVer ? null : "You must enter some text."}
                </label>
                <textarea name="content" id="event-page-post-content" />
              </div>
              <div>
                <input type="submit" />
              </div>
            </form>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}
