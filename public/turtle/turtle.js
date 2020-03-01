function turtleDraw(instructions, id) {

	var canvas = document.getElementById(id);
	var ctx = canvas.getContext("2d");
	ctx.stroleStyle="#FFFFFF";
	var currentInstruction = "";
	var valueStack = [];
	var opcode = "";
	var operand = 0;
	var splitInstruction = [];
	var pos = {x:0, y:0};
	var dir = 0;
	let xchange = 0;
	let ychange = 0;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	while (instructions.length > 0) {
		currentInstruction = instructions.shift();
		splitInstruction = currentInstruction.split(" ", 3);
		opcode = splitInstruction.shift();
		operand = Number(splitInstruction.shift());
		operand2 = Number(splitInstruction.shift());
		console.log(opcode.toUpperCase());
		switch (opcode.toUpperCase()) {
			case "FORWARD": 

				xchange = operand * Math.cos(dir/(180 / Math.PI))
				ychange = operand * Math.sin(dir/(180 / Math.PI))
				ctx.beginPath(); 
				ctx.moveTo(pos.x,pos.y);
				ctx.lineTo(pos.x + xchange, pos.y + ychange);
				ctx.stroke();
				pos.x += xchange;
				pos.y += ychange;
				break;
			case "BACKWARD":
				instructions.unshift("FORWARD "+(-operand).toString()); //For going backwards, just go forwards the reverse amount
				break;
			case "GOTO": 
				pos.x = operand;
				pos.y = operand2;
				break;
			case "TURN":
				dir += operand;	
				break;	
			case "LOOK":
				dir = operand;	
			case "LOOP":	
				repeatInstructions = [];
				while (!instructions[0].startsWith("END LOOP"))
				{
					repeatInstructions.push(instructions.shift());
				}
				instructions.shift();
				for (let i = 0; i < operand; i++) {
					for (let j = repeatInstructions.length-1; j >= 0; j--) {
						instructions.unshift(repeatInstructions[j]);
					}
				}
				break;		
		}
	}

}



function turtleStart() {
	
	var instructions = document.getElementById("turtlecode").value;
	console.log("Instructions:");
	console.log(instructions);
	var id = "turtlecanvas";

	turtleDraw(instructions.split("\n"), id);

}