// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Project from '../components/Project';
import * as ProjectActions from '../actions/home';

function mapStateToProps(state) {
  return {
    project: state.project
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProjectActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
