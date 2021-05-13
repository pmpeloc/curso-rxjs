import { Observable, Observer } from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log('Next: ', value),
    error: error => console.warn('Error: ', error),
    complete: () => console.info('Completado')
};

const intervalo$ = new Observable<number>(subs => {
    // Crear un contador: 1,2,3,4...
    let contador = 0;
    const interval = setInterval(() => {
        // Cada segundo
        contador++;
        subs.next(contador);
        console.log(contador);
    }, 1000);

    setTimeout(() => {
        subs.complete();
    }, 2500);

    return () => {
        clearInterval(interval);
        console.log('Intérvalo destruido');
    }
});

const subs1 = intervalo$.subscribe(observer);
const subs2 = intervalo$.subscribe(observer);
const subs3 = intervalo$.subscribe(observer);

subs1.add(subs2)
     .add(subs3);

setTimeout(() => {
    subs1.unsubscribe();
    // subs2.unsubscribe();
    // subs3.unsubscribe();
    console.log('Completado timeout');
}, 6000);