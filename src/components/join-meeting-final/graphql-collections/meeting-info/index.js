import { gql, useQuery } from '@apollo/client';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { addMeeting } from '../../../../store/redux/slices/meeting';

const MeetingInfo = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(
    gql`query {
      meeting {
        meetingId
        createdTime
        disabledFeatures
        durationInSeconds
        extId
        html5InstanceId
        isBreakout
        maxPinnedCameras
        meetingCameraCap
        name
        notifyRecordingIsOn
        presentationUploadExternalDescription
        presentationUploadExternalUrl
        learningDashboardAccessToken
      }
    }`
  );
  console.log('meeting info rendered');
  console.log(loading, error, data);

  if (!loading && !error) {
    dispatch(addMeeting({
      meetingObject: data.meeting
    }));
  }

  return (
    <View />
  );
};
export default MeetingInfo;
