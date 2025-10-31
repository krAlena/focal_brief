import { useRef, useState, useEffect } from "react";

interface TimerTrackerOptions {
    initialSeconds?: number;
}

export class TimerTracker {
    private startTime: number = 0;
    private elapsed: number = 0;
    private timerId: NodeJS.Timeout | null = null;
    private paused: boolean = false;
    private initialSeconds: number;
    private working: boolean = false;

    constructor(options?: { initialSeconds?: number }) {
        this.initialSeconds = options?.initialSeconds ?? 0;
        this.elapsed = 0;
        // this.initialSeconds;
    }

    getInitialSeconds(): number {
        return this.initialSeconds || 0;
    }

    start() {
        if (this.timerId) return; // already running
        this.startTime = Date.now();
        this.paused = false;
        this.working = true;
        this.timerId = setInterval(() => {}, 1000); // interval not needed for logic, only for UI update
    }

    pause() {
        if (this.paused || !this.timerId) return;
        this.paused = true;
        this.working = false;
        // Accumulate elapsed time up to now
        // this.elapsed += Math.floor((Date.now() - this.startTime) / 1000);
        // this.initialSeconds = this.elapsed; // Update initialSeconds to match total elapsed
        this.initialSeconds = this.elapsed +  Math.floor((Date.now() - this.startTime) / 1000);
        this.elapsed = 0;
        this.startTime = 0;
        clearInterval(this.timerId!);
        this.timerId = null;
    }

    stop() {
        this.paused = false;
        this.working = false;
        this.elapsed = this.initialSeconds + Math.floor((Date.now() - this.startTime) / 1000);
        this.startTime = 0;
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    isWorking(): boolean {
        return this.working;
    }

    getValue(): number {
        if (this.timerId && !this.paused && this.startTime) {
            return this.initialSeconds + this.elapsed + Math.floor((Date.now() - this.startTime) / 1000);
        }
        return this.initialSeconds + this.elapsed;
    }

    getFormattedValue(additionalSec: number = 0): string {
        let totalSeconds = this.getValue();
        totalSeconds += additionalSec;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return [hours, minutes, seconds]
            .map(unit => String(unit).padStart(2, '0'))
            .join(':');
    }
}