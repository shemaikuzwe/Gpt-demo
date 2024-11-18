import { AIState, UIState } from "@/lib/type"
import {createAI} from "ai/rsc"
import {sendMessage}from "@/lib/action"
const AIProvider=createAI<AIState,UIState>({
    actions:{
       sendMessage
    },
    initialAIState:{
        chatId:crypto.randomUUID(),
        messages:[]
    },
    initialUIState:[],  
})

export default AIProvider;