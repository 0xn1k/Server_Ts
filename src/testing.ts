// function for human

function human(){

    const name = "human";
    const spcies = "sapien";

    function eat (){
        console.log(`${name} is eating`);
    }
    function sleep (){
        console.log(`${name} is sleeping`);
    }
    function code (){
        console.log(`${name} is coding`);
    }
    function isEvolving(x:boolean){
        if(x){
            console.log(`${name} is evolving`);
        } else {
            console.log(`${name} is not evolving`);
        }   
    }

    function isSapiensCrazzy(y:boolean, z:boolean){
        if(y && z){
            console.log(`${name} is crazzy`);
        } else {
            console.log(`${name} is not crazzy`);
        }   
    }

    function humanName(name: string , handler: (name: string)=>void){
        console.log(`My name is ${name}`);
        console.log("reaching here in the human name function");
        handler(name);
    }

    return { eat, sleep, code, isEvolving, isSapiensCrazzy, humanName   }


}

const h = human();

h.eat();
h.sleep();
h.code();
h.isEvolving(true);
h.isSapiensCrazzy(true, false);

h.humanName("John", (name: string)=>{
    console.log(`My name is ${name}`);
});