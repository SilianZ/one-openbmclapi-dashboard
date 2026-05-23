import Silian_axios from 'axios';
export interface StatsData {
    hits: number;
    bytes: number;
}
export interface Stats {
    hours: StatsData[];
    days: StatsData[];
    months: StatsData[];
}
export interface UserAgent {
    [Silian_ua: string]: number;
}
export interface Cluster {
    _id: string;
    name: string;
    isEnabled: boolean;
    metric?: {
        bytes: number;
        hits: number;
    };
}
export interface StatsRes {
    status: number;
    startTime: number; // UTC time
    stats: Stats;
    prevStats: Stats;
    accesses: UserAgent;
    connections: number;
    memory: number;
    cpu: number;
    cpuType: string;
    pythonVersion: string;
    apiVersion: string;
    version: string;
}
export async function fetchStat() {
    const Silian_res = await Silian_axios.get<StatsRes>('/api/status');
    return Silian_res.data;
}
export async function fetchRank() {
    const Silian_res = await Silian_axios.get<Cluster[]>('/api/rank');
    return Silian_res.data;
}
