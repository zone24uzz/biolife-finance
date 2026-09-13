export const ACCESS_DENIED_MESSAGE = "Bu ma’lumot sizning joriy lavozimingiz va bo‘limingiz uchun mavjud emas.";

const profiles = {
  ceo: { department: "executive", permissions: ["company.overview.read","company.risks.read","company.kpi.read","production.analytics.read","warehouse.analytics.read","sales.analytics.read","purchases.analytics.read","cash.analytics.read","finance.analytics.read","budget.analytics.read","production.records.write","warehouse.records.write","sales.records.write","purchases.records.write","cash.records.write","finance.records.write","budget.records.write","admin.access"] },
  accountant: { department: "finance", permissions: ["finance.data.read","finance.analytics.read","finance.risks.read","finance.records.write","cash.data.read","cash.analytics.read","cash.risks.read","cash.records.write"] },
  warehouse_manager: { department: "warehouse", permissions: ["warehouse.data.read","warehouse.analytics.read","warehouse.risks.read","warehouse.records.write"] },
  production_manager: { department: "production", permissions: ["production.data.read","production.analytics.read","production.risks.read","production.records.write"] },
  sales_manager: { department: "sales", permissions: ["sales.data.read","sales.analytics.read","sales.risks.read","sales.records.write"] },
  purchase_manager: { department: "purchases", permissions: ["purchases.data.read","purchases.analytics.read","purchases.risks.read","purchases.records.write"] },
  auditor: { department: "audit", permissions: ["audit.data.read","audit.analytics.read","audit.risks.read","production.audit.read","warehouse.audit.read","sales.audit.read","purchases.audit.read","cash.audit.read","finance.audit.read","budget.audit.read"] },
};

export function accessProfile(user = {}) {
  const base = profiles[user.role] || { department: "restricted", permissions: [] };
  return { department: base.department, permissions: [...base.permissions] };
}

export function canAccess(user, resource) {
  return Boolean(resource && accessProfile(user).permissions.includes(resource));
}

export function publicAccessFields(user) {
  const profile = accessProfile(user);
  return { department: profile.department, permissions: profile.permissions };
}

export const AI_DEPARTMENTS = ["production","warehouse","sales","purchases","cash","finance","budget"];

export function readableAIResources(user) {
  const profile = accessProfile(user);
  if (user?.role === "ceo") return AI_DEPARTMENTS.filter((key) => canAccess(user, `${key}.analytics.read`));
  return AI_DEPARTMENTS.filter((key) => key === profile.department || (profile.department === "finance" && key === "cash"))
    .filter((key) => canAccess(user, `${key}.data.read`) || canAccess(user, `${key}.analytics.read`));
}
