import * as SockJS from 'sockjs-client';
import { useCallback } from 'react';

const backUrl = `http://35.216.19.135:8080/chat/`;
const userId = localStorage.getItem('id');

const sockJs = {};
const useSock = () => {
  const disconnect = useCallback(() => {});
};
