import RegisterContainer from './components/registerContainer.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home/home.js';
import {useSelector} from 'react-redux'
function App() {
  const token = useSelector(state => state.user.token);
  if(token == 0){
  return (
    <div>
      <RegisterContainer />
    </div>
  );
  } else {
    return (
      <Home />
    )
  }
}

export default App;
