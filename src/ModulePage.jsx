import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  Eye,
  FileText,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import "./module.css";
import { apiFetch } from "./api.js";

const titleMap = {
  production: "Ishlab chiqarish",
  warehouse: "Ombor",
  sales: "Sotuv",
  purchases: "Xarid",
  cash: "Kassa va bank",
  finance: "Moliya",
  budget: "Byudjet",
  ai: "AI moliyaviy tahlilchi",
};

function Editor({ type, section, sectionName, initial, onClose, onSaved }) {
  const [row, setRow] = useState(
      initial ? [...initial] : ["", "", "", "", "Qoralama", ""],
    ),
    [error, setError] = useState(""),
    [saving, setSaving] = useState(false);
  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const suffix = initial ? "/" + encodeURIComponent(initial[0]) : "";
      const r = await apiFetch(
        `/modules/${type}/records${suffix}?section=${section}`,
        {
          method: initial ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ row }),
        },
      );
      const body = await r.json();
      if (!r.ok) throw new Error(body.message || "Saqlash xatosi.");
      await onSaved();
      onClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="modal-backdrop">
      <form
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Yozuv"
        onSubmit={save}
      >
        <div className="modal-head">
          <h2>{sectionName}</h2>
          <button
            type="button"
            aria-label="Yopish"
            disabled={saving}
            onClick={onClose}
          >
            <X />
          </button>
        </div>
        {[
          "Kod (bo‘sh bo‘lsa avtomatik)",
          "Nomi",
          "Sana / kategoriya",
          "Qiymat",
          "Holat",
        ].map((label, i) => (
          <label key={i}>
            {label}
            <input
              required={i === 1}
              maxLength={500}
              readOnly={i === 0 && !!initial}
              value={row[i]}
              onChange={(e) =>
                setRow((r) => r.map((v, j) => (j === i ? e.target.value : v)))
              }
            />
          </label>
        ))}
        <label>
          Tavsif / description
          <textarea
            maxLength={2000}
            value={row[5] || ""}
            onChange={(e) =>
              setRow((r) => r.map((v, j) => (j === 5 ? e.target.value : v)))
            }
            placeholder="Yozuv haqida to‘liq ma’lumot"
          />
        </label>
        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}
        <button className="primary" disabled={saving}>
          {saving ? "Saqlanmoqda…" : "Saqlash"}
        </button>
      </form>
    </div>
  );
}
function Detail({
  row,
  type,
  section,
  sectionName,
  onClose,
  onDeleted,
  onEdit,
}) {
  const [deleting, setDeleting] = useState(false),
    [error, setError] = useState("");
  const remove = async () => {
    if (!window.confirm(`“${row[1]}” yozuvi o‘chirilsinmi?`)) return;
    setDeleting(true);
    try {
      const r = await apiFetch(
        `/modules/${type}/records/${encodeURIComponent(row[0])}?section=${section}`,
        { method: "DELETE" },
      );
      const body = await r.json();
      if (!r.ok) throw new Error(body.message || "O‘chirish xatosi.");
      await onDeleted();
      onClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div className="modal-backdrop">
      <div className="modal detail-modal">
        <div className="modal-head">
          <div>
            <span className="eyebrow">
              YOZUV DETAILI / {type.toUpperCase()}
            </span>
            <h2>{row[1]}</h2>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={19} />
          </button>
        </div>
        <div className="detail-status">
          <span className="status">{row[4]}</span>
          <span>{row[0]}</span>
        </div>
        <div className="detail-grid">
          {[
            ["Kod / raqam", row[0]],
            ["Nomi", row[1]],
            ["Sana / kategoriya", row[2]],
            ["Summa / miqdor", row[3]],
            ["Holat", row[4]],
            ["Bo‘lim", sectionName || section],
            ["Tavsif / description", row[5] || "Tavsif kiritilmagan"],
          ].map(([k, v]) => (
            <div key={k}>
              <small>{k}</small>
              <strong>{v || "—"}</strong>
            </div>
          ))}
        </div>
        <div className="detail-timeline">
          <Activity size={16} />
          <span>Yozuv markaziy ma’lumotlar bazasiga saqlangan.</span>
        </div>
        {error && <p role="alert">{error}</p>}
        <div className="detail-actions">
          <button className="outline" onClick={() => onEdit(row)}>
            Tahrirlash
          </button>
          <button className="outline" onClick={onClose}>
            <Eye size={15} /> Yopish
          </button>
          <button className="danger" disabled={deleting} onClick={remove}>
            <Trash2 size={15} /> {deleting ? "O‘chirilmoqda..." : "O‘chirish"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ModulePage({ type, data: initialData, onCreate }) {
  const [data, setData] = useState(initialData);
  const [active, setActive] = useState(0),
    [query, setQuery] = useState(""),
    [selected, setSelected] = useState(null),
    [editor, setEditor] = useState(null),
    [version, setVersion] = useState(0);
  const children = Array.isArray(data?.children) ? data.children : [];
  const selectedRows = Array.isArray(data?.sectionRows?.[active])
    ? data.sectionRows[active]
    : Array.isArray(data?.rows)
      ? data.rows
      : [];
  const rows = useMemo(
    () =>
      selectedRows.filter((r) =>
        r.join(" ").toLowerCase().includes(query.toLowerCase()),
      ),
    [selectedRows, query, version],
  );
  const analytics = {
    total: selectedRows.length,
    statuses: selectedRows.reduce(
      (a, r) => ({
        ...a,
        [r[4] || "Noma’lum"]: (a[r[4] || "Noma’lum"] || 0) + 1,
      }),
      {},
    ),
  };
  const exportCsv = () => {
    const csv = rows
      .map((r) =>
        r
          .map(
            (v) =>
              '"' +
              String(v)
                .replace(/^[=+@-]/, "'")
                .replaceAll('"', '""') +
              '"',
          )
          .join(","),
      )
      .join("\r\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv" }),
      a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `biolife-${type}-${active + 1}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const refresh = async (clearQuery = true) => {
    const r = await apiFetch(`/modules/${type}?section=${active}`);
    const body = await r.json();
    if (!r.ok) throw new Error(body.message || "Yangilash xatosi.");
    setData(body);
    if (clearQuery) setQuery("");
    setVersion((v) => v + 1);
  };
  useEffect(() => {
    const timer = setInterval(() => refresh(false).catch(() => {}), 5000);
    return () => clearInterval(timer);
  }, [type, active]);
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">DEPARTAMENT / {type.toUpperCase()}</span>
          <h1>{titleMap[type]}</h1>
          <p>{children[active] || "Bo‘lim"} bo‘yicha operatsion ma’lumotlar.</p>
        </div>
        <button
          className="primary"
          onClick={() => setEditor({ initial: null })}
        >
          <Plus size={18} /> Yangi: {children[active] || "yozuv"}
        </button>
      </div>
      <div className="module-tabs">
        {children.map((x, i) => (
          <button
            className={i === active ? "tab-active" : ""}
            onClick={() => {
              setActive(i);
              setQuery("");
            }}
            key={x}
          >
            {x}
          </button>
        ))}
      </div>
      <div className="section-analytics">
        <div className="analytics-label">
          <BarChart3 size={17} />
          <span>{children[active] || "Bo‘lim"} analitikasi</span>
        </div>
        <div>
          <strong>{analytics.total || rows.length}</strong>
          <small>Jami yozuv</small>
        </div>
        <div>
          <strong>{Object.keys(analytics.statuses || {}).length}</strong>
          <small>Status turi</small>
        </div>
        <div>
          <strong>{rows.length}</strong>
          <small>Qidiruv natijalari</small>
        </div>
      </div>
      <section className="panel table-panel">
        <div className="table-tools">
          <div className="table-search">
            <Search size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`${children[active] || "Bo‘lim"} ichidan qidirish...`}
            />
          </div>
          <button className="filter-btn" onClick={() => setQuery("")}>
            Filtrni tozalash <X size={14} />
          </button>
          <button className="outline" onClick={exportCsv}>
            <FileText size={15} /> CSV eksport
          </button>
        </div>
        <table>
          <thead>
            <tr>
              {[
                "№ / KOD",
                "NOMI / KONTRAGENT",
                "KATEGORIYA / SANA",
                "SUMMA / MIQDOR",
                "STATUS",
              ].map((x) => (
                <th key={x}>{x}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={i}
                onClick={() => setSelected(r)}
                className="clickable-row"
              >
                {r.slice(0, 5).map((v, j) => (
                  <td key={j}>
                    {j === 0 ? (
                      <strong>{v}</strong>
                    ) : j === 4 ? (
                      <span
                        className={
                          "status " +
                          (String(v).includes("Jarayon") ||
                          String(v).includes("Kam") ||
                          String(v).includes("Qoral")
                            ? "processing"
                            : "")
                        }
                      >
                        {v}
                      </span>
                    ) : (
                      v
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && (
          <div className="empty-note">
            <Activity size={18} />
            <div>
              <strong>Ma’lumot topilmadi</strong>
              <span>Yangi yozuv qo‘shing yoki qidiruvni o‘zgartiring.</span>
            </div>
          </div>
        )}
        <div className="table-foot">
          <span>{rows.length} ta yozuv · Satrlardan birini bosing</span>
        </div>
      </section>
      <div className="empty-note">
        <Eye size={18} />
        <div>
          <strong>To‘liq ma’lumot uchun satrni bosing</strong>
          <span>
            Detail oynasida barcha rekvizitlar va o‘chirish amali mavjud.
          </span>
        </div>
      </div>
      {selected && (
        <Detail
          row={selected}
          type={type}
          section={active}
          onClose={() => setSelected(null)}
          onDeleted={refresh}
          sectionName={children[active]}
          onEdit={(row) => {
            setSelected(null);
            setEditor({ initial: row });
          }}
        />
      )}{" "}
      {editor && (
        <Editor
          type={type}
          sectionName={children[active]}
          initial={editor.initial}
          section={active}
          onClose={() => setEditor(null)}
          onSaved={refresh}
        />
      )}
    </>
  );
}
