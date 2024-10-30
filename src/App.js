import React, { Suspense } from 'react';
import './App.css';

// Lazy load the MedicamentoForm component
const MedicamentoForm = React.lazy(() => import('./MedicamentoForm'));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Controle de Estoque de Medicamento</h1>
        <Suspense fallback={<div>Carregando...</div>}>
          <MedicamentoForm />
        </Suspense>
      </header>
    </div>
  );
}

export default App;
