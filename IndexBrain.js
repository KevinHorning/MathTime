var type, difficulty, operand1, operand2, correctAnswer;
var alreadySubmitted = false;
var answeredRight = 0;
var answeredTotal = 0;
var streak = 0;

function GenerateProblem(){
    type = document.getElementById("type").value;
    difficulty = document.getElementById("level").value;
    
    if (type == "" || difficulty == ""){
        document.getElementById("InputCheck").innerHTML = "Choose problem type and difficulty"; 
    }
    else{
        document.getElementById("HomeScreen").style.display = "none";
        document.getElementById("HomeScreen").style.visibility = "hidden";
        document.getElementById("ProblemScreen").style.display = "block";
        document.getElementById("ProblemScreen").style.visibility = "visible";
        document.getElementById("NextButton").style.display = "none";
        
        document.getElementById("ProblemType").innerHTML = difficulty + " " + type;

        [operand1, operand2] = GenerateOperands(type, difficulty);
        document.getElementById("Operand1").innerHTML = operand1;
        document.getElementById("Operand2").innerHTML = operand2;
        document.getElementById("Answer").style.width = AdjustEquationSizeAndAnswerSpace();

        if (type == "Addition")
            document.getElementById("Operation").innerHTML = "+";
        else if (type == "Subtraction")
            document.getElementById("Operation").innerHTML = "-";
        else if (type == "Multiplication")
            document.getElementById("Operation").innerHTML = "x";
        else if (type == "Division")
            document.getElementById("Operation").innerHTML = "/";
        else // (type == "Rounding")
            ;

        window.addEventListener("keydown", function(event) {
            if (event.key == "Enter")
                SubmitAnswer();
        });
    }
}

function BackToHome(){
    document.getElementById("ProblemScreen").style.display = "none";
    document.getElementById("ProblemScreen").style.visibility = "hidden";
    document.getElementById("HomeScreen").style.display = "block";
    document.getElementById("HomeScreen").style.visibility = "visible";

    document.getElementById("SubmitButton").style.display = "block";
    document.getElementById("AnswerSpace").innerHTML = '<input id="Answer" class="EquationPart">'; 
    document.getElementById("ProblemScreen-Result").innerHTML = "";

    UpdateStats(true);
}

