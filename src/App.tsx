import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AppSidebar } from "./components/AppSidebar";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import BizBot from "./pages/BizBot";
import SmartTax from "./pages/SmartTax";
import Investors from "./pages/Investors";
import Templates from "./pages/Templates";
import Learning from "./pages/Learning";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <SidebarProvider>
                    <div className="flex min-h-screen w-full">
                      <AppSidebar />
                      <main className="flex-1 overflow-auto">
                        <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background px-6">
                          <SidebarTrigger />
                        </header>
                        <div className="p-6">
                          <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/bizbot" element={<BizBot />} />
                            <Route path="/smart-tax" element={<SmartTax />} />
                            <Route path="/investors" element={<Investors />} />
                            <Route path="/templates" element={<Templates />} />
                            <Route path="/learning" element={<Learning />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </div>
                      </main>
                    </div>
                  </SidebarProvider>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
