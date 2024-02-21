

import { useEffect } from 'react';
import { useVoip } from '../hooks/useVoip';

const CallKeepController = (props) => {
  const {
    setupVoip,
    logText,
    heldCalls,
    mutedCalls,
    testCall,
    calls,
    answerCall,
    didPerformDTMFAction,
    didReceiveStartCallAction,
    didPerformSetMutedCallAction,
    didToggleHoldCallAction,
    endCall,
  } = useVoip();


  useEffect(() => {
    setupVoip();
    testCall('')
  }, []);

  return null;
};

export default CallKeepController;
