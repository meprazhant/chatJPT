import { Configuration, OpenAIApi } from "openai";
import { useState } from 'react';
var api = process.env.NEXT_PUBLIC_API;
const configuration = new Configuration({
    organization: "org-kmQ1RQDNs3Vi3h4I0Qc4PhRH",
    apiKey: api,
});
const openai = new OpenAIApi(configuration);

export default function handler(req, res) {
    const text = req.body.qn;


    fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${api}`
        },
        // body: '{"model": "text-davinci-003", "prompt": "Say this is a test", "temperature": 0, "max_tokens": 7}',
        body: JSON.stringify({
            'model': 'text-davinci-003',
            'prompt': text,
            'temperature': 0,
            'max_tokens': 3000,
            'top_p': 1,
            'frequency_penalty': 0,
        })
    }).then(response => response.json())
        .then(data => {
            res.status(200).json(data)

        })
}