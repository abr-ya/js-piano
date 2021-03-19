const main = () => {
    // будем работать с...
    let showNotes = true; // показывать ноты
    const notes = document.getElementsByClassName('note');
    const keyForPlay = ['D', 'F', 'G', 'H', 'J', 'K', 'L', 'R', 'T', 'U', 'I', 'O'];
    const noteId = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C#', 'D#', 'F#', 'G#', 'A#'];
    const modeBtns = document.querySelectorAll('.control button');
    const fsBtn = document.querySelector('#fsbtn');


    // подпись ноты/буквы
    const setLetters = (showNotes) => {
        let count = 0;
    
        // снизу
        const lettersBottom = document.getElementsByClassName('letter-bottom');
        for (let item of lettersBottom) {
            item.innerHTML = showNotes ? noteId[count] : keyForPlay[count];
            count++;
        };
    
        // сверху
        const lettersTop = document.getElementsByClassName('letter-top');
        for (let item of lettersTop) {
            item.innerHTML = showNotes ? noteId[count] : keyForPlay[count];
            count++;
        };
    };

    setLetters(showNotes);


    // управляющие кнопки
    const setBtnClasses = (showNotes) => {
        modeBtns[0].classList.remove('btn-orange', 'btn-light');
        modeBtns[1].classList.remove('btn-orange', 'btn-light');
        modeBtns[0].classList.add(showNotes ? 'btn-orange' : 'btn-light');
        modeBtns[1].classList.add(!showNotes ? 'btn-orange' : 'btn-light');
    };

    setBtnClasses(showNotes);

    const modeBtnClickHandler = (btn) => {
        showNotes = btn.dataset.mode === 'not';
        setBtnClasses(showNotes);
        setLetters(showNotes);
    };


    // клавиатура
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


    // главная функция - играть звук!))
    const notePlay = (id, duration = 0.8) => {
        const key = document.getElementById(`key${id}`);
        key.classList.add('active');
        let note = document.getElementById(id);
        note.currentTime = 0; // перемотка к началу семпла
        note.play();
        // note.addEventListener('ended', () => {key.classList.remove('active')}); // звук до конца
        setTimeout(() => {
            note.pause();
            key.classList.remove('active');
        }, duration * 1000);
    }


    // переключение полноэкранного режима
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            fsBtn.innerHTML = 'Window';
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
          fsBtn.innerHTML = 'Fullscreen';
        }
    };


    // вешаем обработчики
    // клавиатура
    document.addEventListener("keydown", (e) => {
        if (keyForPlay.includes(e.code[3])) {
            const index = keyForPlay.findIndex(el => el === e.code[3]);
            notePlay(noteId[index]);
        }
    });

    //  мышка
    for (let item of notes) {
        item.addEventListener('mousedown', clickHandler);
        item.addEventListener('mouseover', overHandler);
    };

    for (let btn of modeBtns) {
        btn.addEventListener('click', (e) => modeBtnClickHandler(e.target));
    };
    
    fsBtn.addEventListener('click', toggleFullScreen);
}

document.addEventListener('DOMContentLoaded', main);