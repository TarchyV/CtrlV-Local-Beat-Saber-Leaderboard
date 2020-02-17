

fbInfo = []
fbInfoTxt = ''

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                fbInfo = rawFile.responseText.split('\n');
            }
        }
    }
    rawFile.send(null);
}

readTextFile('FirebaseContents.config')
console.log(fbInfo)
var firebaseConfig = {
  apiKey: fbInfo[0].toString(),
  authDomain: fbInfo[1].toString(),
  databaseURL: fbInfo[2].toString(),
  projectId: fbInfo[3].toString(),
  storageBucket: fbInfo[4].toString(),
  messagingSenderId: fbInfo[5].toString(),
  appId: fbInfo[6].toString(),
   };


   var songNameScore = [];
   var ctrlvScores = [];
        
firebase.initializeApp(firebaseConfig);
var db = firebase.database().ref("BeatSaber").orderByKey();
db.once("value").then(function(snapshot){
var i;
for(i = 1; i < 17; i++){
for(x = 1; x < 500; x++){
var id = "BS|"+i;
if(snapshot.child(id.toString()).child(x).exists()){
  if(snapshot.child(id.toString()).child(x).val().toUpperCase().includes('CTRLV') == true){
    ctrlvScores.push(snapshot.child(id.toString()).child(x).val().toString())
  }else{
    if(snapshot.child(id.toString()).child(x).val().substring(0,6).includes('{"_lea') == true){
    
      this.songNameScore.push(snapshot.child(id.toString()).child(x).val().substring(snapshot.child(id.toString()).val().indexOf('":"') + 2)) 
}else{    
  //console.log(snapshot.child(id.toString()).child(x).val().substring(0,6))  
  if(snapshot.child(id.toString()).child(x).val().substring(0,6) == '"Level'){

  }else{
      if(snapshot.child(id.toString()).child(x).val().substring(snapshot.child(id.toString()).child(x).val().indexOf('|') - 25,snapshot.child(id.toString()).child(x).val().indexOf('|')).includes('OneSaber') == true){
          x++
      }else{
          if( snapshot.child(id.toString()).child(x).val().substring(snapshot.child(id.toString()).child(x).val().indexOf('|') - 25,snapshot.child(id.toString()).child(x).val().indexOf('|')).includes('Arrows') == true){
              x++;
          }else{                      
              this.songNameScore.push(snapshot.child(id.toString()).child(x).val().toString());    
          }
      }
  }                            
}
  }   
}
}

        }

SortByScore(songNameScore)  
 });

   

$(function() {

$('input[name="datefilter"]').daterangepicker({
    autoUpdateInput: false,
    locale: {
        cancelLabel: 'Clear'
    }
});

$('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
    $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
    console.log('i applied!!')
    sortByDateRange(picker.startDate.format('YYYY-MM-DD'), picker.endDate.format('YYYY-MM-DD'));

});

$('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
    $(this).val('');
});

});



function sortByStaff(){
  SortByScore(ctrlvScores);
}


function sortByToday(){
  var dateSortedList =[];
  for(i = 0; i < songNameScore.length; i++){
    var today = new Date();
    today = moment(today, "MM-DD-YYYY");
    today = today.format('MM-DD-YYYY');
    console.log(songNameScore[i]);
    scoreDate = songNameScore[i].substring(songNameScore[i].lastIndexOf('|') + 1, songNameScore[i].indexOf(','));
    scoreDate = scoreDate.replace('/', '-');scoreDate = scoreDate.replace('/', '-')
    if(moment(scoreDate).isSame(today)){
      dateSortedList.push(songNameScore[i]);
    }


  }
  SortByScore(dateSortedList)

}

function sortByDateRange(start, end){
    var dateSortedList =[];
    console.log(end);
  for(i = 0; i < songNameScore.length; i++){
    scoreDate = songNameScore[i].substring(songNameScore[i].lastIndexOf('|') + 1, songNameScore[i].indexOf(','));
    scoreDate = scoreDate.replace('/', '-');scoreDate = scoreDate.replace('/', '-')
    if(moment(scoreDate).isAfter(start)){
      if(moment(scoreDate).isBefore(end)){
        dateSortedList.push(songNameScore[i])
      }
    }



    console.log(start + " " +  end + "SCORE DATE: " + scoreDate)
  }

    SortByScore(dateSortedList)

}


function allScores(){
  SortByScore(songNameScore);
}
var listLength = 0;

function SortByScore(list){
    RemoveList();
        //RemoveList()
          list.sort(function(x,y){
            // console.log(x)
             var xp = parseInt(x.toString().substring(x.indexOf('"|') + 2, x.lastIndexOf('|')));
             //console.log(xp)
             var yp  = parseInt(y.toString().substring(y.indexOf('"|') + 2, y.lastIndexOf('|')));
             return xp == yp ? 0 : xp < yp ? -1 : 1;
         });
       
    list.reverse();
 
            
            createList(list);

          
    

     
}

