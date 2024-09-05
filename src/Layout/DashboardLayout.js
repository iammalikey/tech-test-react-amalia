import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar, Navbar, Dropdown } from 'flowbite-react';
import { Link } from 'react-router-dom';

const DashboardLayout = () => {
    const location = useLocation();
    const getPageTitle = () => {
        switch (location.pathname) {
            case '/':
                return 'Employee List';
            case '/add-employee':
                return 'New Data Employee';
            case '/edit-employee/:id':
                return 'Edit Employee';
            default:
                return 'Dashboard';
        }
    };

  return (
    <div className="flex">
        {/* Sidebar */}
        <Sidebar className="w-64 bg-gray-800 text-white h-screen">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item>
                    <Link to="/">Dashboard</Link>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
        {/* Content */}
        <div className="flex-1 flex flex-col">
            {/* Navbar */}
            <Navbar className="bg-gray-900 text-white">
                <Navbar.Brand>
                    <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
                </Navbar.Brand>
            </Navbar>
            {/* Content */}
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    </div>
  );
};

export { DashboardLayout as Layout };
