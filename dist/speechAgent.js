"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAIAgentResponse = createAIAgentResponse;
const openai_1 = __importDefault(require("openai"));
let cachedOpenAI = null;
function getOpenAIClient() {
    if (cachedOpenAI)
        return cachedOpenAI;
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error('Missing OPENAI_API_KEY environment variable');
    }
    cachedOpenAI = new openai_1.default({ apiKey });
    return cachedOpenAI;
}
// Mocked data store/tooling. Replace with real integrations.
async function lookupOrderStatus(orderId) {
    // Simulate DB or API call
    await new Promise((r) => setTimeout(r, 200));
    if (orderId === '12345')
        return 'Your order 12345 is shipped and expected to arrive on Friday.';
    return `I could not find order ${orderId}.`;
}
async function createSupportTicket(summary) {
    await new Promise((r) => setTimeout(r, 200));
    return `I have created a support ticket for you: CS-${Math.floor(Math.random() * 900000 + 100000)}`;
}
async function createAIAgentResponse(input) {
    const systemPrompt = `You are a concise, friendly voice customer support agent.
- Keep replies under 3 short sentences.
- If the user asks about an order, ask for the order number if missing. If provided, use the order status tool.
- If the user reports an issue that needs escalation, create a support ticket using the tool and share the ticket number.
- Confirm actions and ask a brief follow-up question to continue the conversation.
Speak clearly with simple words suitable for text-to-speech.`;
    // Lightweight function-calling pattern using responses API
    const tools = [
        {
            type: 'function',
            function: {
                name: 'lookupOrderStatus',
                description: 'Look up the status of an order by orderId',
                parameters: {
                    type: 'object',
                    properties: {
                        orderId: { type: 'string', description: 'Customer order id' }
                    },
                    required: ['orderId']
                }
            }
        },
        {
            type: 'function',
            function: {
                name: 'createSupportTicket',
                description: 'Create a support ticket when escalation is needed',
                parameters: {
                    type: 'object',
                    properties: {
                        summary: { type: 'string', description: 'Short description of the issue' }
                    },
                    required: ['summary']
                }
            }
        }
    ];
    let messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: input.transcript }
    ];
    for (let i = 0; i < 3; i++) {
        const openai = getOpenAIClient();
        const completion = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
            messages,
            temperature: 0.3,
            tools
        });
        const message = completion.choices[0]?.message;
        if (!message)
            break;
        if (message.tool_calls && message.tool_calls.length > 0) {
            for (const call of message.tool_calls) {
                if (call.type !== 'function')
                    continue;
                const name = call.function.name;
                const args = JSON.parse(call.function.arguments || '{}');
                let toolResult = '';
                if (name === 'lookupOrderStatus') {
                    toolResult = await lookupOrderStatus(args.orderId);
                }
                else if (name === 'createSupportTicket') {
                    toolResult = await createSupportTicket(args.summary);
                }
                messages.push(message);
                messages.push({ role: 'tool', tool_call_id: call.id, content: toolResult });
            }
            continue;
        }
        // final assistant message
        const content = typeof message.content === 'string' ? message.content : JSON.stringify(message.content);
        return content;
    }
    // Fallback short response
    return "I'm here to help. Could you share more details about your issue?";
}
