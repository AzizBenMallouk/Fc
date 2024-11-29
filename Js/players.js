let AllPlayersLis = []
function Display_All_Players(isFetched){
    
    !isFetched ? fetch('../Data/players.json')
    .then(res=>res.json())
    .then(data=> {
        // console.log(Array.from(formations[formationPicked][pn-1].post).slice(-2).join())
        AddPlaperPanel(data);
        AllPlayersLis = data;
    })
    :AddPlaperPanel(AllPlayersLis);
}

function AddPlaperPanel(data){
    let PlayerCards = ``;
    data && data.forEach((item , i)=>{
        // const newCard = document.createElement('div');
        let FindPlayer= data.find((row)=>row.id==item.id);
        /*(checkplayerIdExist(item.id)==1) && ( 
            (item.position.includes(""+post)) ? */
       
            PlayerCards += `
            <div class='relative shadow-md cursor-pointer''>
                <img src="${item.cover ?? './Assets/badge-white.png'}" 
                class="w-28" alt="">
                
                <div class="absolute left-[16px] top-[30px] flex flex-col items-center">
                    <h2 class="m-0 p-0 font-bold text-ms ${item.rating>85 && (item.position != "GK" &&'text-[#FFD972]')}">${item.rating}</h2>
                    <span class="text-[8px] font-bold ${item.rating>85 && (item.position != "GK" &&'text-[#FFD972]')}">${item.position}</span>
                    <img class="w-5 ${item.rating>85 &&(item.position != "GK" &&'text-[#FFD972]')}" src="${item.flag}"  alt="" />
                </div>
                <img class="absolute left-10 w-16 top-6" src="${item.photo}" alt="" />
                <div class="absolute left-8 right-8 top-24 font-bold text-xs flex justify-center items-center text-center">
                    <h2 class="${item.rating>85 && (item.position != "GK" &&'text-[#FFD972]')} ">${item.name}</h2>
                </div>
                
            </div>
            ` 
      
    })

    document.getElementById("playerslist").innerHTML = `
        <div class="h-[70vh] overflow-y-auto " >
                <div class="flex flex-wrap gap-2">
                ${PlayerCards.length>0 ? PlayerCards : `
                <div class="flex gap-2 ite px-5 py-2 w-full mt-10 border-2 border-gray-700 text-gray-200">
                Empty data players</span>
                </div>`}
                </div>
        </div>
    `;
}

Display_All_Players(false);

const rangeInput = document.getElementById("RangePlayerRating");
const RatingDisplay = document.getElementById("RatingDisplay");

const updateRating = () => {
  RatingDisplay.textContent = `Rating (${rangeInput.value}):`;
};

rangeInput.addEventListener("input", updateRating);

updateRating();
let imageFile;

function AddPlayer(event){
  event.preventDefault();
  const PlayerData = {
      id : AllPlayersLis.length +1 ,
      name : document.getElementById("txtplayerName")?.value ,
      photo : "",
      cover : document.querySelector("#CoverCombo")?.value ,
      position : document.getElementById("ComboplayerPosition")?.value ,
      nationality : document.getElementById("FlagComboName")?.textContent ,
      flag : document.getElementById("FlagComboImg")?.getAttribute('src') ,
      club : document.getElementById("#ClubComboName")?.textContent ,
      logo : document.querySelector("#ClubComboImg")?.getAttribute('src') ,
      rating : document.getElementById("RangePlayerRating")?.value ,
      pace : document.getElementById("RangePlayerPace")?.value ,
      shooting : document.getElementById("RangePlayerShooting")?.value ,
      passing : document.getElementById("RangePlayerPassing")?.value ,
      dribbling : document.getElementById("RangePlayerDribbling")?.value ,
      defending : document.getElementById("RangePlayerDefending")?.value , 
      physical : document.getElementById("RangePlayerPhysical")?.value ,
  }

  if (imageFile) {
    document.getElementById("panleform").style.opacity = '0.4' ;
    document.getElementById("panleform").style.pointerEvents = 'none' ;
    document.getElementById("progressloading").classList.remove('hidden');
    UploadImgOnImgBB(PlayerData);
} else {
    alert("Please select an image before adding the player.");
}

}


