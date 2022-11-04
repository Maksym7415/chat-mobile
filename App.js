import 'react-native-gesture-handler';
import * as React from 'react';
import {Provider} from 'react-redux';
// import {PersistGate} from 'redux-persist/integration/react';
import Navigation from './navigation';
import store, {persistor} from './redux';
import {startSocketIO} from './config/socket';

// const App = () => {
//   return (
//     <React.Fragment>
//       <Proaigation />
//       </Provider>
//     </React.Fragment>
//   );
// };

class App extends React.Component {
  componentDidMount() {
    startSocketIO(store);
  }

  render() {
    return (
      <React.Fragment>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </React.Fragment>
    );
  }
}

export default App;
