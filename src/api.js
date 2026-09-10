export const API = import.meta.env.VITE_API_URL || "/api/v1";
export const getToken = () => localStorage.getItem("biolife-token") || "";
export const setSession = (session) => {
  if (session?.token) localStorage.setItem("biolife-token", session.token);
  else localStorage.removeItem("biolife-token");
};
export async function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers || {}),
    token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(
    path.startsWith("http") ? path : `${API}${path}`,
    { ...options, headers },
  );
  if (response.status === 401 && token) {
    localStorage.removeItem("biolife-token");
    window.dispatchEvent(new Event("biolife-auth-expired"));
  }
  return response;
}
