const EventEmitter = require('events');

class Auction extends EventEmitter {
    constructor(){
        super()
        this.highestBidAmount = 0;
        this.highestBidder = null
    }

    placebid(amount,bidder){
      if(amount>this.highestBidAmount){
          this.highestBidAmount = amount
        this.highestBidder = bidder;
        this.emit("newBid",{amount,bidder})
      }else{
        this.emit("bidError",{msg:"The bid amount should be more then last bid"})
    }
}
}

const myAuction = new Auction();
//actions
myAuction.on("newBid",(bid)=>{
    console.log(`${bid.bidder} made a bid of ${bid.amount}`)
})
myAuction.on("bidError",(err)=>{
    console.log(`${err.msg} made a bid of ${err.amount} and bidder is ${err.bidder}`)
})

myAuction.placebid(500, "pandu");

