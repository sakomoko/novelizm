// @flow
import { SET_DIRECTORY, UPDATE_PROJECT } from '../actions/project';
import Project from '../models/Project'

const defaltProject = new Project({});
export default function project(state: Project = defaltProject, action: Object) {
  switch (action.type) {
    case UPDATE_PROJECT:
    case SET_DIRECTORY:
      return action.payload;
    default:
      return state;
  }
}
