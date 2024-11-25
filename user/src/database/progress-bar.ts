export class ProgressBar {
    private readonly frames: string[] = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    private startTime: number | null = null
    private readonly width: number
    private readonly total: number

    constructor(total: number, width: number = 30) {
        this.total = total
        this.width = width
    }

    private formatTime(seconds: number): string {
        if (seconds === Infinity) return 'calculating...'

        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = Math.floor(seconds % 60)
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    private createProgressBar(current: number): string {
        // Initialize start time on first call
        if (this.startTime === null) {
            this.startTime = Date.now()
        }

        const percentage = (current / this.total) * 100
        const progress = Math.round((this.width * current) / this.total)
        const emptyProgress = this.width - progress
        const progressText = '█'.repeat(progress)
        const emptyProgressText = '░'.repeat(emptyProgress)
        const spinner = this.frames[current % this.frames.length]

        // Calculate ETA
        const elapsedTime = (Date.now() - this.startTime) / 1000 // in seconds
        const rate = current / elapsedTime // items per second
        const remainingItems = this.total - current
        const eta = rate > 0 ? remainingItems / rate : Infinity

        return `${spinner} [${progressText}${emptyProgressText}] ${percentage.toFixed(
            2
        )}% | ETA: ${this.formatTime(eta)}`
    }

    async update(current: number): Promise<void> {
        process.stdout.clearLine(0)
        process.stdout.cursorTo(0)
        process.stdout.write(this.createProgressBar(current))
    }

    reset(): void {
        this.startTime = null
    }

    finish(): void {
        process.stdout.write('\nDone!\n')
    }
}
