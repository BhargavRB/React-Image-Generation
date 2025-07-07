import Replicate from 'replicate';

const replicateClient = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export async function generateImage(prompt,options) {
    const input = {
    prompt,
    aspect_ratio: options.aspect_ratio || "1:1",
    output_format: options.format || "webp",
    output_quality: +options.quality || 80, 
    };

    const output = await replicateClient.run("black-forest-labs/flux-dev", { input });

    const outputStream = output[0];

    const imageBlob = await outputStream.blob();
    const image = Buffer.from(await imageBlob.arrayBuffer());
    
    return { image , format: imageBlob.type };
}