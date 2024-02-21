import RNCallKeep from 'react-native-callkeep';

import { useState } from 'react';
import * as Crypto from 'expo-crypto';

interface Calls {
  [callUUID: string]: string;
}

export const useVoip = () => {

  const [logText, setLog] = useState('');
  const [heldCalls, setHeldCalls] = useState<Calls>({}); // callKeep uuid: held
  const [mutedCalls, setMutedCalls] = useState<Calls>({}); // callKeep uuid: muted
  const [calls, setCalls] = useState<Calls>({}); // callKeep uuid: number

  const setupVoip = () => {
    RNCallKeep.setup({
      ios: {
        appName: 'CallKeepDemo',
      },
      android: {
        alertTitle: 'Permissions required',
        imageName: 'test',
        additionalPermissions: [],
        alertDescription: 'This application needs to access your phone accounts',
        cancelButton: 'Cancel',
        okButton: 'ok',
      },
    });
  }

  const addCall = (callUUID, number) => {
    setHeldCalls({ ...heldCalls, [callUUID]: false });
    setCalls({ ...calls, [callUUID]: number });
  };

  const getRandomNumber = () => String(Math.floor(Math.random() * 100000));

  const log = (text) => {
    console.info(text);
    setLog(logText + "\n" + text);
  };

  const format = uuid => uuid.split('-')[0];

  const removeCall = (callUUID) => {
    const { [callUUID]: _, ...updated } = calls;
    const { [callUUID]: __, ...updatedHeldCalls } = heldCalls;

    setCalls(updated);
    setCalls(updatedHeldCalls);
  };

  const setCallHeld = (callUUID, held) => {
    setHeldCalls({ ...heldCalls, [callUUID]: held });
  };

  const setCallMuted = (callUUID, muted) => {
    setMutedCalls({ ...mutedCalls, [callUUID]: muted });
  };

  const hangup = (callUUID) => {
    RNCallKeep.endCall(callUUID);
    removeCall(callUUID);
  };

  const setOnHold = (callUUID, held) => {
    const handle = calls[callUUID];
    RNCallKeep.setOnHold(callUUID, held);
    log(`[setOnHold: ${held}] ${format(callUUID)}, number: ${handle}`);

    setCallHeld(callUUID, held);
  };

  const setOnMute = (callUUID, muted) => {
    const handle = calls[callUUID];
    RNCallKeep.setMutedCall(callUUID, muted);
    log(`[setMutedCall: ${muted}] ${format(callUUID)}, number: ${handle}`);

    setCallMuted(callUUID, muted);
  };

  const didPerformDTMFAction = ({ callUUID, digits }) => {
    const number = calls[callUUID];
    log(`[didPerformDTMFAction] ${format(callUUID)}, number: ${number} (${digits})`);
  };

  const didReceiveStartCallAction = ({ handle }) => {
    if (!handle) {
      return;
    }
    const callUUID = Crypto.randomUUID();
    addCall(callUUID, handle);

    log(`[didReceiveStartCallAction] ${callUUID}, number: ${handle}`);

    RNCallKeep.startCall(callUUID, handle, handle);

    setTimeout(() => {
      log(`[setCurrentCallActive] ${format(callUUID)}, number: ${handle}`);
      RNCallKeep.setCurrentCallActive(callUUID);
    }, 1000);
  };

  const didPerformSetMutedCallAction = ({ muted, callUUID }) => {
    const number = calls[callUUID];
    log(`[didPerformSetMutedCallAction] ${format(callUUID)}, number: ${number} (${muted})`);

    setCallMuted(callUUID, muted);
  };

  const didToggleHoldCallAction = ({ hold, callUUID }) => {
    const number = calls[callUUID];
    log(`[didToggleHoldCallAction] ${format(callUUID)}, number: ${number} (${hold})`);

    setCallHeld(callUUID, hold);
  };

  const testCall = (number: string) => {
    const callUUID = Crypto.randomUUID();
    const numberOverride = number ? number : getRandomNumber();
    addCall(callUUID, numberOverride);

    log(`[displayIncomingCall] ${format(callUUID)}, number: ${numberOverride}`);

    RNCallKeep.displayIncomingCall(callUUID, numberOverride, numberOverride, 'number', false);
  };

  const answerCall = ({ callUUID }) => {
    const number = calls[callUUID];
    log(`[answerCall] ${format(callUUID)}, number: ${number}`);

    RNCallKeep.startCall(callUUID, number || '', number || '');

    setTimeout(() => {
      log(`[setCurrentCallActive] ${format(callUUID)}, number: ${number}`);
      RNCallKeep.setCurrentCallActive(callUUID);
    }, 1000);
  };


  const endCall = ({ callUUID }) => {
    const handle = calls[callUUID];
    log(`[endCall] ${format(callUUID)}, number: ${handle}`);

    removeCall(callUUID);
  };

  return {
    setupVoip,
    logText,
    setLog,
    heldCalls,
    setHeldCalls,
    mutedCalls,
    setMutedCalls,
    calls,
    setCalls,
    testCall,
    answerCall,
    didPerformDTMFAction,
    didReceiveStartCallAction,
    didPerformSetMutedCallAction,
    didToggleHoldCallAction,
    endCall,
  };
};