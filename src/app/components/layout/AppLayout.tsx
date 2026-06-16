import { useState } from "react";
import { Outlet } from "react-router";
import { Navbar } from "../navbar/Navbar";
import { Sidebar } from "../sidebar/Sidebar";
import { useIsMobile } from "../ui/use-mobile";

export function AppLayout() {
  const isMobile = useIsMobile();
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const onToggle = () => (isMobile ? setMobileOpen((o) => !o) : setDesktopCollapsed((c) => !c));

  return (
    <div className="flex h-full flex-col">
      <Navbar onToggleSidebar={onToggle} />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        {!isMobile && (
          <aside className="hidden shrink-0 overflow-y-auto border-r border-border md:block">
            <Sidebar collapsed={desktopCollapsed} />
          </aside>
        )}

        {/* Mobile slide-over drawer */}
        {isMobile && mobileOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <aside
              role="dialog"
              aria-label="Navigation"
              className="fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-background shadow-xl"
            >
              <Sidebar onNavigate={() => setMobileOpen(false)} />
            </aside>
          </>
        )}

        <main className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
