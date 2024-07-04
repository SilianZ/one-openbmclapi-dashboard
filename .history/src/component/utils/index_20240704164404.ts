export interface StatsData {
	hits: number,
	bytes: number
}

const bUnits = ['KB', 'MB', 'GB', 'TB']

export function formatBytes(bytes: number): string {
	var neg = ''
	if (bytes < 0) {
		neg = '-'
		bytes = -bytes
	}
	if (bytes < 1000) {
		return `${neg}${bytes} B`
	}
	var unit = ''
	for (const u of bUnits) {
		unit = u
		bytes /= 1024
		if (bytes < 1000) {
			break
		}
	}
	return `${neg}${bytes.toFixed(2)} ${unit}`
}