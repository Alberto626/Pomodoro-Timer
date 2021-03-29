
let musicQueue = {
    songs: ["Party Rock Anthem", "I Gotta Feeling", "Macarena"],
    nextSong: 0,
    
    get next() {
        if (this.nextSong < 0 || this.nextSong >= this.songs.length ){
            this.nextSong = 0;
            return this.songs[this.nextSong++];
        } else{
            
            return this.songs[this.nextSong++];
            
            

        }
        
        
    },

    set next(value){
        if (value < 0 || value >= this.songs.length ){
            //console.log(value+"Array length : " + this.nextSong)
            this.nextSong = 0;
            //console.log(value+"Next Song : " + this.nextSong)
        } else{
            this.nextSong = value;
            // console.log("else" + value + "Next song : " + this.nextSong)
            console.log(this.nextSong);
        }
    }
 
    // Add getter and setter for next property
 };
 
 // Run through the queue three times
 for (let c = 0; c < musicQueue.songs.length * 3; c++) {
    console.log("Now playing: " + musicQueue.next);
    
 }
 
 // Test the next setter
 musicQueue.next = 2;
 console.log(musicQueue.next);   // Macarena
 musicQueue.next = 3;
 console.log(musicQueue.next);   // Party Rock Anthem
 musicQueue.next = -1;
 console.log(musicQueue.next);   // Party Rock Anthem