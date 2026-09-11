import React from "react";
import { ChevronRight, Menu, PanelLeftClose } from "lucide-react";

function Sidebar({ role, page, setPage, collapsed, setCollapsed, navigation }) {
  return <aside className={collapsed ? "sidebar collapsed" : "sidebar"}>
    <div className="side-top">
      <div className="brand"><div className="brand-mark">B</div>{!collapsed && <span>BIOLIFE <b>Finance</b></span>}</div>
      <button type="button" className="icon-btn collapse" aria-label={collapsed ? "Drawerni ochish" : "Drawerni yopish"} aria-expanded={!collapsed} onClick={() => setCollapsed(value => !value)}>
        {collapsed ? <Menu size={19}/> : <PanelLeftClose size={19}/>}
      </button>
    </div>
    <nav aria-label="Asosiy navigatsiya">
      {navigation.filter(item => role.allowed.includes(item.id)).map(({id,label,icon:Icon}) =>
        <button type="button" key={id} className={page===id ? "nav-item active" : "nav-item"} onClick={() => setPage(id)} title={collapsed ? label : ""}>
          <Icon size={18}/>{!collapsed && <span>{label}</span>}
        </button>
      )}
    </nav>
    {!collapsed && <div className="side-bottom"><div className="user-mini"><div className="avatar">{role.initials}</div><div><strong>{role.name}</strong><small>{role.label}</small></div></div></div>}
  </aside>;
}

function Topbar({role,onLogout}) {
  return <header className="topbar">
    <div className="crumb"><span>BIOLIFE GROUP</span><ChevronRight size={14}/><strong>Moliyaviy nazorat</strong></div>
    <div className="top-actions"><button type="button" className="avatar top-avatar" onClick={onLogout} aria-label="Tizimdan chiqish">{role.initials}</button></div>
  </header>;
}

export default function AppLayout({role,page,setPage,collapsed,setCollapsed,navigation,onLogout,children}) {
  return <div className="app">
    <Sidebar {...{role,page,setPage,collapsed,setCollapsed,navigation}}/>
    <main className="content"><Topbar role={role} onLogout={onLogout}/><div className="page">{children}</div></main>
  </div>;
}
