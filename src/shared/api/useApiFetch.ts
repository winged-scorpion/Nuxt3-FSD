import type { DebugLog } from '~/shared/model/useFetchDebugModel'
import useDebugStore from '~/shared/store/useFetchDebug'

export async function useApiFetch<T>(path: string, options = {}) {
  const config = useRuntimeConfig()
  const debugStore = useDebugStore()
  // const { token } = useAuth()

  console.log(options)

  const requestId = `id${Math.random().toString(16).slice(2)}`

  const debugLog: DebugLog = {
    id: requestId,
    type: 'get',
    ssr: true,
    path: path.toString(),
    dateFrom: new Date(),
    dateTo: null,
    options,
    status: null,
  }

  // if (process.client) {
  //   debugLog.ssr = false
  // }

  // if (token && token.value) {
  //   /** @ts-ignore */
  //   if (!options.headers) {
  //     /** @ts-ignore */
  //     options.headers = {}
  //   }
  //   /** @ts-ignore */
  //   options.headers = Object.assign({}, options.headers, {
  //     Authorization: token.value,
  //   })
  // }

  let responseStatus = 0
  let responseError = null
  try {
    const response = await $fetch<T>(path, {
      ...options,
      baseURL: config.public.apiUrl,
      async onRequest({ request, options }) {
        options.cache = 'no-cache'
      },
      async onRequestError({ request, options, error }) {
        console.log('[ERROR response]', request, error)
        debugLog.dateTo = new Date()
        debugLog.status = 500
        await debugStore.addToLog(debugLog)
      },
      async onResponse({ request, response, options }) {
        responseStatus = response.status

        debugLog.dateTo = new Date()
        debugLog.status = response.status
        await debugStore.addToLog(debugLog)
      },
      async onResponseError({ request, response, options }) {
        responseStatus = response.status
        responseError = response
        debugLog.dateTo = new Date()
        debugLog.status = response.status
        await debugStore.addToLog(debugLog)
      },
    })

    return { data: response, error: null, status: responseStatus }
  }
  catch (error) {
    return { data: responseError?._data, error, status: error.status }
  }
}
