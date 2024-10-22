// src/services/PositionService.ts
import { BehaviorSubject } from 'rxjs';

interface Position {
    x: number;
    y: number;
}

class PositionService {
    private currentLocationSubject = new BehaviorSubject<Position | null>(null);
    public currentLocation$ = this.currentLocationSubject.asObservable();

    updatePosition(position: Position) {
        this.currentLocationSubject.next(position);
    }
}

const positionService = new PositionService();
export default positionService;
