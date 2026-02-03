/**
 * H5 项目统一请求封装
 * 对接后端接口时在此处理：baseURL、token、错误码、超时等
 */

const DEFAULT_TIMEOUT = 15000

export type RequestConfig = {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
}

function getBaseURL(): string {
  // 优先使用环境变量，便于开发/测试/生产切换
  return import.meta.env.VITE_API_BASE_URL || ''
}

function getToken(): string | null {
  // 从 localStorage / 内存 等读取 token，对接时按你们鉴权方式改
  return localStorage.getItem('token')
}

export interface ApiResponse<T = unknown> {
  code: number
  message?: string
  data: T
}

async function request<T = unknown>(
  url: string,
  options: RequestInit & { timeout?: number } = {}
): Promise<ApiResponse<T>> {
  const baseURL = getBaseURL()
  const fullURL = url.startsWith('http') ? url : `${baseURL}${url}`
  const timeout = options.timeout ?? DEFAULT_TIMEOUT
  const token = getToken()

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  try {
    const res = await fetch(fullURL, {
      ...options,
      headers,
      signal: controller.signal,
    })
    clearTimeout(timer)

    const json = (await res.json().catch(() => ({}))) as ApiResponse<T>

    if (!res.ok) {
      // 按你们后端约定处理 401、403、业务 code 等
      if (res.status === 401) {
        // 未登录或 token 过期，可跳转登录或清 token
        localStorage.removeItem('token')
      }
      throw new Error(json.message || `请求失败 ${res.status}`)
    }

    // 若后端用 code 表示业务成功/失败
    if (json.code !== undefined && json.code !== 0) {
      throw new Error(json.message || '业务错误')
    }

    return json
  } catch (e) {
    clearTimeout(timer)
    if (e instanceof Error) throw e
    throw new Error('网络异常')
  }
}

export const api = {
  get<T = unknown>(url: string, params?: Record<string, string>, config?: RequestConfig) {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return request<T>(`${url}${query}`, { method: 'GET', ...config })
  },
  post<T = unknown>(url: string, data?: unknown, config?: RequestConfig) {
    return request<T>(url, { method: 'POST', body: data ? JSON.stringify(data) : undefined, ...config })
  },
  put<T = unknown>(url: string, data?: unknown, config?: RequestConfig) {
    return request<T>(url, { method: 'PUT', body: data ? JSON.stringify(data) : undefined, ...config })
  },
  delete<T = unknown>(url: string, config?: RequestConfig) {
    return request<T>(url, { method: 'DELETE', ...config })
  },
}

export default api
