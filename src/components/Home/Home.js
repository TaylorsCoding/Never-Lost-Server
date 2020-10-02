import React, { Component } from "react";
import "./Home.css";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import ApiContext from "../../APIcontext";

/**
 * Documentation
 * @class Homepage
 *
 * @param contextType references the data in ApiContext
 *
 * @function handleSubmit handles the submission of a zip code
 */

export default class Homepage extends Component {
  state = {
    zcVerProper: false,
    zcVerNonQuotes: false,
  };

  static contextType = ApiContext;

  handleSubmit(e) {
    e.preventDefault();

    // Using this regex to check for valid zip codes.
    const regex = RegExp("^[0-9]{5}(?:-[0-9]{4})?$");
    if (!regex.test(e.target["zip_code"].value)) {
      this.setState({ zcVerProper: true });
      if (
        e.target["zip_code"].value[0] === '"' ||
        e.target["zip_code"].value[e.target["zip_code"].value.length - 1] ===
          '"'
      ) {
        this.setState({ zcVerNonQuotes: true });
      }
      return;
    } else {
      this.setState({ zcVerProper: false });
      this.setState({ zcVerNonQuotes: false });
    }

    localStorage.setItem("local_zip", e.target["zip_code"].value);
    this.context.setLocalArea(localStorage.getItem("local_zip"));
  }
  render() {
    const localArea = localStorage.getItem("local_zip");
    return (
      <div className="main-content">
        <ErrorBoundary>
          <header>
            <h1>Welcome!</h1>
          </header>

          <main className="non-mobile">
            <div className="cols1">
              <article>
                <h2>Mission Statement</h2>
                <p className="light-text">
                  At Never Lost, we make sure that every animal that is lost,
                  doesn't have a home, or is suffering in some other way has
                  more of a chance at life than ever. We are doing this by
                  connecting people and animals with resources and homes. Our
                  mission is to connect technology with available resources to
                  ensure that every animal encountered has a better chance of
                  being taken care of, returned home, fostered, or adopted, but
                  most importantly, given a brighter future.
                </p>
                <p className="light-text">
                  To begin this pursuit, we have created a forum where people
                  can let their community know what they want to say about
                  animals. For instance, if you lose your pet or find a lost
                  animal, you can follow these steps:
                </p>
                <ul>
                  <li className="light-text">
                    Describe the animal in the Animal section
                  </li>
                  <li>
                    Create an event about that animal describing its situation.
                  </li>
                  <li className="light-text">
                    To expand on this event, you can create topics about this
                    event, and anyone can post their thoughts on both your event
                    and the topics related to the event.
                  </li>
                  <li className="light-text">
                    Other people can create topics on your event as well, which
                    means they'll know what to do when they find your pet to get
                    your attention.
                  </li>
                </ul>
                <p className="light-text">
                  The forum doesn't have to only be about such serious matters,
                  though. You can find all sorts of things to do with pets on
                  the events section. People will announce meetups, pet shows,
                  walks, and much more that you can talk about and post on! If
                  you own an organization, you can add it too! The more
                  organizations we can present on this, the better.
                </p>
              </article>
            </div>
            <div className="cols2">
              <section>
                <div>
                  <h2>Enter your zip-code!</h2>
                  {this.state.zcVerProper ? (
                    <p>
                      You must enter a registered zip code belonging to the
                      United states of America.
                    </p>
                  ) : null}
                  {this.state.zcVerNonQuotes ? (
                    <p>
                      Enter the zip-code without anything else attatched to it.
                      <br />
                      For example, 22030 is a correct input of a zip code, not
                      "22030".
                    </p>
                  ) : null}
                  <p className="light-text slim">
                    Entering a zip-code will help you find
                    <br />
                    Animals, Events, Chats, and Organzizations
                    <br />
                    nearby!
                  </p>
                  <h3>Current Zip-Code: {localArea ? localArea : null}</h3>
                  <form onSubmit={(e) => this.handleSubmit(e)} action="#">
                    <input type="text" name="zip_code" />
                    <input type="submit" />
                  </form>
                </div>
              </section>
            </div>
          </main>
          <main className="mobile">
            <div className="cols2">
              <section>
                <div>
                  <h2>Enter your zip-code!</h2>
                  <p className="light-text slim">
                    Go to one of the tabs to see your results!
                  </p>
                  <h3>Current Zip-Code: {localArea ? localArea : null}</h3>
                  <form onSubmit={(e) => this.handleSubmit(e)} action="#">
                    <input type="text" name="zip_code" />
                    <input type="submit" />
                  </form>
                </div>
              </section>
            </div>
            <div className="cols1">
              <article>
                <h2>Mission Statement</h2>
                <p className="light-text">
                  At Never Lost, we make sure that every animal that is lost,
                  doesn't have a home, or is suffering in some other way has
                  more of a chance at life than ever. We are doing this by
                  connecting people and animals with resources and homes. Our
                  mission is to connect technology with available resources to
                  ensure that every animal encountered has a better chance of
                  being taken care of, returned home, fostered, or adopted, but
                  most importantly, given a brighter future.
                </p>
                <p className="light-text">
                  To begin this pursuit, we have created a forum where people
                  can let their community know what they want to say about
                  animals. For instance, if you lose your pet or find a lost
                  animal, you can follow these steps:
                </p>
                <ul>
                  <li className="light-text">
                    Describe the animal in the Animal section
                  </li>
                  <li>
                    Create an event about that animal describing its situation.
                  </li>
                  <li className="light-text">
                    To expand on this event, you can create topics about this
                    event, and anyone can post their thoughts on both your event
                    and the topics related to the event.
                  </li>
                  <li className="light-text">
                    Other people can create topics on your event as well, which
                    means they'll know what to do when they find your pet to get
                    your attention.
                  </li>
                </ul>
                <p className="light-text">
                  The forum doesn't have to only be about such serious matters,
                  though. You can find all sorts of things to do with pets on
                  the events section. People will announce meetups, pet shows,
                  walks, and much more that you can talk about and post on! If
                  you own an organization, you can add it too! The more
                  organizations we can present on this, the better.
                </p>
              </article>
            </div>
          </main>
        </ErrorBoundary>
      </div>
    );
  }
}
