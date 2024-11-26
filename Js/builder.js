const formations = [
    [
        { x: 0, y: 395 , post: 'GK' ,player : -1 },
        { x: 150, y: 180 , post: 'LB' ,player : -1},
        { x: 150, y: 610 , post: 'RB' ,player : -1},
        { x: 85, y: 280 , post: 'CB' ,player : -1},
        { x: 85, y: 510 , post: 'CB' ,player : -1},
        { x: 250, y: 300 , post: 'CM' ,player : -1},
        { x: 250, y: 495 , post: 'DM' ,player : -1},
        { x: 390, y: 240 , post: 'LW' ,player : -1},
        { x: 390, y: 570 , post: 'RW' ,player : -1},
        { x: 520, y: 360 , post: 'ST' ,player : -1},
        { x: 500, y: 470 , post: 'ST' ,player : -1},
    ],
    [ 
        { x: 0, y: 395 , post: 'GK' ,player : -1 },
        { x: 170, y: 180 , post: 'LB' ,player : -1},
        { x: 170, y: 610 , post: 'RB' ,player : -1},
        { x: 85, y: 280 , post: 'LCB' ,player : -1},
        { x: 85, y: 510 , post: 'RCB' ,player : -1},
        { x: 200, y: 400, post: 'CDM' ,player : -1},
        { x: 310, y: 500 , post: 'LCM' ,player : -1},
        { x: 310, y: 300 , post: 'RCM' ,player : -1},
        { x: 450, y: 560 , post: 'LW' ,player : -1},
        { x: 450, y: 220 , post: 'RW' ,player : -1},
        { x: 530, y: 395 , post: 'ST' ,player : -1},
    ]
]
const DefaultPositions = () =>{
    formations[1].forEach((item, index) => {
        const element = document.createElement('div');
        element.classList.add("transition-all")
        element.classList.add("absolute")
        element.style.left = `${item.y}px`
        element.style.bottom = `${item.x}px`
        element.setAttribute("id" ,`img${index + 1}` )
        element.classList.add('element');
        element.innerHTML = `<img 
        src="./Assets/badge_gold.webp"
        class="h-40 transition-all"
        alt="" srcset="">
        <div class="h-full flex justify-center">
            <p id="post${index}" class="px-3 text-white bg-gray-800 -translate-y-2 rounded-md w-auto">${item.post}</p>
        </div>
        ` ;
        canvas.appendChild(element);

    });
}

DefaultPositions()
let players = []
for (let index = 0; index <= 11 ; index++) {
    const ele = document.getElementById("img"+index);
    ele && players.push(ele) ;
}

function onchangeformation(){
    const tt = document.getElementById("formationtaktik").value;
    for (let i = 0; i < players.length; i++) {
        players[i].style.left =  `${formations[Number(tt)][i].y }px`;
        players[i].style.bottom = `${formations[Number(tt)][i].x }px`;
        const gg = document.getElementById(`post${i}`);
        gg && (gg.innerHTML = formations[Number(tt)][i].post );
    }
}