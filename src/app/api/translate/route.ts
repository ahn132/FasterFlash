import { NextRequest, NextResponse } from 'next/server';
import axios from "axios";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const {input} = body

    const parseString = require('xml2js').parseString;
    const translations : string[]= []

    axios.get('https://krdict.korean.go.kr/api/search', {
        params: {
            key: process.env.KRDICT_API_KEY,
            q: input,
            translated: 'y',
            trans_lang: 1
        },
        responseType: 'text'
    }).then(r => {
        parseString(r.data, function(err:any, result:any) {
            if (result.channel != undefined && result.channel.item !== undefined && result.channel.item[0] !== null) {
                for (let i = 0; i < result.channel.item[0].sense.length; i++) {
                    translations.push(result.channel.item[0].sense[i].translation[0].trans_word[0]);
                }
            }
        })
    }).catch(err => {
        console.log(err)
    })

    const translations_combined = translations.join("\n\n")

    return NextResponse.json({ translations: translations_combined});
}