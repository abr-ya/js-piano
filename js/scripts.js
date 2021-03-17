const main = () => {
    const showNotes = true;
    const notes = document.getElementsByClassName('note');
    const keyForPlay = ['D', 'F', 'G', 'H', 'J', 'K', 'L', 'R', 'T', 'U', 'I', 'O'];
    const noteId = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C#', 'D#', 'F#', 'G#', 'A#'];

    const setLetters = (notes) => {
        let count = 0;
    
        // снизу
        const lettersBottom = document.getElementsByClassName('letter-bottom');
        for (let item of lettersBottom) {
            item.innerHTML = notes ? noteId[count] : keyForPlay[count];
            count++;
        };
    
        // сверху
        const lettersTop = document.getElementsByClassName('letter-top');
        for (let item of lettersTop) {
            item.innerHTML = notes ? noteId[count] : keyForPlay[count];
            count++;
        };
    };

    setLetters(showNotes);

    // нажали мышку
    const clickHandler = (e) => {
        const key = e.target;
        notePlay(key.dataset.note);
    }

    // навели мышку
    const overHandler = (e) => {
        if (e.buttons && e.relatedTarget.classList.contains('note')) {
            const key = e.target;
            notePlay(key.dataset.note);
        }
    }

    // нажали клавишу
    document.addEventListener("keydown", (e) => {
        if (keyForPlay.includes(e.code[3])) {
            const index = keyForPlay.findIndex(el => el === e.code[3]);
            notePlay(noteId[index]);
        }
    });
    
    const notePlay = (id, duration = 0.8) => {
        const key = document.getElementById(`key${id}`);
        key.classList.add('active');
        let note = document.getElementById(id);
        note.currentTime = 0; // перемотка к началу семпла
        note.play();
        // note.addEventListener('ended', () => {key.classList.remove('active')});
        setTimeout(() => {
            note.pause();
            key.classList.remove('active');
        }, duration * 1000);
    }

    // вешаем обработчкики мышки
    for (let item of notes) {
        item.addEventListener('mousedown', clickHandler);
        item.addEventListener('mouseover', overHandler);
    }
}

document.addEventListener('DOMContentLoaded', main);