import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { Layout } from "./components/refine-ui/layout/layout.tsx"; 

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { dataProvider } from "./providers/data";
import Dashboard from "./pages/Dashboard";
import { BookOpen, Home } from "lucide-react";
import SubjectLists from "./pages/Subjects/Lists.tsx";
import SubjectCreate from "./pages/Subjects/Create.tsx";

function App() {
  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "L4ECf6-Ppcbqg-8LACVb",
              }}
              resources={[
                {
                  name: 'dashboard',
                  list: '/',
                  meta: { 
                    label: 'Home',
                    icon: <Home/> 
                  }
                },
                {
                  name: 'subjects',
                  list: '/subjects',
                  create: '/subjects/create',
                   meta: { 
                    label: 'Subjects',
                    icon: <BookOpen/> 
                  }
                }
              ]}
            >
              <Routes>
                <Route element = {
                <Layout>
                  <Outlet />
                </Layout>
                }> 
                <Route path="/" element={<Dashboard />} />
                <Route path = "/subjects" >
                  <Route index element={<SubjectLists />} />
                  <Route path="/subjects/create" element={<SubjectCreate />} />
                </Route>
                </Route>
                
              </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
