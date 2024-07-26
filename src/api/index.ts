import axios from 'axios'

export interface StatsData {
    hits: number
    bytes: number
}

export interface Stats {
    hours: StatsData[]
    days: StatsData[]
    months: StatsData[]
}

export interface StatsRes {
    startTime: number // UTC time
    stats: Stats
    prevStats: Stats
}

export async function fetchStat() {
    const res = await axios.get<StatsRes>('http://127.0.0.1:3000/status')
    console.log(res.data)
    return res.data
}
