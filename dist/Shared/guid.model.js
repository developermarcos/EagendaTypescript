export class Guid {
    geradorNovoId() {
        const dateStr = Date.now().toString(26);
        const randomStr = Math.random().toString(36).substring(2, 8);
        return `${dateStr}-${randomStr}`;
    }
}
