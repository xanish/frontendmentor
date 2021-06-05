const game = {
    score: 0
};

window.addEventListener('load', () => {
    document.querySelector('header .score__value').innerText = getScore();
});

document.querySelector('#rules').addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.classList.remove('hidden');
});

document.querySelectorAll('.modal__close').forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = document.querySelector('.modal');
        modal.classList.add('hidden');
    })
});

document.querySelectorAll('.game-wrapper__btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const choices = ['scissors', 'paper', 'rock', 'lizard', 'spock'];

        const usersChoice = choices.indexOf(btn.getAttribute('data-choice'));
        const compsChoice = choices.indexOf(getRandomChoice());
        const winner = getWinner(usersChoice, compsChoice);

        document.querySelector('.game-wrapper').classList.add('hidden');
        document.querySelector('.results').classList.remove('hidden');
        
        setTimeout(() => {
            // show you chose
            const userChoiceBtn = document.querySelector('.results__user-choice .results__choice .results__choice-btn');
            userChoiceBtn.setAttribute('data-choice', btn.getAttribute('data-choice'));
            userChoiceBtn.setAttribute('aria-label', btn.getAttribute('data-choice'));
            userChoiceBtn.classList.remove('hidden');
            document.querySelector('.results__user-choice .results__choice-placeholder').classList.add('hidden');

            setTimeout(() => {
                // show comp chose
                const compChoiceBtn = document.querySelector('.results__comp-choice .results__choice .results__choice-btn');
                compChoiceBtn.setAttribute('data-choice', choices[compsChoice]);
                compChoiceBtn.setAttribute('aria-label', choices[compsChoice]);
                compChoiceBtn.classList.remove('hidden');
                document.querySelector('.results__comp-choice .results__choice-placeholder').classList.add('hidden');

                setTimeout(() => {
                    // show winner
                    document.querySelector('.results__play-again .results__header').innerText = winner === 0 ? "You Win" : winner === 1 ? "You Lose" : "Tie";
                    document.querySelector('.results__play-again').classList.remove('hidden');
                    document.querySelector('#play-again').classList.remove('hidden');

                    if (winner === 0) {
                        document.querySelector('.results__user-choice .results__choice .results__choice-ripples').classList.remove('hidden');
                    } else if (winner === 1) {
                        document.querySelector('.results__comp-choice .results__choice .results__choice-ripples').classList.remove('hidden');
                    }

                    // update score
                    document.querySelector('header .score__value').innerText = updateScore(winner === 0 ? 1 : winner === 1 ? -1 : 0);
                }, 1000);

            }, 1000);

        }, 1000);
    });
});

document.querySelector('#play-again').addEventListener('click', () => {
    // reset your choice
    const userChoiceBtn = document.querySelector('.results__user-choice .results__choice .results__choice-btn');
    userChoiceBtn.removeAttribute('data-choice');
    userChoiceBtn.removeAttribute('aria-label');
    userChoiceBtn.classList.add('hidden');
    document.querySelector('.results__user-choice .results__choice-placeholder').classList.remove('hidden');
    document.querySelector('.results__user-choice .results__choice .results__choice-ripples').classList.add('hidden');

    // reset comp choice
    const compChoiceBtn = document.querySelector('.results__comp-choice .results__choice .results__choice-btn');
    compChoiceBtn.removeAttribute('data-choice');
    compChoiceBtn.removeAttribute('aria-label');
    compChoiceBtn.classList.add('hidden');
    document.querySelector('.results__comp-choice .results__choice-placeholder').classList.remove('hidden');
    document.querySelector('.results__comp-choice .results__choice .results__choice-ripples').classList.add('hidden');

    // reset result
    document.querySelector('.results__play-again .results__header').innerText = "";
    document.querySelector('#play-again').classList.add('hidden');

    document.querySelector('.game-wrapper').classList.remove('hidden');
    document.querySelector('.results__play-again').classList.add('hidden');
    document.querySelector('.results').classList.add('hidden');
});

function getRandomChoice() {
    const choices = ['scissors', 'paper', 'rock', 'lizard', 'spock'];

    return choices[ Math.floor(Math.random() * choices.length) ];
}

function getWinner(usersChoice, compsChoice) {
    if (compsChoice === (usersChoice + 1) % 5 || compsChoice === (usersChoice + 3) % 5) {
        return 0; // user wins
    } else if (compsChoice === (usersChoice + 4) % 5 || compsChoice === (usersChoice + 2) % 5) {
        return 1; // user loses
    } else {
        return 2; // tie
    }
}

function updateScore(increment) {
    let score = 0;

    try {
        const currentScore = localStorage.getItem('score') == null ? 0 : localStorage.getItem('score');
        score = +currentScore + increment;
        localStorage.setItem('score', score);
    } catch (e) {
        game.score += increment;
        score = game.score;
    }

    return score;
}

function getScore() {
    let score = 0;

    try {
        score = localStorage.getItem('score') == null ? 0 : localStorage.getItem('score');
    } catch (e) {
        score = game.score;
    }

    return +score;
}
