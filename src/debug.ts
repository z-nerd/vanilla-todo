const InitDebug = (root: HTMLDivElement, enable: boolean = true) => {
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

    return { dLog }
}


export default InitDebug