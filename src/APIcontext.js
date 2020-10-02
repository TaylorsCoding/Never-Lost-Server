import React from "react";

export default React.createContext({
  // local will only contain information found in the same state
  // either they were found to be in or that they indicated they were in
  localArea: Number,
  localEvents: [],
  localAnimals: [],
  localTopics: [],
  localPosts: [],
  localOrganizations: [],
  // global will build upon itself, so that whenever the client looks up areas,
  // information is added from those areas. global will also include local,
  // but it will not receive that data until the user has looked up a different area
  // (outside of the state)
  globalEvents: [],
  globalAnimals: [],
  globalTopics: [],
  globalPosts: [],
  globalOrganizations: [],
  setLocalArea: () => {},
  addEvent: () => {},
  addTopic: () => {},
  addAnimal: () => {},
  addPost: () => {},
  addOrganizaton: () => {},
  deleteEvent: () => {},
  deleteTopic: () => {},
  deleteAnimal: () => {},
  deletePost: () => {},
  deleteOrganizaton: () => {},
});
