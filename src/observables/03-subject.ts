import { Observable, Observer, Subject } from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log('Next: ', value),
    error: error => console.warn('Error: ', error),
    complete: () => console.info('Completado')
};

const intervalo$ = new Observable<number>(subs => {
    const intervalId = setInterval(() => subs.next(Math.random()), 1000);
    return () => {
        clearInterval(intervalId);
        console.log('Intervalo destruido');
    }
});

/**
 * 1- Casteo múltiple (muchas subs al mismo observable)
 * 2- También es un observer
 * 3- Next, error y complete
 */

const subject$ = new Subject();

const subscription = intervalo$.subscribe(subject$);

// const subs1 = intervalo$.subscribe(rnd => console.log('subs1', rnd));
// const subs2 = intervalo$.subscribe(rnd => console.log('subs2', rnd));

const subs1 = subject$.subscribe(observer);
const subs2 = subject$.subscribe(observer);

setTimeout(() => {
    subject$.next(10);
    subject$.complete();
    subscription.unsubscribe();
}, 3500);