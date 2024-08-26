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

export interface UserAgent {
    [ua: string]: number
}

export interface StatsRes {
    status: number
    startTime: number // UTC time
    stats: Stats
    prevStats: Stats
    accesses: UserAgent
    connections: number
    memory: number
    cpu: number
}

export async function fetchStat() {
    const res = await axios.get<StatsRes>('http://127.0.0.1:3000/status')
    console.log(res.data)
    return res.data
}
