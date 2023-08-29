type dLogType = (msg: any) => void

/**
 * Log message on DOM(Usefull for debugin in mobile).
 * @param {HTMLDivElement} root - DOM reference for injecting logs.
 * @param {boolean} enable - Approver for injection(default true).
 * @returns {dLogType} - A function to log content in dom
 */
const InitDebug = (root: HTMLElement, enable: boolean = true): dLogType => {
    const debugEl = document.createElement('div') as HTMLDivElement
    debugEl.setAttribute('class', 'debug')

    if (enable) root.appendChild(debugEl)

    const dLog = (msg: any) => {
        const logEl = document.createElement('pre') as HTMLPreElement
        logEl.setAttribute('class', 'debug_log')
        if (typeof msg === 'object')
            logEl.textContent = JSON.stringify(msg, null, 2)
        else
            logEl.textContent = msg
        debugEl.appendChild(logEl)
    }

    return dLog
}


export default InitDebug