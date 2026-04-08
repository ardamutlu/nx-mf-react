import * as React from 'react';
import {Route, Routes} from 'react-router-dom';
import {loadRemote} from '@module-federation/enhanced/runtime';
import {AuthenticatedLayout} from './components/layout/authenticated-layout';

const Auth = React.lazy(() => import('auth/Module'));
const Dashboard = React.lazy(() => loadRemote('dashboard/Module') as any);

export function App() {
  return (
    <React.Suspense fallback={null}>
      <Routes>
        <Route path="/sign-in" element={<Auth/>}/>
        <Route
          path="/*"
          element={
            <AuthenticatedLayout>
              <Routes>
                <Route path="/" element={<Dashboard/>}/>
              </Routes>
            </AuthenticatedLayout>
          }
        />
      </Routes>
    </React.Suspense>
  );
}

export default App;
