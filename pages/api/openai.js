import { Configuration, OpenAIApi } from "openai";
import { useState } from 'react';
const configuration = new Configuration({
    organization: "org-kmQ1RQDNs3Vi3h4I0Qc4PhRH",
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

export default function handler(req, res) {
    const text = req.body.qn;


    fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
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