function GenerateOperands(type, difficulty){
    if (type == "Addition"){
        if (difficulty == "Easy")
            return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
        else if (difficulty == "Medium")
            return [Math.floor(Math.random() * 90 + 10), Math.floor(Math.random() * 90 + 10)];
        else if (difficulty == "Hard")
            return [Math.round((Math.random() * 9900 + 100) * 100) / 100, Math.round((Math.random() * 9900 + 100) * 100) / 100];
        else // (difficulty == "Crazy")
            return [Math.round(((Math.random() * 99999) - 50000) * 1000) / 1000, Math.round(((Math.random() * 99999) - 50000) * 1000) / 1000];
    }
    else if (type == "Subtraction"){
        if (difficulty == "Easy")
            return OrderOperands(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
        else if (difficulty == "Medium")
            return OrderOperands(Math.floor(Math.random() * 90 + 10), Math.floor(Math.random() * 90 + 10));
        else if (difficulty == "Hard")
            return OrderOperands(Math.round((Math.random() * 9900 + 100) * 100) / 100, Math.round((Math.random() * 9900 + 100) * 100) / 100);
        else  // (difficulty == "Crazy")
            return [Math.round(((Math.random() * 99999) - 50000) * 1000) / 1000, Math.round(((Math.random() * 99999) - 50000) * 1000) / 1000];
    }

    else if (type == "Multiplication"){
        if (difficulty == "Easy")
            return [Math.floor(Math.random() * 7), Math.floor(Math.random() * 7)];
        else if (difficulty == "Medium")
            return [Math.floor(Math.random() * 11 + 2), Math.floor(Math.random() * 11 + 2)];
        else if (difficulty == "Hard")
            return [Math.floor(Math.random() * 16 + 5), Math.floor(Math.random() * 16 + 5)];
        else // (difficulty == "Crazy")
            return [Math.round((Math.random() * 41 - 20) * 100) / 100, Math.round((Math.random() * 41 - 20) * 100) / 100];
    }
    else if (type == "Division"){
        var divNumber1, divNumber2;
        if (difficulty == "Easy"){
            do{
                divNumber1 = Math.floor(Math.random() * 12 + 1);
                divNumber2 = Math.floor(Math.random() * 12 + 1);
            }
            while (!AnswerIsInt(OrderOperands(divNumber1, divNumber2)))
            return OrderOperands(divNumber1, divNumber2);
        }
        else if (difficulty == "Medium"){
            do{
                divNumber1 = Math.floor(Math.random() * 80 + 2);
                divNumber2 = Math.floor(Math.random() * 80 + 2);
            }
            while (!AnswerIsInt(OrderOperands(divNumber1, divNumber2)))
            return OrderOperands(divNumber1, divNumber2);
        }
        else if (difficulty == "Hard") // TODO - make expected answer round
            return OrderOperands(Math.floor(Math.random() * 100 + 3), Math.floor(Math.random() * 100 + 3));
        else // (difficulty == "Crazy")
            return [Math.round((Math.random() * 200 - 100) * 100) / 100, Math.round((Math.random() * 200 - 100) * 100) / 100];
    }
    else // (type == "Rounding")
        return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    
}

function OrderOperands(number1, number2){
    if (number1 > number2)
        return [number1, number2];
    else // operand2 > operand1
        return [number2, number1];
}

function AnswerIsInt([divNumber1, divNumber2]){
    var answer = divNumber1 / divNumber2;
    return (answer == Math.floor(answer) && answer == Math.ceil(answer));
}

function AdjustEquationSizeAndAnswerSpace(){

    if (type == "Addition")
        correctAnswer = parseFloat((operand1 + operand2).toFixed(3)); 
    else if (type == "Subtraction")
        correctAnswer = parseFloat((operand1 - operand2).toFixed(3)); 
    else if (type == "Multiplication")
        correctAnswer = parseFloat((operand1 * operand2).toFixed(4));
    else if (type == "Division")
        correctAnswer = parseFloat((operand1 / operand2).toFixed(3)); 
    else if (type == "Rounding"){
        // TODO
    }

    var operand1Length = operand1.toString().replace('.', '').replace('-', '').length;
    var operand2Length = operand2.toString().replace('.', '').replace('-', '').length;
    var answerLength = correctAnswer.toString().replace('.', '').replace('-', '').length;
    var equationChars = operand1Length + operand2Length + answerLength + 6;

    var scale = 0;
    if (equationChars >= 9 && equationChars < 16){
        scale = 2;
    }
    else if (equationChars >= 16 && equationChars < 23){
        scale = 1;
    }
    else{ //length is 23 to 30 
        scale = 0;
    }

    document.getElementById("Equation").style.fontSize = ((scale * .75) + 2.75) + "vw";
    document.getElementById("Equation").style.borderSpacing = ((scale * 1.25) + 1.5) + "vw 0";
    document.getElementById("Equation").style.marginTop = ((Math.abs(scale - 2) * .75) + 7.5) + "vw";
    document.getElementById("Answer").style.fontSize = ((scale * .75) + 2.75) + "vw";
    document.getElementById("Answer").style.height = ((scale * .9) + 3) + "vw";
    return (((correctAnswer.toString().replace('.', '').replace('-', '').length) * ((scale * .8) + 2)).toString()) + "vw";
}

function SubmitAnswer(){
    if (document.getElementById("Answer").value == "" || isNaN(Number(document.getElementById("Answer").value))) {
        document.getElementById("ProblemScreen-Result").innerHTML = "Enter a number";
        document.getElementById("ProblemScreen-Result").style.left = "38%";
    }
    else {
        document.getElementById("SubmitButton").style.display = "none";
        document.getElementById("NextButton").style.display = "block";
        document.getElementById("ProblemScreen-Result").style.left = "45%";
        
        var submittedAnswer = document.getElementById("Answer").value;
        document.getElementById("AnswerSpace").innerHTML = submittedAnswer;
        if (submittedAnswer == correctAnswer){
            answeredRight++;
            streak++;
            document.getElementById("ProblemScreen-Result").innerHTML = "Correct!";
            document.getElementById("ProblemScreen-Result").style.color = "#95B1A0";
        }   
        else{
            streak = 0;
            document.getElementById("ProblemScreen-Result").innerHTML = "Wrong, the correct answer is " + correctAnswer;
            document.getElementById("ProblemScreen-Result").style.color = "#E32643";
        }
        
        answeredTotal++;
        UpdateStats(false);
    }
}

function GetNextProblem(){
    document.getElementById("SubmitButton").style.display = "block";
    document.getElementById("NextButton").style.display = "none";
    document.getElementById("AnswerSpace").innerHTML = '<input id="Answer" class="EquationPart">'; 
    document.getElementById("ProblemScreen-Result").innerHTML = "";

    [operand1, operand2] = GenerateOperands(type, difficulty);
    document.getElementById("Operand1").innerHTML = operand1;
    document.getElementById("Operand2").innerHTML = operand2;
    document.getElementById("Answer").style.width = AdjustEquationSizeAndAnswerSpace();
}

function UpdateStats(clear){
    if (clear == true){
        answeredRight = 0;
        answeredTotal = 0;
        streak = 0;

        document.getElementById("AnsweredRight").innerHTML = "";
        document.getElementById("AnsweredTotal").innerHTML = "";
        document.getElementById("StatsSlash").innerHTML = "";
        document.getElementById("StatsMessage").innerHTML = "";
    }
    else { // (clear == false)
        document.getElementById("AnsweredRight").innerHTML = answeredRight;
        document.getElementById("AnsweredTotal").innerHTML = answeredTotal;
        document.getElementById("StatsSlash").innerHTML = "/";
        if (streak == 0){
            document.getElementById("StatsMessage").innerHTML = "Answered Right";
        }
        else {
            document.getElementById("StatsMessage").innerHTML = "Answered Right (Streak of " + streak + ")";
        }
    }
}
