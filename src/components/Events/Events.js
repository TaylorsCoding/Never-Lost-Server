import React, { Component } from "react";
import "./Events.css";

import ApiContext from "../../APIcontext";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import EventComponent from "../EventComponent/EventComponent";
import { NavLink } from "react-router-dom";

export default class Events extends Component {
  static contextType = ApiContext;

  render() {
    // Get these four from context because they are all used

    // local and global events are both pulled if they exist, with local
    // displaying first.

    // globalOrganizations and globalAnimals are referenced if an event is
    // associated with one or both an animal and an organization.

    // A conditional operator is used to display the name of the
    // organization or animal if the event is associated with one.
    const {
      globalEvents = [],
      localEvents = [],
      globalOrganizations = [],
      globalAnimals = [],
    } = this.context;
    return (
      <div className="event-content">
        <ErrorBoundary>
          <h1>Events</h1>
          <div className="add-button">
            <NavLink to="/create-event">
              <button>Create New Event</button>
            </NavLink>
          </div>
          {localEvents.length > 0 ? (
            <>
              <h1>Local Events</h1>
              {localEvents.map((evnt) =>
                evnt.title.length > 0 ? (
                  <>
                    <EventComponent
                      id={evnt.id}
                      key={evnt.id}
                      title={evnt.title}
                      type={evnt.type}
                      zip_code={evnt.zip_code}
                      description={evnt.description}
                      date_published={evnt.date_published}
                      animal_id={
                        evnt.animal_id
                          ? globalAnimals.find(
                              (animal) =>
                                parseInt(animal.id) === parseInt(evnt.animal_id)
                            )
                            ? globalAnimals.find(
                                (animal) =>
                                  parseInt(animal.id) ===
                                  parseInt(evnt.animal_id)
                              ).name
                            : null
                          : null
                      }
                      org_id={
                        evnt.org_id
                          ? globalOrganizations.find(
                              (org) =>
                                parseInt(org.id) === parseInt(evnt.org_id)
                            )
                            ? globalOrganizations.find(
                                (org) =>
                                  parseInt(org.id) === parseInt(evnt.org_id)
                              ).name
                            : null
                          : null
                      }
                    />
                    <p>{evnt}</p>
                  </>
                ) : null
              )}
            </>
          ) : null}
          <h1>All Events</h1>
          {globalEvents.map((evnt) =>
            evnt.title.length > 0 ? (
              <EventComponent
                id={evnt.id}
                key={evnt.id}
                title={evnt.title}
                type={evnt.type}
                zip_code={evnt.zip_code}
                description={evnt.description}
                date_published={evnt.date_published}
                animal_id={
                  evnt.animal_id
                    ? globalAnimals.find(
                        (animal) =>
                          parseInt(animal.id) === parseInt(evnt.animal_id)
                      )
                      ? globalAnimals.find(
                          (animal) =>
                            parseInt(animal.id) === parseInt(evnt.animal_id)
                        ).name
                      : null
                    : null
                }
                org_id={
                  evnt.org_id
                    ? globalOrganizations.find(
                        (org) => parseInt(org.id) === parseInt(evnt.org_id)
                      )
                      ? globalOrganizations.find(
                          (org) => parseInt(org.id) === parseInt(evnt.org_id)
                        ).name
                      : null
                    : null
                }
              />
            ) : null
          )}
        </ErrorBoundary>
      </div>
    );
  }
}
