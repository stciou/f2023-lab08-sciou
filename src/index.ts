import { ImageAnnotatorClient } from '@google-cloud/vision';

const client = new ImageAnnotatorClient();

async function mainAsync(fileNames: string[]): Promise<void> {
    for (const fileName of fileNames) {
        try {
            console.log(`Running logo detection on ${fileName}`);
            const [result] = await client.logoDetection(fileName);
            let scores: number[] = [];
            const logos = result.logoAnnotations;
            logos?.forEach((logo) => {
                if (logo.description)
                    console.log(`"${logo.description}" found in file ${fileName}`);
                if (logo.score)
                    scores.push(logo.score);
            });
            const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
            console.log(`Average score for ${fileName}: ${avg}`);
        } catch (err) {
            if (err.code === 'ENOENT')
                console.log(`File ${fileName} not found`);
            else
                console.error(`Error processing ${fileName}:`, err);
        }
    }
}

mainAsync([
    './images/cmu.jpg', 
    './images/logo-types-collection.jpg', 
    './images/not-a-file.jpg'
]);
