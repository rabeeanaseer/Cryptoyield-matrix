import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/components/layout/AppShell";
import { useEffect } from "react";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Terminal from "@/pages/Terminal";
import Chains from "@/pages/Chains";
import ChainDetail from "@/pages/ChainDetail";
import Assets from "@/pages/Assets";
import AssetDetail from "@/pages/AssetDetail";
import Protocols from "@/pages/Protocols";
import ProtocolDetail from "@/pages/ProtocolDetail";
import Pools from "@/pages/Pools";
import Compare from "@/pages/Compare";
import Blog from "@/pages/Blog";
import BlogArticle from "@/pages/BlogArticle";

import About from "@/pages/About";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import Disclaimer from "@/pages/Disclaimer";
import EditorialStandards from "@/pages/EditorialStandards";
import Author from "@/pages/Author";

const queryClient = new QueryClient();

// Stable module-level wrappers so React doesn't remount AppShell on re-renders
const TerminalPage    = () => <AppShell><Terminal /></AppShell>;
const ChainsPage      = () => <AppShell><Chains /></AppShell>;
const ChainDetailPage = () => <AppShell><ChainDetail /></AppShell>;
const AssetsPage      = () => <AppShell><Assets /></AppShell>;
const AssetDetailPage = () => <AppShell><AssetDetail /></AppShell>;
const ProtocolsPage   = () => <AppShell><Protocols /></AppShell>;
const ProtocolDetailPage = () => <AppShell><ProtocolDetail /></AppShell>;
const PoolsPage       = () => <AppShell><Pools /></AppShell>;
const ComparePage     = () => <AppShell><Compare /></AppShell>;
const BlogPage        = () => <AppShell><Blog /></AppShell>;
const BlogArticlePage = () => <AppShell><BlogArticle /></AppShell>;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ScrollToTop />
          <Switch>
            {/* ── Public pages ───────────────────────────────────── */}
            <Route path="/"                          component={Landing} />
            <Route path="/about"                     component={About} />
            <Route path="/contact"                   component={Contact} />
            <Route path="/privacy-policy"            component={PrivacyPolicy} />
            <Route path="/terms-of-service"          component={TermsOfService} />
            <Route path="/disclaimer"                component={Disclaimer} />
            <Route path="/editorial-standards"       component={EditorialStandards} />
            <Route path="/author/rabeea-naseer"      component={Author} />
            <Route path="/author"                    component={Author} />

            {/* ── Terminal (with AppShell sidebar) ───────────────── */}
            <Route path="/terminal"                                            component={TerminalPage} />
            <Route path="/terminal/chains"                                     component={ChainsPage} />
            <Route path="/terminal/chains/:chainName"                          component={ChainDetailPage} />
            <Route path="/terminal/assets"                                     component={AssetsPage} />
            <Route path="/terminal/assets/:symbol"                             component={AssetDetailPage} />
            <Route path="/terminal/protocols"                                  component={ProtocolsPage} />
            <Route path="/terminal/protocols/:protocolName"                    component={ProtocolDetailPage} />
            <Route path="/terminal/pools"                                      component={PoolsPage} />
            <Route path="/terminal/compare/:protocolA/:protocolB/:tokenSymbol" component={ComparePage} />
            <Route path="/terminal/blog"                                       component={BlogPage} />
            <Route path="/terminal/blog/:slug"                                 component={BlogArticlePage} />

            <Route component={NotFound} />
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
