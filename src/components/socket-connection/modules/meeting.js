import Module from './module';
import {
  addMeeting,
  removeMeeting,
  editMeeting,
} from '../../../store/redux/slices/meeting';
import { store } from '../../../store/redux/store';

const MEETING_TOPIC = 'meetings';

export class MeetingModule extends Module{
  constructor(messageSender) {
    super(MEETING_TOPIC, messageSender);
  }

  // eslint-disable-next-line class-methods-use-this
  add(msgObj) {
    return store.dispatch(
      addMeeting({
        meetingObject: msgObj,
      })
    );
  }

  // eslint-disable-next-line class-methods-use-this
  remove(msgObj) {
    return store.dispatch(
      removeMeeting({
        meetingObject: msgObj,
      })
    );
  }

  // eslint-disable-next-line class-methods-use-this
  update(msgObj) {
    return store.dispatch(
      editMeeting({
        meetingObject: msgObj,
      })
    );
  }
}