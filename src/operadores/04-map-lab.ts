import { fromEvent } from "rxjs";
import { map, tap } from "rxjs/operators";

const texto = document.createElement('div');
texto.innerHTML = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac commodo justo, quis dignissim leo. Curabitur consectetur nunc at feugiat finibus. Donec arcu risus, hendrerit dignissim magna ut, scelerisque consectetur sem. Nam ullamcorper enim id lectus bibendum, sit amet aliquam lectus efficitur. Sed mattis ligula nulla, quis ullamcorper neque interdum a. Sed porttitor massa sed egestas facilisis. Nam elit libero, mattis at ultricies sed, vestibulum a sapien. Sed gravida magna finibus diam pellentesque, ac euismod tortor tempus. Duis finibus neque dolor, non lacinia tellus porta sit amet. Phasellus tristique convallis bibendum. Nulla et risus velit. Integer id justo quis nunc ultricies pulvinar. Integer ultrices venenatis nisl id elementum. Vestibulum rutrum in massa eu dictum. Fusce porta egestas urna, eget egestas enim viverra id. Aliquam sodales, elit vitae ornare semper, risus elit tempus metus, id facilisis erat mauris et nibh.
<br/><br/>
Sed aliquet, orci at tristique ultricies, enim ipsum pretium odio, ac commodo tortor elit a nisl. In pretium feugiat mollis. Phasellus condimentum libero in velit viverra, sit amet aliquam ligula consequat. Sed et nibh ante. Sed maximus, dui eget semper fringilla, nibh neque efficitur eros, sit amet fringilla neque nunc pellentesque ex. Pellentesque ligula orci, volutpat eget euismod at, tempor in arcu. Morbi dignissim, libero eu mollis posuere, leo purus imperdiet sem, sit amet bibendum nisl nulla sed purus. Ut et justo in felis maximus tincidunt.
<br/><br/>
Suspendisse a bibendum massa, a sollicitudin risus. Maecenas faucibus urna nisl, eget mattis nulla aliquam at. Vivamus nec est interdum, pretium mi eget, tristique est. Donec et risus aliquet, posuere justo vitae, tincidunt erat. Duis maximus magna sit amet euismod semper. Sed iaculis luctus turpis, a cursus ligula. Nam risus erat, aliquet nec lacinia nec, gravida non purus. Suspendisse potenti. Nunc odio nunc, luctus at venenatis iaculis, viverra vitae tellus. Integer venenatis nisi vel sem vestibulum tristique. Sed ullamcorper metus vel venenatis varius. In accumsan velit eget feugiat blandit. Maecenas malesuada ultricies condimentum. Donec a sem hendrerit, sollicitudin eros vitae, tempor leo.
<br/><br/>
Nulla sed sem lacus. Sed massa metus, iaculis at elit in, porttitor porttitor orci. In arcu nisl, congue vitae ex nec, feugiat aliquet ex. Sed a libero rutrum, sodales massa quis, dictum metus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In justo magna, egestas vel tortor a, feugiat congue velit. Sed quis aliquet risus.
<br/><br/>
Etiam accumsan egestas tortor, non tincidunt ante tempor non. Aenean vulputate massa ligula, id maximus nisi luctus a. Phasellus tristique quam a lorem convallis, at molestie lacus tincidunt. Curabitur et justo euismod, sagittis purus ut, tempus neque. Nam commodo neque laoreet, hendrerit est vel, blandit ante. Nulla ac turpis sed urna luctus convallis. Sed tortor mauris, elementum a felis at, luctus finibus metus. Quisque ut vehicula quam, at ultrices turpis. Mauris posuere ante magna, et euismod felis eleifend sed. Nam at nisi sit amet ex lacinia ullamcorper. Vivamus velit ligula, rhoncus a neque vitae, blandit condimentum nunc. Aenean feugiat vestibulum posuere. Curabitur aliquet metus commodo eros convallis, at venenatis metus interdum. Mauris dignissim metus augue, a bibendum purus blandit nec. Aliquam erat volutpat.
`;

const body = document.querySelector('body');
body.append(texto);

const progressBar = document.createElement('div');
progressBar.setAttribute('class', 'progress-bar');
body.append(progressBar);

// función que haga el cálculo
const calcularPorcentajeScroll = (event) => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = event.target.documentElement;
    
    return (scrollTop / (scrollHeight - clientHeight)) * 100;
};

// Streams
const scroll$ = fromEvent(document, 'scroll');
// scroll$.subscribe(console.log);

const progress$ = scroll$.pipe(
    // map(event => calcularPorcentajeScroll(event))
    map(calcularPorcentajeScroll),
    tap(console.log)
);

progress$.subscribe(porcentaje => {
    progressBar.style.width = `${porcentaje}%`
});