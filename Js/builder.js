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
const playerUsed = [];
let formationPicked = 0;
const DefaultPositions = () =>{
   formationPicked = localStorage.getItem("fp") ?? 0 ;
    formations[formationPicked].forEach((item, index) => {
        const element = document.createElement('div');
        element.style.transition = "all .5s,transform 1s"
        element.style.transform = "rotateY(0deg)"
        element.classList.add("absolute")
        element.addEventListener("mouseover",()=>{
            element.style.filter = 'drop-shadow(1px 1px 10px #c4c4c46e)';
        })
        element.addEventListener("mouseleave",()=>{
            element.style.filter = 'none';
            
        })
        element.style.left = `${item.y}px`
        element.style.bottom = `${item.x}px`
        element.setAttribute("id" ,`img${index + 1}` )
        element.classList.add('element');
        element.innerHTML = `<img id="imgcover${item.pn}" src="./Assets/image.png"  class="h-40 " alt="">
                
                  
           
                ${item.player == -1 && 
                    (`
                        <div onclick="PickPlayer(${item.pn})" id="addplayericon${item.pn}" class="absolute inset-0 flex justify-center items-center">
                            <div class="relative text-gray-400 text-2xl cursor-pointer">
                                <i class="fa-solid fa-plus"></i>
                            </div>    
                       
                        </div>
                        `)}
                    <div class="flex justify-center">
                        <p id="post${index}" class="px-3 text-white bg-gray-800 -translate-y-2 rounded-md w-auto">${item.post}</p>
                    </div>
                    <div class="absolute left-[18px] top-8 flex flex-col items-center">
                        <h2 id="ratingtext${item.pn}" class="m-0 p-0 font-bold text-ms"></h2>
                        <span id="posttext${item.pn}" class="text-[8px]"></span>
                        <img id="imgflag${item.pn}" class="w-5 "  />
                    </div>
                    <img id="imgplayer${item.pn}" class="absolute left-10 w-16 top-6"  />
                    <div class="absolute left-4 right-4 top-[88px]  text-[0.6rem] flex flex-col justify-center items-center text-center">
                        <h2 class="font-bold" id="playername${item.pn}" class=""></h2>
                        
                        <div class="flex flex-col items-center">
                            <span id="playerclub${item.pn}" class="text-[0.5rem]"></span>
                            <img id="imgclub${item.pn}" class="w-4"  />
                        </div>
                        
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
    tt && (formationPicked = Number(tt));
    formations.forEach((taktik,i)=>{
        i!=formationPicked && taktik.forEach((item,p)=>{
            item.player = formations[formationPicked][p].player;
        })
    })

    for (let i = 0; i < players.length; i++) {
        players[i].style.left =  `${formations[Number(tt)][i].y }px`;
        players[i].style.bottom = `${formations[Number(tt)][i].x }px`;
        const gg = document.getElementById(`post${i}`);
        gg && (gg.innerHTML = formations[Number(tt)][i].post );
    }
    console.log(formations)
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
                        <option value="0" >4-4-2</option>
                        <option value="1" >4-3-3</option>
                        
                    </select>`;
        formations.setAttribute("ipOpened",'true');

        document.getElementById("formationtaktik").selectedIndex = formationPicked;
    }
}

function PickPlayer(pn ){
    
    fetch('../Data/players.json')
    .then(res=>res.json())
    .then(data=> {
        // console.log(Array.from(formations[formationPicked][pn-1].post).slice(-2).join())
        AddPlaperPanel(data ,
             pn ,
             `${Array.from(formations[formationPicked][pn-1].post).slice(-2).join().replace(/,/g,"")}`)
    })
}
function ClosePanlePlayers(){
    document.getElementById("playerspanel").innerHTML = ``;
}
function AddPlaperPanel(data  , pn , post){
    let PlayerCards = ``;
    console.log()
    data && data.forEach((item , i)=>{
        // const newCard = document.createElement('div');
        let FindPlayer= data.find((row)=>row.id==item.id);
        item.position.includes(""+post) ? PlayerCards += `
        <div class='relative shadow-md cursor-pointer' onclick='PickedPlayer(${JSON.stringify(FindPlayer).replace(/'/g, "")},${pn},${item.id})'>
            <img src="${item.cover ?? './Assets/badge-white.png'}" 
            class="${item.rating>85 ?'w-28' : 'w-28'}" alt="">
            
            <div class="absolute left-[16px] top-[30px] flex flex-col items-center">
                <h2 class="m-0 p-0 font-bold text-ms ${item.rating>85 && (item.position != "GK" &&'text-[#FFD972]')}">${item.rating}</h2>
                <span class="text-[8px] font-bold ${item.rating>85 && (item.position != "GK" &&'text-[#FFD972]')}">${item.position}</span>
                <img class="w-5 ${item.rating>85 &&(item.position != "GK" &&'text-[#FFD972]')}" src="${item.flag}"   />
            </div>
            <img class="absolute left-10 w-16 top-6" src="${item.photo}" />
            <div class="absolute left-8 right-8 top-24 font-bold text-xs flex justify-center items-center text-center">
                <h2 class="${item.rating>85 && (item.position != "GK" &&'text-[#FFD972]')} ">${item.name}</h2>
            </div>
            
        </div>
        ` : ''
    })

    document.getElementById("playerspanel").innerHTML = `
        <div class="border-[#3C4053] rounded-md border-2 w-full py-5 px-6">
            <div class="flex justify-between">
            <h3 class=" text-gray-100">Players</h3>
                <i class="fa-solid fa-xmark text-white cursor-pointer" onclick="ClosePanlePlayers()"></i>
                </div>
                <div class="flex flex-wrap gap-2">
                ${PlayerCards.length>0 ? PlayerCards : `<div class="flex gap-2 ite px-5 py-2 w-full mt-10 border-2 border-gray-700 text-gray-200">
                <i class="fa-regular fa-futbol"></i><span>0 player found</span>
                </div>`}
                </div>
        </div>
    `;
}

function PickedPlayer(playerObject , pn ,id){
    formations[formationPicked].forEach((itm ,i)=>{
        if(itm.pn==pn) {
            itm.player = id ;
        }
    })
    const Card = document.getElementById(`img${pn}`);
    Card.innerHTML += 
    `
        <div onclick='getPlayerInfo(${JSON.stringify(playerObject)})' class="absolute z-20 cursor-pointer right-0 bottom-10 bg-gray-600 text-white rounded-full h-5 w-5 flex justify-center items-center shadow-sm">
            <span class="font-sans">i</span>
        </div>
    `;
    document.getElementById(`ratingtext${pn}`).innerHTML = playerObject?.rating;
    document.getElementById(`playername${pn}`).innerHTML = playerObject?.name;
    document.getElementById(`posttext${pn}`).innerHTML = playerObject?.position;
    document.getElementById(`playerclub${pn}`).innerHTML = playerObject?.club;

    (playerObject?.rating >85 && playerObject?.position != "GK" ) && 
    ( document.getElementById(`ratingtext${pn}`).classList.add('text-[#FFD972]'),
    document.getElementById(`playername${pn}`).classList.add('text-[#FFD972]'),
    document.getElementById(`posttext${pn}`).classList.add('text-[#FFD972]'),
    document.getElementById(`playerclub${pn}`).classList.add('text-[#FFD972]')
    )
    

    const addplayericon = document.getElementById(`addplayericon${pn}`);
    addplayericon.style.display = 'none';
    document.getElementById(`imgcover${pn}`).setAttribute("src" , playerObject?.cover )
    document.getElementById(`imgflag${pn}`).setAttribute("src" , playerObject?.flag )
    document.getElementById(`imgplayer${pn}`).setAttribute("src" , playerObject?.photo )
    document.getElementById(`imgclub${pn}`).setAttribute("src" , playerObject?.logo )

    Card.style.transform = "rotateY(0deg) scale(1.1)"
    setTimeout(()=>{
        Card.style.transform = "rotateY(0deg) scale(1)"
    },500)
}

function getPlayerInfo(playerObject){
    document.getElementById(`playerinfo`).innerHTML = 
    `
        <div class="border-[#3C4053] rounded-md border-2 w-full py-5 px-6">
            <div class="flex justify-between">
            <h3 class=" text-gray-100">Player information</h3>
                <i class="fa-solid fa-xmark text-white cursor-pointer" onclick="ClosePanlePlayersinfo()"></i>
            </div>
            <div class="text-white text-xs grid grid-cols-[1fr,auto] pt-4">
                <div class="flex flex-col gap-4 w-full ">
                    <div class="flex flex-col items-center">
                        <div class="flex gap-3">
                            <img class="w-16" src="${playerObject?.flag}" >
                        </div>
                        <h3 class="font-semibold">${playerObject?.nationality}</h3>
                    </div>
                    <div class="grid grid-cols-2 justify-between">
                        <div>
                            <p>position : ${playerObject?.position}</p>
                            <p>club :${playerObject?.club}</p>
                            <p>rating :${playerObject?.rating}</p>
                            <p>pace : ${playerObject?.pace}</p>
                            <p>shooting : ${playerObject?.shooting}</p>
                        </div>
                        <div>
                            <p>passing : ${playerObject?.passing}</p>
                            <p>dribbling : ${playerObject?.dribbling}</p>
                            <p>defending : ${playerObject?.defending}</p>
                            <p>physical : ${playerObject?.physical}</p>
                        </div>
                        
                    </div>
                </div>
                <div class="grid gap-1">
                     <img class="w-28 border-2 border-gray-300 bg-[#3a357357] rounded-md" src="${playerObject?.photo}">
                     <h2 class="font-bold">${playerObject?.name}</h2>
                     <img class="w-10" src="${playerObject?.logo}" >
                </div>
                

            </div>
            

        </div>
    `;
    
}
function ClosePanlePlayersinfo(){
    document.getElementById(`playerinfo`).innerHTML= ``;
}