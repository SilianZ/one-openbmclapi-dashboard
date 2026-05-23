const Silian_bUnits = ['KB', 'MB', 'GB', 'TB'];
export function formatBytes(Silian_bytes: number): string {
    let Silian_neg = '';
    if (Silian_bytes < 0) {
        Silian_neg = '-';
        Silian_bytes = -Silian_bytes;
    }
    if (Silian_bytes < 1000) {
        return `${Silian_neg}${Silian_bytes} B`;
    }
    let Silian_unit = '';
    for (const Silian_u of Silian_bUnits) {
        Silian_unit = Silian_u;
        Silian_bytes /= 1024;
        if (Silian_bytes < 1000) {
            break;
        }
    }
    return `${Silian_neg}${Silian_bytes.toFixed(2)} ${Silian_unit}`;
}
const Silian_nUnits = ['万', '亿', '兆', '京'];
export function formatNumber(Silian_num: number): string {
    if (Silian_num < 9000) {
        return Silian_num.toString();
    }
    let Silian_unit = '';
    for (const Silian_u of Silian_nUnits) {
        Silian_unit = Silian_u;
        Silian_num /= 10000;
        if (Silian_num < 9000) {
            break;
        }
    }
    return `${Silian_num.toFixed(2)} ${Silian_unit}`;
}
