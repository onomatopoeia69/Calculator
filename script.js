
document.addEventListener("DOMContentLoaded",()=>{


    const buttonsDiv = document.querySelector(".keys");
    const display = document.querySelector("#screen-display");

    let fullValue = "0";
    let isNewNumber = true;
    let powerOn = true;
    let isDotPresent = false;
    let isIntegerShow = false;
    let operation = null;
    let lastValue = "";

    display.textContent = "0";


    function numberHandler(event) {

            document.dispatchEvent(new Event("numberKey"));

            if(!powerOn)
            {
                return "";
            }

        
            if(isNewNumber)
            {
                if(event.target.textContent === "0"){

                    return "0";
                }else{

                    fullValue = event.target.textContent; 
                    display.textContent = fullValue;
                    isNewNumber = false;
                }
               

            }else{
 
                 fullValue += event.target.textContent;
                display.textContent = fullValue.slice(-14);

            }
    }
        function specialHandler(event) {

             document.dispatchEvent(new Event("specialKey"));

            switch (event.target.textContent) {

                    case "Delete":

                          if(!powerOn)
                            {
                                return "";
                            }


                            if(fullValue.length > 1)
                            {
                                fullValue = fullValue.slice(0, -1);
                                display.textContent = fullValue.slice(-14);
                                isNewNumber = false;

                                fullValue.search(".") === 0 ? isDotPresent = false : isDotPresent = true;

                            }else {

                                fullValue = "0";
                                display.textContent = fullValue;
                                isNewNumber = true;
                            }

                        break;
                    
                    case "Clear":

                              if(!powerOn)
                                {
                                    return "";
                                }

                            fullValue = "0";
                            display.textContent = fullValue;
                            isDotPresent = false;
                            isNewNumber = true;

                        break;

                    case "Off":

                            display.textContent = "Power Off";
                            powerOn = false;

                            setTimeout(() => {
                                event.target.textContent = "On";
                                fullValue = "0";
                                display.textContent = "";
                            }, 3 * 1000);

                            isNewNumber = true;
                            
                    
                        break;

                    case "On":

                            display.textContent = "Power On";
                            setTimeout(() => {
                                event.target.textContent = "Off";
                                fullValue = "0";
                                display.textContent = "0";
                                 powerOn = true;
                            }, 3 * 1000);

                            isNewNumber = true;

                        break;

                    case ".":   

                            
                          if(!powerOn)
                            {
                                return "";
                            }
                            
                            if(!isDotPresent)
                            {

                            fullValue += event.target.textContent;
                            display.textContent = fullValue;
                            isNewNumber = false;
                            isDotPresent = true;

                            }
                        

                        break;

                    case "+/-":

                            
                          if(!powerOn)
                            {
                                return "";
                            }

                           fullValue.includes("-") === true ? isIntegerShow = true : isIntegerShow = false;

                           if(!isIntegerShow)
                           {
                                fullValue = `-${fullValue}`;
                                display.textContent = fullValue;

                           }else{

                                fullValue = fullValue.replace("-","").trim();
                                display.textContent = fullValue;
                           }
                       

                        break;

                }

        }
            function operationHandler(event) {
                    
                     document.dispatchEvent(new Event("operator"));

                   if(!powerOn)
                    {
                        return "";
                    }


                    switch (event.target.textContent) {
                        case "+":

                                if(!lastValue)
                                {
                                    
                                    lastValue = fullValue;
                                    fullValue = "0";
                                    isNewNumber = true;
                                    isDotPresent = false;

                                }

                                 operation = "add";

                            break;

                            case "X":

                                 if(!lastValue)
                                {
                                    
                                    lastValue = fullValue;
                                    fullValue = "0";
                                    isNewNumber = true;
                                    isDotPresent = false;

                                }

                                operation = "multiply";

                                break;
                            
                             case "-":

                                  if(!lastValue)
                                {
                                    
                                    lastValue = fullValue;
                                    fullValue = "0";
                                    isNewNumber = true;
                                    isDotPresent = false;

                                }

                                operation = "subtract";
                                
                                break;

                              case "/":

                                  if(!lastValue)
                                {
                                    
                                    lastValue = fullValue;
                                    fullValue = "0";
                                    isNewNumber = true;
                                    isDotPresent = false;

                                }

                                operation = "divide";

                                break;
                    
                        default:
                            break;
                    }

                }
                    function resultHandler() {
                               
                          if(!powerOn)
                            {
                                return "";
                            }


                        if(lastValue && operation)
                        {

                            result = calculateNumbers(lastValue,operation,fullValue) ;
                            fullValue = result;


                            if(String(fullValue).length > 14)
                            {

                                display.textContent = fullValue.toExponential(4);

                            }else{

                                display.textContent = fullValue;
                            }

                            String(fullValue).includes(".") === false ? isDotPresent = false : isDotPresent = true;
                            
                            lastValue = "";
                            operation = null;
                            isNewNumber = true;
                        
                        }
                    
                        }
                            function buttonHandler(event) {
                            
                                let dataType = event.target.dataset.type;

                                if(dataType === "number")
                                {
                                    numberHandler(event);
                                }else if (dataType === "special") {
                                    specialHandler(event);
                                }else if (dataType === "result") {
                                    resultHandler(event);
                                }else{
                                    operationHandler(event);
                                }
                                        
                            }   

    buttonsDiv.addEventListener("click",buttonHandler);


});


function calculateNumbers(lastValue,operation,fullValue) {
    
    let result; 

    switch (operation) {
        case "add":

                result = (+lastValue) + (+fullValue);

            break;
        case "multiply":

            result = (+lastValue) * (+fullValue);
            break;
        case "subtract":

            result = (+lastValue) - (+fullValue);

            break;

        case "divide": 

            result = (+lastValue) / (+fullValue);

            break;

        default:
            break;
    }
 

    return result;

}
