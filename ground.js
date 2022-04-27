class Ground{

    constructor(x,y,w,h){
    
        this.body = Bodies.rectangle(x,y,w,h, {isStatic:true});
        this.width = w;
        this.height = h;
        World.add(world, this.body);

    }

    display(){

        push()

        rectMode(CENTER);
        fill(78,50,50);
        rect(this.body.position.x, this.body.position.y, this.width, this.height);


        pop()
    }




}