import React, { useState } from "react";
import ChatBotHome from "./ChatBotHome";

function ChatBot() {

  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isthingking , setisThinking] = useState(false)



  const addMessage = (Message, sender) => {
    setMessages(prevMessages => [...prevMessages, { text: Message, sender }]);
  };


  const handleAiresponse = async(x) => {



  
    // Concatenate descriptionText and resumeText
    const combinedText = `you are the AI chefs name chef cosmo who can generate high-quality recipes. you a able to take various ingredients from the user and create a recipe based on them. Additionally, if the user provides the name of a recipe, you should be able to generate a complete recipe along with information about the total calories. Please note that you should only respond to recipe-related questions and not any non-recipe-related inquiries . last thing give response in propr paragraph form you can use br tag in html in between responce text i will handle here . user question :  ${x}`;
  
    // Send POST request
    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCYBGkT26p6d3jKJICSnyxeRPMqQMC6tHE',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: combinedText }] }]
          })
        }
      );
    
      const data = await response.json();
      // Extract main text from data
      const mainText = data.candidates[0].content.parts[0].text;
      
      setisThinking(false);

      // Set the response text
      return mainText;
              
    } catch (error) {
      setisThinking(false);
      const er = "their is error fatching data"
      return er ;
      console.error('Error:', error);
    }
  };

  
  async function handleClick() {
    const element = document.getElementById("homeInfo");
    document.getElementById("textArea").innerText = "";
  
    element.style.display = "none";
  
    const userEnteredText = userMessage; // Store the user-entered text before clearing the state
    addMessage(userEnteredText, "You");


    setisThinking(true);
  
    // Call the GPT response function
    const gptResponse = await handleAiresponse(userEnteredText);
    
    // Add the GPT response to the messages state


    addMessage(gptResponse, "Chef Cosmo");
  }
  
  



  function handleChange(e) {
    // Replace line breaks (\n) with <br> tags before updating userMessage state
    const newText = e.target.innerText.replace(/\n/g, "<br>");
    setUserMessage(newText);
  }




  return (
      <div>
      <div id="homeInfo" className="flex justify-center items-center h-screen">
        <div className="flex justify-center  items-center w-3/6">
          <ChatBotHome />
        </div>
      </div>
 

   <div>
      
      <div className="chat-window">
                {messages.length > 0 &&
                    messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}`}>
                          <p className="text-black mb-2">{message.sender}</p>
                            <p
                                className="bg-green-500 text-white p-2 self-end border rounded-3xl border-black border-solid mb-7 whitespace-pre-wrap"
                                dangerouslySetInnerHTML={{
                                    __html: message.text,
                                }}
                            />
                        </div>
                    ))}
      </div>

      <div className={'thinking ' + (isthingking ? 'block' : 'hidden')}>
<span></span>
<span></span>
<span></span>
</div>

      <div className="flex w-full justify-center items-center">
        <div className="flex w-1/2 justify-centers">
          <div id="para" className="para flex justify-start flex-col items-start"></div>
        </div>
      </div>
      </div>


      <div className="fixed bottom-0 left-0 right-0 bg-black">
        <div className="flex justify-center p-3 gap">
          <span
           id="textArea"
            className="textare text-white whitespace-pre-wrap border-l border-t border-b rounded-tl-3xl rounded-bl-3xl p-3 w-1/2 border-white border-solid"
            contentEditable={true}
            aria-placeholder="Message chef"
            onInput={handleChange}
          />
          <input
            className=" text-white border-r border-t border-b rounded-tr-3xl rounded-br-3xl border-white border-solid"
            type="submit"
            onClick={handleClick}
            value="Submit"
          />
        </div>
        <div className="text-center text-white">
          <p className="text-xs">AI can make mistakes. Consider checking important information</p>
        </div>
      </div>
    </div>
  )
}

export default ChatBot