const input = document.querySelector("#fileInput");
input.addEventListener("change", (event) => {
    const file = event.target.files[0];
    // console.log(event)
    if (file) {
        imageFile = file;   
        // console.log("File selected:", file.name);//ghir name
    }
});

async function UploadImgOnImgBB(PlayerData){

  const apiKey = "3831af7143a217e46e098a7018fb2522";
  //We have to make in it the env file to make it more secure lmohim 9di o 3adi
  const formData = new FormData();

  formData.append("image", imageFile);

  try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
          method: "POST",
          body: formData,
      });

      if (!response.ok) {
          throw new Error("Failed to upload image");
      }

      const data = await response.json();
      PlayerData.photo = data.data.url;
      AllPlayersLis.push(PlayerData);
      AllPlayersLis.reverse()
      Display_All_Players(true);
      console.log(AllPlayersLis)

      document.getElementById("panleform").style.opacity = '1' ;
      document.getElementById("panleform").style.pointerEvents = 'auto' ;
      document.getElementById("progressloading").classList.add('hidden');

  } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
  }

  
}
 function uploadToImgBB(imageFile) {
  
}


new TomSelect('#FlagCombo',{
  valueField: 'img',
  labelField: 'name',
  searchField: 'name',
  load: function(query, callback) {

    fetch('../Data/nation.json')
      .then(response => response.json())
      .then(json => {
        callback(json);
      }).catch(()=>{
        callback();
      });

  },
  render: {
    option: function(item, escape) {
      return `<div class="custom-option grid grid-cols-[auto,1fr] gap-3 items-center">
          <img  class="h-4 w-4" src="${item.img}" >
          <span  >${item.name}</span>
        </div>`;
    },
    item: function(item, escape) {
      return `<div id="Flaginput" class="custom-option grid grid-cols-[auto,1fr] gap-3 items-center">
          <img id="FlagComboImg" class="h-4 w-4" src="${item.img}" >
          <span id="FlagComboName">${item.name}</span>
        </div>`;
    }
  },
});

new TomSelect('#ClubCombo',{
  valueField: 'img',
  labelField: 'name',
  searchField: 'name',
  load: function(query, callback) {

    fetch('../Data/teams.json')
      .then(response => response.json())
      .then(json => {
        callback(json);
      }).catch(()=>{
        callback();
      });

  },
  // custom rendering functions for options and items
  render: {
    option: function(item, escape) {
      return `<div class="custom-option grid grid-cols-[auto,1fr] gap-3 items-center">
          <img class="h-4 w-4" src="${item.img}" >
          <span>${item.name}</span>
        </div>`;
    },
    item: function(item, escape) {
      return `<div id="Flaginput" class="custom-option grid grid-cols-[auto,1fr] gap-3 items-center">
          <img id="ClubComboImg" class="h-4 w-4" src="${item.img}" >
          <span id="ClubComboName">${item.name}</span>
        </div>`;
    }
  },
});

new TomSelect('#CoverCombo',{
  valueField: 'img',
  labelField: 'name',
  searchField: 'name',
  // fetch remote data
  load: function(query, callback) {

    fetch('../Data/card.json')
      .then(response => response.json())
      .then(json => {
        callback(json);
      }).catch(()=>{
        callback();
      });

  },
  // custom rendering functions for options and items
  render: {
    option: function(item, escape) {
      return `<div class="custom-option grid grid-cols-[auto,1fr] gap-3 items-center">
          <img class="h-4 w-4" src="${item.img}" >
          <span>${item.name}</span>
        </div>`;
    },
    item: function(item, escape) {
      return `<div id="Flaginput" class="custom-option grid grid-cols-[auto,1fr] gap-3 items-center">
          <img class="h-4 w-4" src="${item.img}" >
          <span>${item.name}</span>
        </div>`;
    }
  },
});









