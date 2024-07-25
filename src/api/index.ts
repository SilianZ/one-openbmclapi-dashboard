import axios from "axios";

export interface StatsData {
	hits: number,
	bytes: number
}

export interface Stats {
	hours: StatsData[]
	days: StatsData[]
	months: StatsData[]
}

export interface StatsRes {
    startTime: number, // UTC time
	stats: Stats,
	prevStats: Stats,
}

export async function fetchStat(): Promise<StatsRes> {
    const res = await axios.get<StatsRes>('localhost:3000/status')
	return res.data
}