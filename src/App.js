import Router from './routes';
import { AuthProvider } from './common/Authentication';
import Header from './components/Header';


function App() {
  
  return (
    <AuthProvider>
        <Header />
        <Router />
    </AuthProvider>
  );
}

export default App;
