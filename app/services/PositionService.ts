import { BehaviorSubject } from 'rxjs';

class PositionService {
    private currentLocationSubject = new BehaviorSubject<number | null>(null);
    currentLocation$ = this.currentLocationSubject.asObservable();

    updateLocation(location: number) {
        this.currentLocationSubject.next(location);
    }
}

const positionService = new PositionService();
export default positionService;