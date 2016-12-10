// @flow
import electron from 'electron';
import DirectoryManager from '../api/DirectoryManager';
import Project from '../models/Project';
import { push } from 'react-router-redux';
const { dialog } = electron.remote;

export const SET_DIRECTORY = 'SET_DIRECTORY';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const CANCEL = 'CANCEL';

export function setDirectory(record: Project) {
  return {
    type: SET_DIRECTORY,
    payload: record
  };
}

export function updateProject(record: Project) {
  return {
    type: UPDATE_PROJECT,
    payload: record
  };
}

export function cancel() {
  return {
    type: CANCEL
  };
}

export function openProject(project: Project) {
  return (dispatch: Function) => {
    dispatch(updateProject(project));
    dispatch(push('/project'));
  }
}

export function openDirectory() {
  return (dispatch: Function) => {
    const directoryPath: Array<string> = dialog.showOpenDialog({ properties: ['openDirectory'] });
    if (typeof directoryPath === 'undefined') {
      return;
    }
    const manager = new DirectoryManager(directoryPath[0]);
    const project: Project = manager.getProjectRecord();
    manager.on('change', (project) => dispatch(updateProject(project)));
    dispatch(openProject(project));
  };
}
