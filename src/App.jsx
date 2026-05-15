import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import EntryPage from './pages/EntryPage';

function App() {
  const [user, setUser] = useLocalStorage('user', null);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={!user ? <Welcome onLogin={setUser} /> : <Navigate to="/home" replace />} 
        />
        <Route 
          path="/home" 
          element={user ? <Home user={user} /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/home/:catName" 
          element={user ? <CategoryPage /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/home/:catName/:entryName" 
          element={user ? <EntryPage /> : <Navigate to="/" replace />} 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
