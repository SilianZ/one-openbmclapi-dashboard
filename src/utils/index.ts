const bUnits = ['KB', 'MB', 'GB', 'TB']

export function formatBytes(bytes: number): string {
    let neg = ''
    if (bytes < 0) {
        neg = '-'
        bytes = -bytes
    }
    if (bytes < 1000) {
        return `${neg}${bytes} B`
    }
    let unit = ''
    for (const u of bUnits) {
        unit = u
        bytes /= 1024
        if (bytes < 1000) {
            break
        }
    }
    return `${neg}${bytes.toFixed(2)} ${unit}`
}

const nUnits = ['万', '亿', '兆', '京']

export function formatNumber(num: number): string {
    if (num < 9000) {
        return num.toString()
    }
    let unit = ''
    for (const u of nUnits) {
        unit = u
        num /= 10000
        if (num < 9000) {
            break
        }
    }
    return `${num.toFixed(2)} ${unit}`
}
