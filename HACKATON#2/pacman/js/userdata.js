const users = []
function creatPlayer() {
    console.log('creat user');
    let user_name = document.getElementById('user').value;
    let newPlayer = {
        user_name,
    }
    fetch('http://localhost:3000/player', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newPlayer)
    })
        .then(res => res.json())
        .then(data => {
            console.log('data', data);
            users.push(data);
        })
        .catch(err => {
            console.log(err);
        })

}

function updateScoreUser() {
    console.log('get data');
    let user_name = users.slice(-1);
    let score = document.getElementById('score').value;
    console.log(score);
    let player = {
        user_name,
        score
    }
    fetch('http://localhost:3000/player/score', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(player)
    })
        .then(res => res.json())
        .then(data => data)
        .catch(err => {
            console.log(err);
        })


}

function topScores() {
    console.log('best scores');
    fetch('http://localhost:3000/player/best_scores')
        .then(res => res.json())
        .then(data => {
            showTopScores(data)
        })

}

function showTopScores(arr) {
    let currPLayer = users.slice(-1);
    let root = document.getElementById('root');
    arr.forEach(curr => {
        if (currPLayer === curr.user_name) {
            let li = document.createElement('li');
            li.textContent = `${curr.user_name} : ${curr.score}`
            root.appendChild(li);
        }
    });
}