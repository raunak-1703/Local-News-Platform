import React, { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import {
  Newspaper,
  User,
  LayoutDashboard,
  Shield,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import useAuthStore from "../store/authStore";
import { Button } from "./ui/button";

const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuthStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg">
              <Newspaper className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              LocalNews
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Home Link */}
                <NavLink to="/">
                  {({ isActive }) => (
                    <Button variant={isActive ? "default" : "ghost"} size="sm">
                      Home
                    </Button>
                  )}
                </NavLink>

                {/* Create Post Link */}
                <NavLink to="/create">
                  {({ isActive }) => (
                    <Button variant={isActive ? "default" : "ghost"} size="sm">
                      Create Post
                    </Button>
                  )}
                </NavLink>

                {/* Dashboard Link */}
                <NavLink to="/dashboard">
                  {({ isActive }) => (
                    <Button variant={isActive ? "default" : "ghost"} size="sm">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  )}
                </NavLink>

                {/* Admin Link */}
                {isAdmin() && (
                  <NavLink to="/admin">
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Admin
                      </Button>
                    )}
                  </NavLink>
                )}

                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  {user?.name}
                </Button>

                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-2">
            {isAuthenticated ? (
              <>
                {/* Home Link (Mobile) */}
                <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      Home
                    </Button>
                  )}
                </NavLink>

                {/* Create Post Link (Mobile) */}
                <NavLink to="/create" onClick={() => setMobileMenuOpen(false)}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      Create Post
                    </Button>
                  )}
                </NavLink>

                {/* Dashboard Link (Mobile) */}
                <NavLink
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  )}
                </NavLink>

                {/* Admin Link (Mobile) */}
                {isAdmin() && (
                  <NavLink to="/admin" onClick={() => setMobileMenuOpen(false)}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className="w-full justify-start"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Admin
                      </Button>
                    )}
                  </NavLink>
                )}

                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="w-full justify-start">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full justify-start">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
