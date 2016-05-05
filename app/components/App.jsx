import React from 'react';
import AltContainer from 'alt-container';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

import Lanes from './Lanes.jsx';

export default class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = NoteStore.getState();
  // }
  // componentDidMount() {
  //   NoteStore.listen(this.storeChanged);
  // }
  // componentWillUnmount() {
  //   NoteStore.unlisten(this.storeChanged);
  // }
  // storeChanged = (state) => {
  //   this.setState(state);
  // }
  render() {
    // const notes = this.state.notes;
    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        {
          // <Notes notes={notes}
          //   onEdit={this.editNote}
          //   onDelete={this.deleteNote} />
        }
        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.getState().notes
          }}
        >
          <Notes
            onEdit={this.editNote}
            onDelete={this.deleteNote}>
          </Notes>
        </AltContainer>

        <Lanes />
      </div>
    );
  }
  addNote = () => {
    NoteActions.create({task: 'New task'});
  }
  editNote = (id, task) => {
    if (!task.trim()) {
      return;
    }

    NoteActions.update({id, task});
  }
  deleteNote = (id, e) => {
    e.stopPropagation();

    NoteActions.delete(id);
  }
}
