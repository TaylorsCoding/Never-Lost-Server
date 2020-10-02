import React, { Component } from "react";

import Post from "../Post/Post";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import ApiContext from "../../APIcontext";
import config from "../../config";

export default class TopicPage extends Component {
  state = {
    servErr: "",
    postVer: true,
  };
  static defaultProps = {
    history: {
      goBack: () => {},
    },
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;

  handleSubmit(e, topic_id) {
    e.preventDefault();

    if (e.target["content"].value.length === 0) {
      this.setState({ postVer: false });
      return;
    }

    const post = {
      content: e.target["content"].value,
      topic_id: parseInt(topic_id),
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
        this.props.history.push(`/topic/${topic_id}`);
      })
      .catch((error) => {
        this.setState({ servErr: error });
      });
  }

  render() {
    const {
      globalTopics = [],
      globalPosts = [],
      globalEvents = [],
    } = this.context;
    const { topic_id } = this.props.match.params;
    const topic = globalTopics.find((topic) => topic.id === parseInt(topic_id));
    const posts = globalPosts.filter(
      (post) => post.topic_id === parseInt(topic_id)
    );
    const event = globalEvents.find(
      (event) => parseInt(event.id) === topic.event_id
    );
    return (
      <div className="chat-content">
        <ErrorBoundary>
          <div>
            {this.state.servErr.length > 0 ? this.state.servErr : null}
            <h1>Topic: {topic ? topic.title : null}</h1>
            <p>
              {topic
                ? event
                  ? `Part of the ${event.title} event.`
                  : null
                : null}
            </p>
          </div>
          <div>
            <h2>Posts</h2>

            <ol>
              {posts.map((post) => (
                <li>
                  <Post
                    key={post.id}
                    content={post.content}
                    topic_id={post.topic_id}
                    date_published={post.date_published}
                  />
                </li>
              ))}
            </ol>
            <h3>Create New Post</h3>
            <form
              onSubmit={(e) =>
                this.handleSubmit(e, this.props.match.params.topic_id)
              }
            >
              <label>
                {this.state.postVer
                  ? null
                  : "You must add some text to the post."}
              </label>
              <input type="text" name="content" />
              <input type="submit" />
            </form>
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}
