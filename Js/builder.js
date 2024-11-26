const formations = [
    [
        { pn : 1 , x: 0, y: 395 , post: 'GK' ,player : -1 },
        { pn : 2 ,x: 150, y: 180 , post: 'LB' ,player : -1},
        { pn : 3 ,x: 150, y: 610 , post: 'RB' ,player : -1},
        { pn : 4 ,x: 85, y: 280 , post: 'CB' ,player : -1},
        { pn : 5 ,x: 85, y: 510 , post: 'CB' ,player : -1},
        { pn : 6 ,x: 250, y: 300 , post: 'CM' ,player : -1},
        { pn : 7 ,x: 250, y: 495 , post: 'DM' ,player : -1},
        { pn : 8 ,x: 390, y: 220 , post: 'LW' ,player : -1},
        { pn : 9 ,x: 390, y: 570 , post: 'RW' ,player : -1},
        { pn : 10 ,x: 520, y: 360 , post: 'ST' ,player : -1},
        { pn : 11 ,x: 500, y: 470 , post: 'ST' ,player : -1},
    ],
    [ 
        { pn : 1 ,x: 0, y: 395 , post: 'GK' ,player : -1 },
        { pn : 2 ,x: 170, y: 180 , post: 'LB' ,player : -1},
        { pn : 3 ,x: 170, y: 610 , post: 'RB' ,player : -1},
        { pn : 4 ,x: 85, y: 280 , post: 'LCB' ,player : -1},
        { pn : 5 ,x: 85, y: 510 , post: 'RCB' ,player : -1},
        { pn : 6 ,x: 200, y: 400, post: 'CDM' ,player : -1},
        { pn : 7 ,x: 310, y: 500 , post: 'LCM' ,player : -1},
        { pn : 8 ,x: 310, y: 300 , post: 'RCM' ,player : -1},
        { pn : 9 ,x: 450, y: 560 , post: 'LW' ,player : -1},
        { pn : 10 ,x: 450, y: 220 , post: 'RW' ,player : -1},
        { pn : 11 ,x: 530, y: 395 , post: 'ST' ,player : -1},
    ]
]
const DefaultPositions = () =>{
    const formationPicked = localStorage.getItem("fp") ?? 0 ;
    formations[formationPicked].forEach((item, index) => {
        const element = document.createElement('div');
        element.classList.add("transition-all")
        element.classList.add("absolute")
        element.style.left = `${item.y}px`
        element.style.bottom = `${item.x}px`
        element.setAttribute("id" ,`img${index + 1}` )
        element.setAttribute("onclick" ,`PickPlayer(${formationPicked} , ${item.x} )` )
        element.classList.add('element');
        element.innerHTML = `<img src="./Assets/image.png"  class="h-40 " alt="">
                    ${item.player==-1 && 
                    (`
                        <div class="absolute inset-0 flex justify-center items-center">
                            <div class="relative text-gray-400 text-2xl">
                                <i class="fa-solid fa-plus"></i>
                            </div>    
                       
                        </div>
                        `)}
                    <div class="flex justify-center">
                        <p id="post${index}" class="px-3 text-white bg-gray-800 -translate-y-2 rounded-md w-auto">${item.post}</p>
                    </div>
                    <div class="absolute left-[18px] top-8 flex flex-col items-center">
                        <h2 class="m-0 p-0 font-bold text-ms"></h2>
                        <span class="text-[8px]"></span>
                        <img class="w-5 "  />
                    </div>
                    <img class="absolute left-10 w-16 top-6"  />
                    <div class="absolute left-8 right-8 top-24 font-bold text-xs flex justify-center items-center text-center">
                        <h2 class=""></h2>
                    </div>
        ` ;
        canvas.appendChild(element);

    });
}

DefaultPositions();

let players = [];

for (let index = 0; index <= 11 ; index++) {
    const ele = document.getElementById("img"+index);
    ele && players.push(ele) ;
}

function onchangeformation(){
    const tt = document.getElementById("formationtaktik").value;
    tt && localStorage.setItem("fp",tt) 

    for (let i = 0; i < players.length; i++) {
        players[i].style.left =  `${formations[Number(tt)][i].y }px`;
        players[i].style.bottom = `${formations[Number(tt)][i].x }px`;
        const gg = document.getElementById(`post${i}`);
        gg && (gg.innerHTML = formations[Number(tt)][i].post );
    }
}
function OpenFormationMenu(){
    const formations = document.getElementById('formations')
    const formationcontent = document.getElementById('formationcontent')
    const formationicon = document.getElementById('formationicon')
    if(formations.getAttribute("ipOpened") == 'true')
    {
        formationcontent.innerHTML = ``;
        formations.setAttribute("ipOpened",'false')
        formationicon.style.transform = `rotate(0deg)`;
    }
    else{
        formationicon.style.transform = `rotate(180deg)`;

        formationcontent.innerHTML = `<select name="" id="formationtaktik" 
                    class="mt-4 py-2  w-full text-gray-400 bg-transparent rounded-md border-2 border-gray-600"
                    onchange="onchangeformation()">
                        <option value="0">4-4-2</option>
                        <option value="1">4-3-3</option>
                        <option value="1">3-5-2</option>
                        <option value="1">3-4-3</option>
                        <option value="1">5-3-1</option>
                    </select>`;
        formations.setAttribute("ipOpened",'true')
    }
}

function PickPlayer(formationPicked , x){
    alert(""+formationPicked)
}