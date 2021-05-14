import { fromEvent, range } from 'rxjs';
import { map, mapTo, pluck } from 'rxjs/operators';

// range(1,5).pipe(
//     map<number, number>(val => val *10)
// )
// .subscribe(console.log);

const keyup$ = fromEvent<KeyboardEvent>(document, 'keyup');
const keyupCode$ = keyup$.pipe(
    map(event => event.code)
);

const keyUpPluck$ = keyup$.pipe(
    pluck('target', 'baseURI')
);

const keyupMapTo$ = keyup$.pipe(
    mapTo('Tecla presionada')
);

keyup$.subscribe(console.log);
keyupCode$.subscribe(code => console.log('map: ', code));
keyUpPluck$.subscribe(code => console.log('pluck: ', code));
keyupMapTo$.subscribe(code => console.log('map to: ', code));