import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CircleDollarSign,
  Factory,
  FileText,
  Gauge,
  LayoutDashboard,
  Package,
  Plus,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
  Users,
  Wallet,
  X,
} from "lucide-react";
import "./tailwind.css";
import ModulePage from "./ModulePage.jsx";
import AIAssistant from "./AIAssistant.jsx";
import AppLayout from "./components/AppLayout.jsx";
import { apiFetch, setSession } from "./api.js";

const roles = {
  ceo: {
    label: "CEO / Direktor",
    name: "Komron Xidoyatov",
    initials: "KX",
    allowed: [
      "dashboard",
      "production",
      "warehouse",
      "sales",
      "purchases",
      "cash",
      "finance",
      "budget",
      "ai",
    ],
  },
  accountant: {
    label: "Buxgalter",
    name: "Madina Karimova",
    initials: "MK",
    allowed: ["dashboard", "cash", "finance", "sales", "purchases"],
  },
  warehouse_manager: {
    label: "Ombor boshlig‘i",
    name: "Azizbek Umarov",
    initials: "AU",
    allowed: ["dashboard", "warehouse", "production"],
  },
  production_manager: {
    label: "Ishlab chiqarish boshlig‘i",
    name: "Dilshod Raxmatov",
    initials: "DR",
    allowed: ["dashboard", "production", "warehouse"],
  },
  sales_manager: {
    label: "Sotuv menejeri",
    name: "Madina Yoqubova",
    initials: "MY",
    allowed: ["dashboard", "sales"],
  },
  purchase_manager: {
    label: "Ta’minot menejeri",
    name: "Sardor Aliyev",
    initials: "SA",
    allowed: ["dashboard", "purchases", "warehouse"],
  },
  auditor: {
    label: "Auditor",
    name: "Nodira Sobirova",
    initials: "NS",
    allowed: [
      "dashboard",
      "production",
      "warehouse",
      "sales",
      "purchases",
      "cash",
      "finance",
      "budget",
    ],
  },
};
const nav = [
  { id: "dashboard", label: "Boshqaruv paneli", icon: LayoutDashboard },
  { id: "production", label: "Ishlab chiqarish", icon: Factory },
  { id: "warehouse", label: "Ombor", icon: Package },
  { id: "sales", label: "Sotuv", icon: ShoppingCart },
  { id: "purchases", label: "Xarid", icon: Truck },
  { id: "cash", label: "Kassa va bank", icon: Wallet },
  { id: "finance", label: "Moliya", icon: CircleDollarSign },
  { id: "budget", label: "Byudjet", icon: BarChart3 },
  { id: "ai", label: "AI moliyaviy tahlilchi", icon: Sparkles },
  { id: "admin", label: "Telegram ulanishlari", icon: Users },
];
const titleMap = {
  production: "Ishlab chiqarish",
  warehouse: "Ombor",
  sales: "Sotuv",
  purchases: "Xarid",
  cash: "Kassa va bank",
  finance: "Moliya",
  budget: "Byudjet",
  ai: "AI moliyaviy tahlilchi",
  admin: "Telegram ulanishlari",
};
const fmt = (v) => v ?? "—";

class PageErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error) {
    console.error("Sahifa render xatosi:", error);
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="api-error">
        <span>Sahifa ma’lumotlarida xato topildi.</span>
        <button
          onClick={() => {
            Object.keys(localStorage)
              .filter((key) => key.startsWith("biolife-ai-"))
              .forEach((key) => localStorage.removeItem(key));
            window.location.reload();
          }}
        >
          AI tarixini tiklash
        </button>
      </div>
    );
  }
}

