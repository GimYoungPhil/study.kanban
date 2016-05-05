import uuid from 'node-uuid';
import alt from '../libs/alt';
import LaneActons from '../actions/LaneActions';

class LaneStore {
  constructor() {
    this.bindActions(LaneActions);

    this.lanes = [];
  }
  create(lane) {
    const this.lanes;

    lane.id = uuid.v4();

    this.setState({
      lanes: lanes.concat(lane)
    });
  }
}

export default alt.createStore(LaneStore, 'LaneStore');
