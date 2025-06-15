import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './TabBar.scss';

interface Tab {
  id: string;
  label: string;
  path: string;
}

interface TabBarProps {
  tabs: Tab[];
}


function TabBar({ tabs }: TabBarProps) {
  const location = useLocation();

  return (
    <div className="tab-bar">
      {tabs.map((tab) => (
        <Link
          to={tab.path}
          key={tab.id}
          className={`tab-item ${location.pathname === tab.path ? 'active' : ''}`}
          
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

export default TabBar;