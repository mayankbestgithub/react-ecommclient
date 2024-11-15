
import { Container } from '@mui/material';
import './App.css';

import BasicMenu from './components/BasicMenu';
import { routes } from './routes';
import { useRoutes } from 'react-router-dom';

function App() {
  const elemment = useRoutes(routes)
  return (
    <Container maxWidth="xs sm md">

      <BasicMenu />
      {elemment}

    </Container>
  );
}

export default App;
