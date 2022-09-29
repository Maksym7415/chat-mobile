import io from 'socket.io-client/dist/socket.io';
// const io = require('socket.io-client/dist/socket.io');
import {REACT_APP_SOCKET_URL} from '../constants/url';

export default io(REACT_APP_SOCKET_URL, {
  path: '/socket',
  transports: ['websocket', 'polling'],
});
