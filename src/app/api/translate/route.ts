import { NextRequest, NextResponse } from 'next/server';
import axios from "axios";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { input } = body;
    const parseString = require('xml2js').parseString;

    try {
        const response = await axios.get('https://krdict.korean.go.kr/api/search', {
            params: {
                key: process.env.KRDICT_API_KEY,
                q: input,
                translated: 'y',
                trans_lang: 1
            },
            responseType: 'text'
        });

        const parsedResult = await new Promise<any>((resolve, reject) => {
            parseString(response.data, (err:any, result:any) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        const translations: string[] = [];

        if (
            parsedResult?.channel?.item &&
            parsedResult.channel.item[0]?.sense
        ) {
            for (const sense of parsedResult.channel.item[0].sense) {
                const word = sense.translation?.[0]?.trans_word?.[0];
                if (word) {
                    translations.push(word);
                }
            }
        }

        const translations_combined = translations.join("\n\n");
        return NextResponse.json({ translations: translations_combined });

    } catch (error) {
        console.error("Translation error:", error);
        return NextResponse.json({ error: "Failed to fetch translation." }, { status: 500 });
    }
}