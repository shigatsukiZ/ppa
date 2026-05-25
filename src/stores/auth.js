import { reactive } from 'vue'

const API = ''

export const auth = reactive({
  user: null,
  merchant: null,
  admin: null,
  merchantToken: null,
  adminToken: null,
})

export function isLoggedIn(role) {
  if (role === 'merchant') return !!auth.merchant
  if (role === 'admin') return !!auth.admin
  return !!auth.user
}

export function getToken(role) {
  if (role === 'merchant') return auth.merchantToken
  if (role === 'admin') return auth.adminToken
  return null
}

async function handleAuthResponse(res, loginFn) {
  if (!res.ok) {
    let msg = `请求失败 (${res.status})`
    try { const body = await res.json(); msg = body.error || msg } catch {}
    throw new Error(msg)
  }
  const data = await res.json()
  loginFn(data)
  return data
}

export async function merchantLogin(username, password) {
  return handleAuthResponse(
    await fetch(`${API}/api/auth/merchant/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }),
    (data) => { auth.merchant = data.merchant; auth.merchantToken = data.token }
  )
}

export async function adminLogin(username, password) {
  return handleAuthResponse(
    await fetch(`${API}/api/auth/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }),
    (data) => { auth.admin = data.admin; auth.adminToken = data.token }
  )
}

export function merchantLogout() {
  auth.merchant = null
  auth.merchantToken = null
}

export function adminLogout() {
  auth.admin = null
  auth.adminToken = null
}

async function apiFetch(path, options = {}) {
  const token = auth.merchantToken || auth.adminToken
  const headers = { ...options.headers }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${API}${path}`, { ...options, headers })
  if (!res.ok) {
    let msg = `请求失败 (${res.status})`
    try { const body = await res.json(); msg = body.error || msg } catch {}
    throw new Error(msg)
  }
  return res.json()
}

export async function apiGet(path) {
  return apiFetch(path)
}

export async function apiPost(path, body) {
  return apiFetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
}

export async function apiPut(path, body) {
  return apiFetch(path, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
}

export async function apiDelete(path) {
  return apiFetch(path, { method: 'DELETE' })
}
