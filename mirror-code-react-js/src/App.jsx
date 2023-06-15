import './App.css';

import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Array from './pages/topics/array';
import Graph from './pages/topics/graph';
import Questions from './pages/questions';
import Discussion from './pages/discussion';
import Sorting from './pages/topics/sorting';
import MirrorEditor from './pages/mirror-editor';
import AddDiscussion from './pages/add-discussion';
import DiscussionView from './pages/discussion-view';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { AuthUserContext } from './context/authUserContext';
import useFirebaseAuth from './hooks/useFirebaseAuth';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Topics } from './pages/topics';
import Favorites from './pages/favorites';
import { Progress } from './pages/progress';
import Recursion from './pages/topics/recursion';

function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={queryClient}>
        <AuthUserContext.Provider value={useFirebaseAuth()}>
          <Notifications></Notifications>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              
              <Route path="/topic-array" element={<Array />}></Route>
              <Route path="/topic-graph" element={<Graph />}></Route>
              <Route path="/topic-sorting" element={<Sorting />}></Route>
              <Route path="/topic-recursion" element={<Recursion />}></Route>

              <Route path="/questions" element={<Questions />}></Route>
              <Route path="/topics" element={<Topics />}></Route>
              <Route path="/favorites" element={<Favorites />}></Route>
              <Route path="/progress" element={<Progress />}></Route>
              <Route path="/mirror-editor" element={<MirrorEditor />}></Route>

              <Route path="/discussion" element={<Discussion />}></Route>
              <Route path="/add-discussion" element={<AddDiscussion />}></Route>
              <Route path="/discussion-view" element={<DiscussionView />}></Route>
            </Routes>
          </BrowserRouter>
        </AuthUserContext.Provider>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
