// @flow
import Progress from '../models/Progress';
import type Project from '../models/Project';

export default class Tracker {
  progress: Progress;

  constructor(project: Project) {
    this.progress = new Progress(project);
  }
}
