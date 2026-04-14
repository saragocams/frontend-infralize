import React from 'react';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#reports">Relatórios</a></li>
          <li><a href="#settings">Configurações</a></li>
        </ul>
      </nav>
    </aside>
  );
}
