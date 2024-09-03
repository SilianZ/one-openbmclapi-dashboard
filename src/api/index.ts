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
    cpuType: string
    pythonVersion: string
    apiVersion: string
    version: string
}

export async function fetchStat() {
    const res = await axios.get<StatsRes>('/api/status')
    console.log(res.data)
    return res.data
}
