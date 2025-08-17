import 'dotenv/config';
import express, { Request, Response } from 'express';
import { twiml as TwiML } from 'twilio';
import { createAIAgentResponse } from './speechAgent';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/health', (_req: Request, res: Response) => {
	res.status(200).json({ ok: true });
});

// Twilio will hit this endpoint on incoming voice call
app.post('/voice/incoming', async (req: Request, res: Response) => {
	const response = new TwiML.VoiceResponse();
	response.say({ voice: 'Polly.Joanna' }, 'Hello! You are connected to customer support. Please tell me how I can help.');
	response.gather({
		input: ['speech'],
		action: '/voice/handle-speech',
		method: 'POST',
		timeout: 5,
		enhanced: true,
		speechTimeout: 'auto'
	});
	res.type('text/xml');
	res.send(response.toString());
});

// Handle speech result and respond via TTS
app.post('/voice/handle-speech', async (req: Request, res: Response) => {
	const userSpeech: string | undefined = req.body.SpeechResult || req.body.speechResult;
	const callSid: string | undefined = req.body.CallSid;

	const response = new TwiML.VoiceResponse();

	if (!userSpeech) {
		response.say({ voice: 'Polly.Joanna' }, "I didn't catch that. Could you please repeat?");
		response.redirect({ method: 'POST' }, '/voice/incoming');
		res.type('text/xml');
		return res.send(response.toString());
	}

	try {
		const aiReply = await createAIAgentResponse({
			transcript: userSpeech,
			callSid: callSid ?? 'unknown'
		});

		response.say({ voice: 'Polly.Joanna' }, aiReply);
		response.gather({
			input: ['speech'],
			action: '/voice/handle-speech',
			method: 'POST',
			enhanced: true,
			speechTimeout: 'auto',
			timeout: 5
		});
		res.type('text/xml');
		return res.send(response.toString());
	} catch (error) {
		console.error('AI error', error);
		response.say({ voice: 'Polly.Joanna' }, 'Sorry, something went wrong on my end. I will transfer you to a human agent.');
		// In real system, initiate warm transfer or create ticket
		res.type('text/xml');
		return res.send(response.toString());
	}
});

app.listen(PORT, () => {
	console.log(`Voice agent server listening on port ${PORT}`);
});