function Login({ onLogin }) {
  const [user, setUser] = useState("ceo"),
    [pass, setPass] = useState(""),
    [show, setShow] = useState(false),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(false);
  const submit = async () => {
    if (!pass.trim()) {
      setError("Parolni kiriting.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const r = await apiFetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: user, password: pass }),
      });
      const result = await r.json();
      if (!r.ok) throw new Error(result.message || "Login xatosi.");
      setSession(result);
      onLogin(result.user);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-shell">
      <div className="login-art">
        <div className="brand-mark">B</div>
        <div>
          <span className="eyebrow">BIOLIFE FINANCE / 01</span>
          <h1>
            Moliyani
            <br />
            <em>aniqlik bilan</em> boshqaring.
          </h1>
          <p>Yagona ma’lumot manbai. Har bir qaror uchun ishonchli raqamlar.</p>
        </div>
        <div className="art-note">
          <span>REAL-TIME OPERATIONS</span>
          <strong>24/7</strong>
          <small>moliyaviy nazorat</small>
        </div>
      </div>
      <div className="login-panel">
        <div className="mobile-brand">
          <div className="brand-mark">B</div>
          <span>
            BIOLIFE <b>Finance</b>
          </span>
        </div>
        <div className="login-card">
          <span className="eyebrow">XUSH KELIBSIZ</span>
          <h2>Tizimga kirish</h2>
          <p className="muted">Akkauntingizni tanlang va davom eting.</p>
          <label>
            Rolni tanlang
            <select value={user} onChange={(e) => setUser(e.target.value)}>
              {Object.entries(roles).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Login
            <div className="input-wrap">
              <Users size={17} />
              <input value={user} onChange={(e) => setUser(e.target.value)} />
            </div>
          </label>
          <label>
            Parol
            <div className="input-wrap">
              <ShieldCheck size={17} />
              <input
                type={show ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••"
              />
              <button className="icon-btn" onClick={() => setShow(!show)}>
                {show ? "Yashirish" : "Ko‘rsatish"}
              </button>
            </div>
          </label>
          {error && (
            <p role="alert" className="form-error">
              {error}
            </p>
          )}
          <button
            className="primary login-btn"
            disabled={loading}
            onClick={submit}
          >
            <span>{loading ? "Tekshirilmoqda…" : "Tizimga kirish"}</span>
          </button>
          <div className="secure-note">
            <ShieldCheck size={15} /> Sessiya xavfsiz himoyalangan
          </div>
        </div>
        <p className="login-foot">© 2026 Biolife. Ichki foydalanish uchun.</p>
      </div>
    </div>
  );
}

function TelegramAdmin() {
  const [requests, setRequests] = useState([]),
    [error, setError] = useState("");
  const load = () =>
    apiFetch("/admin/telegram-links")
      .then(async (r) => {
        const x = await r.json();
        if (!r.ok) throw new Error(x.message);
        setRequests(x);
      })
      .catch((e) => setError(e.message));
  useEffect(() => {
    load();
  }, []);
  const approve = async (id, userId) => {
    const r = await apiFetch(`/admin/telegram-links/${id}/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    const x = await r.json();
    if (!r.ok) return setError(x.message);
    load();
  };
  const revoke = async (id) => {
    if (!window.confirm("Telegram akkaunti uzilsinmi?")) return;
    const r = await apiFetch(`/admin/telegram-links/${id}`, {
      method: "DELETE",
    });
    const x = await r.json();
    if (!r.ok) return setError(x.message);
    load();
  };
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">ADMIN / TELEGRAM</span>
          <h1>Telegram akkauntlarini ulash</h1>
          <p>
            Faqat tasdiqlangan xodimlar bot va Mini App’dan foydalana oladi.
          </p>
        </div>
      </div>
      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}
      <section className="panel table-panel">
        <table>
          <thead>
            <tr>
              <th>TELEGRAM</th>
              <th>ID</th>
              <th>HOLAT</th>
              <th>XODIM</th>
              <th>AMAL</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((x) => (
              <tr key={x.id}>
                <td>
                  {x.firstName} {x.username && `@${x.username}`}
                </td>
                <td>{x.telegramId}</td>
                <td>
                  <span className="status">{x.status}</span>
                </td>
                <td>
                  <select
                    value={x.userId || ""}
                    onChange={(e) =>
                      e.target.value && approve(x.id, e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Akkauntni tanlang
                    </option>
                    {Object.entries(roles).map(([id, r]) => (
                      <option value={id} key={id}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  {x.status === "approved" && (
                    <button className="danger" onClick={() => revoke(x.id)}>
                      Ulanishni uzish
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!requests.length && (
          <div className="empty-note">
            <Users size={18} />
            <div>
              <strong>Ulanish so‘rovi yo‘q</strong>
              <span>Xodim botda /start bosganda shu yerda paydo bo‘ladi.</span>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function Kpi({ title, value, change, positive = true, icon: Icon, tint }) {
  return (
    <div className="kpi">
      <div className="kpi-head">
        <span>{title}</span>
        <div className={"kpi-icon " + tint}>
          <Icon size={18} />
        </div>
      </div>
      <strong>{fmt(value)}</strong>
      <div className={positive ? "change up" : "change down"}>
        {positive ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}{" "}
        {change}
        <span> oldingi davrga</span>
      </div>
    </div>
  );
}
function CreateModal({ onClose, onSaved }) {
  const [form, setForm] = useState({ name: "", type: "Sotuv", amount: "" }),
    [saving, setSaving] = useState(false),
    [error, setError] = useState("");
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const r = await apiFetch("/operations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error("Nomi va summa majburiy");
      const row = await r.json();
      onSaved(row);
      onClose();
    } catch (x) {
      setError(x.message);
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="modal-backdrop">
      <form className="modal" onSubmit={save}>
        <div className="modal-head">
          <div>
            <span className="eyebrow">YANGI OPERATSIYA</span>
            <h2>Hujjat yaratish</h2>
          </div>
          <button type="button" className="icon-btn" onClick={onClose}>
            <X size={19} />
          </button>
        </div>
        <label>
          Operatsiya turi
          <select name="type" value={form.type} onChange={update}>
            <option>Sotuv</option>
            <option>Xarid</option>
            <option>Xarajat</option>
            <option>To‘lov</option>
            <option>Ombor</option>
          </select>
        </label>
        <label>
          Nom / kontragent
          <input
            name="name"
            value={form.name}
            onChange={update}
            placeholder="Masalan: Green Market LLC"
            autoFocus
          />
        </label>
        <label>
          Summa (UZS)
          <input
            name="amount"
            value={form.amount}
            onChange={update}
            placeholder="18 450 000"
          />
        </label>
        {error && <div className="form-error">{error}</div>}
        <button className="primary" disabled={saving}>
          {saving ? "Saqlanmoqda..." : "Saqlash"}
        </button>
      </form>
    </div>
  );
}
function DepartmentDashboard({ data, role, setPage }) {
  const d = data.department,
    statusCount = d.sections.reduce(
      (n, s) => n + Object.keys(s.statuses).length,
      0,
    );
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            {data.meta?.period} / {role.label.toUpperCase()}
          </span>
          <h1>
            Assalomu alaykum, {role.name} <span className="wave">✦</span>
          </h1>
          <p>{role.label} uchun bo‘lim analitikasi va oxirgi ma’lumotlar.</p>
        </div>
      </div>
      <div className="department-kpis">
        <div className="kpi">
          <span className="eyebrow">JAMI YOZUV</span>
          <strong>{d.total}</strong>
          <small>Ruxsat etilgan bo‘limlarda</small>
        </div>
        <div className="kpi">
          <span className="eyebrow">ICHKI BO‘LIMLAR</span>
          <strong>{d.sections.length}</strong>
          <small>Faol analitika kesimi</small>
        </div>
        <div className="kpi">
          <span className="eyebrow">STATUS TURLARI</span>
          <strong>{statusCount}</strong>
          <small>Jarayon holatlari</small>
        </div>
      </div>
      <div className="main-grid">
        <section className="panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">BO‘LIM ANALITIKASI</span>
              <h2>{d.title || role.label}</h2>
            </div>
          </div>
          <div className="department-sections">
            {d.sections.map((x) => (
              <button key={x.module + x.name} onClick={() => setPage(x.module)}>
                <span>
                  <strong>{x.name}</strong>
                  <small>
                    {Object.entries(x.statuses)
                      .map(([k, v]) => k + ": " + v)
                      .join(" · ") || "Status yo‘q"}
                  </small>
                </span>
                <b>{x.total}</b>
              </button>
            ))}
          </div>
        </section>
        <section className="panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">SO‘NGGI MA’LUMOTLAR</span>
              <h2>Yaqinda kiritilgan yozuvlar</h2>
            </div>
          </div>
          <div className="recent-records">
            {d.recent.map((x, i) => (
              <button key={x.row[0] + i} onClick={() => setPage(x.module)}>
                <div>
                  <strong>{x.row[1]}</strong>
                  <small>
                    {x.section} · {x.row[2]}
                  </small>
                </div>
                <span className="status">{x.row[4]}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
function Dashboard({ data, role, setPage, onCreate }) {
  const [period, setPeriod] = useState("30 kun");
  if (data.department)
    return <DepartmentDashboard data={data} role={role} setPage={setPage} />;
  const ops = data.operations;
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            {data.meta?.period || "AVGUST 2026"} / BIOLIFE GROUP
          </span>
          <h1>
            Assalomu alaykum, {role.name} <span className="wave">✦</span>
          </h1>
          <p>Bugungi moliyaviy holat bir qarashda.</p>
        </div>
        <button className="primary" onClick={onCreate}>
          <Plus size={18} /> Yangi operatsiya
        </button>
      </div>
      <div className="filter-strip">
        <span className="live-dot" /> Saqlangan davr ko‘rsatkichlari{" "}
        <span className="filter-spacer" />
        <span>Filial:</span>
        <span>Barcha filiallar</span>
        <span>Valyuta:</span>
        <span>UZS</span>
      </div>
      <div className="kpi-grid">
        {[
          ["Ishlab chiqarish hajmi", "productionVolume", Factory, "mint"],
          ["Tayyor mahsulot", "finishedGoods", Package, "lavender"],
          ["Daromad", "income", ArrowUpRight, "gold"],
          ["Xarajat", "expense", ArrowDownRight, "rose"],
          ["Sof foyda", "netProfit", CircleDollarSign, "blue"],
          ["1 litr tannarxi", "unitCost", Gauge, "sand"],
        ].map(([t, key, Icon, tint]) => (
          <Kpi
            key={key}
            title={t}
            value={data.summary[key]?.value}
            change={data.summary[key]?.change}
            positive={key !== "expense"}
            icon={Icon}
            tint={tint}
          />
        ))}
      </div>
      <div className="main-grid">
        <section className="panel chart-panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">MOLIYAVIY OQIM</span>
              <h2>Daromad va xarajatlar</h2>
            </div>
            <div className="periods">
              {["7 kun", "30 kun"].map((x) => (
                <button
                  className={period === x ? "selected" : ""}
                  onClick={() => setPeriod(x)}
                  key={x}
                >
                  {x}
                </button>
              ))}
            </div>
          </div>
          <div className="legend">
            <span>
              <i className="dot income" /> Daromad
            </span>
            <span>
              <i className="dot expense" /> Xarajat
            </span>
            <strong>UZS / mln · {period}</strong>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart
              data={
                period === "7 kun" ? data.cashflow.slice(-2) : data.cashflow
              }
            >
              <defs>
                <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7bdab5" stopOpacity=".34" />
                  <stop offset="100%" stopColor="#7bdab5" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f0bd7a" stopOpacity=".26" />
                  <stop offset="100%" stopColor="#f0bd7a" stopOpacity="0" />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#e8ebe7" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#87918d", fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#87918d", fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{
                  border: "0",
                  borderRadius: 12,
                  boxShadow: "0 8px 30px #19342a18",
                }}
              />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#4fb990"
                strokeWidth={2.5}
                fill="url(#income)"
              />
              <Area
                type="monotone"
                dataKey="expense"
                stroke="#dc9e56"
                strokeWidth={2}
                fill="url(#expense)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </section>
        <section className="panel mix-panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">DAROMAD TARKIBI</span>
              <h2>Mahsulotlar bo‘yicha</h2>
            </div>
          </div>
          <div className="donut">
            <ResponsiveContainer width="100%" height={170}>
              <PieChart>
                <Pie
                  data={data.productMix}
                  innerRadius={52}
                  outerRadius={72}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {data.productMix.map((p) => (
                    <Cell key={p.name} fill={p.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center">
              <strong>{data.summary.income.value}</strong>
              <small>jami daromad</small>
            </div>
          </div>
          <div className="mix-legend">
            {data.productMix.map((p) => (
              <div key={p.name}>
                <span>
                  <i style={{ background: p.color }} /> {p.name}
                </span>
                <b>{p.value}%</b>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="lower-grid">
        <section className="panel operations">
          <div className="panel-head">
            <div>
              <span className="eyebrow">TRANSAKSIYALAR</span>
              <h2>So‘nggi operatsiyalar</h2>
            </div>
            <button className="text-btn" onClick={() => setPage("finance")}>
              Barchasini ko‘rish
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>SANA</th>
                <th>OPERATSIYA</th>
                <th>TURI</th>
                <th>SUMMA</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {ops.map((r, i) => (
                <tr key={r.code + i}>
                  <td>{r.date}</td>
                  <td>
                    <strong>
                      {r.code} · {r.name}
                    </strong>
                  </td>
                  <td>
                    <span className="type-pill">{r.type}</span>
                  </td>
                  <td>
                    <strong>{r.amount}</strong>
                  </td>
                  <td>
                    <span
                      className={
                        "status " +
                        (r.status === "Jarayonda" || r.status === "Qoralama"
                          ? "processing"
                          : "")
                      }
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="panel production">
          <div className="panel-head">
            <div>
              <span className="eyebrow">ISHLAB CHIQARISH</span>
              <h2>Bugungi holat</h2>
            </div>
          </div>
          <div className="production-total">
            <div>
              <strong>
                {data.productionLines.length
                  ? (
                      data.productionLines.reduce((s, r) => s + r.progress, 0) /
                      data.productionLines.length
                    ).toFixed(1)
                  : 0}
                %
              </strong>
              <span>Liniyalarning o‘rtacha bajarilishi</span>
            </div>
            <Activity size={37} color="#55bd92" />
          </div>
          {data.productionLines.map((x) => (
            <div className="line-progress" key={x.name}>
              <div>
                <span>{x.name}</span>
                <b>{x.progress}%</b>
              </div>
              <div className="bar">
                <i style={{ width: x.progress + "%" }} />
              </div>
            </div>
          ))}
          <button
            className="outline full"
            onClick={() => setPage("production")}
          >
            Ishlab chiqarishni ochish
          </button>
        </section>
      </div>
    </>
  );
}
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const routePage =
    location.pathname.split("/").filter(Boolean)[0] || "dashboard";
  const page = nav.some((item) => item.id === routePage)
    ? routePage
    : "dashboard";
  const setPage = (nextPage) => navigate(`/${nextPage}`);
  const [account, setAccount] = useState(null),
    [checking, setChecking] = useState(true),
    [collapsed, setCollapsed] = useState(false),
    [dashboard, setDashboard] = useState(null),
    [module, setModule] = useState(null),
    [moduleLoading, setModuleLoading] = useState(false),
    [moduleError, setModuleError] = useState(""),
    [modal, setModal] = useState(false),
    [loading, setLoading] = useState(false),
    [error, setError] = useState("");
  const roleKey = account?.role || "ceo";
  const baseRole = roles[roleKey] || roles.ceo;
  const role = account
    ? {
        ...baseRole,
        name: account.name || baseRole.name,
        allowed: account.allowed || baseRole.allowed,
      }
    : baseRole;
  useEffect(() => {
    if (routePage !== page || (account && !role.allowed.includes(page))) {
      navigate("/dashboard", { replace: true });
    }
  }, [account, navigate, page, role.allowed, routePage]);
  useEffect(() => {
    const telegramApp = window.Telegram?.WebApp;
    if (telegramApp) {
      telegramApp.ready();
      telegramApp.expand();
      try {
        if (typeof telegramApp.requestFullscreen === "function")
          telegramApp.requestFullscreen();
      } catch {
        // Eski Telegram mijozlarida expand() to\u2018liq ekran uchun fallback bo\u2018ladi.
      }
    }
    const restore = async () => {
      try {
        const initData = window.Telegram?.WebApp?.initData;
        if (initData && !localStorage.getItem("biolife-token")) {
          const r = await apiFetch("/auth/telegram", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ initData }),
          });
          if (r.ok) {
            const session = await r.json();
            setSession(session);
            setAccount(session.user);
            return;
          }
        }
        if (localStorage.getItem("biolife-token")) {
          const r = await apiFetch("/me");
          if (r.ok) setAccount(await r.json());
        }
      } finally {
        setChecking(false);
      }
    };
    restore();
    const expired = () => {
      setSession(null);
      setAccount(null);
    };
    window.addEventListener("biolife-auth-expired", expired);
    return () => window.removeEventListener("biolife-auth-expired", expired);
  }, []);
  useEffect(() => {
    if (!account) return;
    setLoading(true);
    const load = () =>
      apiFetch("/dashboard")
        .then(async (r) => {
          const x = await r.json();
          if (!r.ok) throw new Error(x.message);
          setDashboard(x);
          setError("");
        })
        .catch(() => setError("API server ishga tushirilmagan."))
        .finally(() => setLoading(false));
    load();
    const timer = setInterval(load, 5000);
    return () => clearInterval(timer);
  }, [account, roleKey]);
  useEffect(() => {
    if (!account || page === "dashboard" || page === "ai" || page === "admin") {
      setModuleLoading(false);
      setModuleError("");
      return;
    }
    const controller = new AbortController();
    setModuleLoading(true);
    setModuleError("");
    setModule(null);
    apiFetch(`/modules/${page}`, { signal: controller.signal })
      .then(async (r) => {
        const body = await r.json();
        if (!r.ok)
          throw new Error(body.message || "Modul ma’lumotlari olinmadi.");
        if (!Array.isArray(body.children))
          throw new Error("Modul ma’lumoti noto‘g‘ri formatda keldi.");
        return body;
      })
      .then(setModule)
      .catch((requestError) => {
        if (requestError.name !== "AbortError")
          setModuleError(
            requestError.message || "Modul ma’lumotlari olinmadi.",
          );
      })
      .finally(() => {
        if (!controller.signal.aborted) setModuleLoading(false);
      });
    return () => controller.abort();
  }, [account, page]);
  if (checking)
    return <div className="loading-state">Sessiya tekshirilmoqda…</div>;
  if (!account)
    return (
      <Login
        onLogin={(user) => {
          setAccount(user);
          setPage("dashboard");
        }}
      />
    );
  return (
    <>
      <AppLayout
        role={role}
        page={page}
        setPage={setPage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        navigation={nav}
        onLogout={async () => {
          try {
            await apiFetch("/auth/logout", { method: "POST" });
          } finally {
            setSession(null);
            setAccount(null);
            setDashboard(null);
          }
        }}
      >
          {error && (
            <div className="api-error">
              <span>{error}</span>
              <button onClick={() => window.location.reload()}>
                Qayta urinish
              </button>
            </div>
          )}
          {loading && !dashboard && (
            <div className="loading-state">Ma’lumotlar yuklanmoqda...</div>
          )}
          {moduleLoading && (
            <div className="loading-state">Bo‘lim yuklanmoqda...</div>
          )}
          {moduleError && !moduleLoading && (
            <div className="api-error">
              <span>{moduleError}</span>
              <button onClick={() => window.location.reload()}>
                Qayta urinish
              </button>
            </div>
          )}
          {page === "dashboard" && dashboard && (
            <Dashboard
              data={dashboard}
              role={role}
              setPage={setPage}
              onCreate={() => setModal(true)}
            />
          )}{" "}
          {page === "ai" && (
            <PageErrorBoundary key={`ai-${roleKey}`}>
              <AIAssistant dashboard={dashboard} roleKey={roleKey} />
            </PageErrorBoundary>
          )}{" "}
          {page === "admin" && <TelegramAdmin />}{" "}
          {page !== "dashboard" &&
            page !== "ai" &&
            page !== "admin" &&
            !moduleLoading &&
            !moduleError &&
            module && (
              <ModulePage
                key={page}
                type={page}
                data={module}
                onCreate={() => setModal(true)}
              />
            )}

      </AppLayout>
      {modal && (
        <CreateModal
          onClose={() => setModal(false)}
          onSaved={async () => {
            const r = await apiFetch("/dashboard");
            if (r.ok) setDashboard(await r.json());
            setModal(false);
          }}
        />
      )}
    </>
  );
}
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