function FilterBySong(list){

}

function FilterByDifficulty(list){
  
}

function createList(list){
    var song = []
    var name = []
    var score = []      
    var time = []
    var difficulty = []
    var fullList = []
    var tempList = []
    for (i = 0; i < list.length; i++){
        //console.log(list[i]);
          tempList.push(list[i].split('|'))
        //console.log(theList[i]);
        //0 = All Time
        //1 = This Month
        //2 = This Week
        //3 = Today
        //a = x;
        
    

        if(tempList[i][0].toString().length > 1){
                  song.push(tempList[i][0].replace(/[^\w\s]/gi, '')) 
                if(tempList[i][1].length > 15){
                  name.push(tempList[i][1].toString().substring(0,13).replace(/[^\w\s]/gi, '') + '..')
                }else{
                  name.push(tempList[i][1].replace(/[^\w\s]/gi, '')) 
                }
                score.push(tempList[i][2])  
                time.push(tempList[i][3])         
                }else{                
                song.push(tempList[i][1].replace(/[^\w\s]/gi, '')) 
                if(tempList[i][2].length > 15){
                  name.push(tempList[i][2].toString().substring(0,13).replace(/[^\w\s]/gi, '') + '..')
                }else{
                  name.push(tempList[i][2].replace(/[^\w\s]/gi, '')) 
                }
                score.push(tempList[i][3])
                time.push(tempList[i][4])
                
            

        }
        
        

       
    
        
        if(song[i].includes('Easy') == true){
            song[i] = song[i].toString().substring(0,song[i].length - 4)
            difficulty.push('Easy')
        }
        if(song[i].includes('Normal') == true){
            song[i] = song[i].toString().substring(0,song[i].length - 6)
            difficulty.push('Normal')
        }
        if(song[i].includes('Hard') == true){
            song[i] = song[i].toString().substring(0,song[i].length - 4)
            difficulty.push('Hard')
        }
        if(song[i].includes('Expert') == true && song[i].includes('Plus') == false){
            song[i] = song[i].toString().substring(0,song[i].length - 6)
            difficulty.push('Expert')
        }
        if(song[i].includes('ExpertPlus') == true){
            song[i] = song[i].toString().substring(0,song[i].length - 10)
            difficulty.push('ExpertPlus')
        }
        if(song[i].includes('NoArrows') == true){
          song[i] = song[i].toString().substring(0,song[i].length - 7)
         // difficulty.push('ExpertPlus')
        }
        if(song[i].includes('OneSaber') == true){
          song[i] = song[i].toString().substring(0,song[i].length - 7)
         // difficulty.push('ExpertPlus')
        }
        if(name[i].toString.length > 12 ){
            name[i] = name[i].toString.substring(0, name[i].length - 5)
        }
       // console.log(song);
        fullList.push(song,difficulty,name,score,time);
      }
      listLength = fullList.length;
      //console.log(listLength)
      buildList(fullList);



}

function RemoveList(){
     // console.log(listLength);
      for(i = 0; i < listLength; i++){
        var element = document.getElementById('daddydiv');
        if(element != null){
            element.parentNode.removeChild(element);
        }
      }


}

function buildList(fullList){
    for(a = 0; a < fullList.length; a++){
        //console.log(fullList[a])
      ul = document.createElement('ul');
      ul.setAttribute('id','ulId')
      document.getElementById('list').appendChild(ul);
      let li = document.createElement('li');
      li.setAttribute('class', 'list-group-item')
      li.setAttribute('id', 'daddyli')
      let daddydiv = document.createElement('div')
      daddydiv.setAttribute('class','row')
      daddydiv.setAttribute('id', 'daddydiv')
      let timediv = document.createElement('div')
      timediv.setAttribute('id','bearSaberRowTime')
      let songdiv = document.createElement('div')
      songdiv.setAttribute('id','beatSaberRow')
      let namediv = document.createElement('div')
      namediv.setAttribute('id','beatSaberRow')
      let scorediv = document.createElement('div')
      scorediv.setAttribute('id','beatSaberRow')
      let diffdiv = document.createElement('div')
      diffdiv.setAttribute('id','beatSaberRow')
      ul.appendChild(li);
      li.appendChild(daddydiv);   
      daddydiv.appendChild(timediv);
      daddydiv.appendChild(songdiv);
      daddydiv.appendChild(diffdiv)
      daddydiv.appendChild(namediv);
      daddydiv.appendChild(scorediv);

      //console.log(fullList[a]);
      // if(fullList[0][a].length > 11){
      //   songdiv.setAttribute("style", "font-size:0.5em")
      // }
      if(fullList[0][a].length > 0){
        songdiv.innerHTML = fullList[0][a]
        namediv.innerHTML = fullList[2][a]
        diffdiv.innerHTML = fullList[1][a]//.replace(/[^\w\s]/gi, '');
        scorediv.innerHTML = fullList[3][a]
        timediv.innerHTML = fullList[4][a]
      }

      }
}
