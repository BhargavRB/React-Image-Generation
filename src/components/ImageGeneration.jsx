import { useActionState } from 'react';
import Form from './Form';
import InputContainer from './InputContainer';
import Label from './Label';
import Input from './Input';
import { useAuthContext } from '../store/auth-context';
const apiUrl = import.meta.env.VITE_BACKEND_HOST;

async function generateImageRequest(prompt, options, authToken) {
  const response = await fetch(apiUrl + '/generate-image', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({ prompt, options }),
  }); 

  if (!response.ok) {
    const resData = await response.json();
    throw new Error(resData.message || 'Image generation failed. Please try again.');
  }
  
  return URL.createObjectURL(await response.blob());
}

function ImageGeneration() {
  const { token } = useAuthContext();

  async function handleSubmit(_, formData) {
    const prompt = formData.get('prompt');
    const options = {
      quality: formData.get('quality'),
      aspect_ratio: formData.get('aspectRatio'),
      format: formData.get('format'),
    };

    try {
      const imageUrl = await generateImageRequest(prompt, options,token);
      return { result: 'success', imageUrl ,prompt};
    }
    catch (error) {
      return { result: 'error', message: error.message || 'An error occurred while generating the image.' };
    }
  }

  const [formState, action, isPending] = useActionState(handleSubmit,{result:null});

 return (
    <div className="flex gap-4 max-w-[70rem] mx-auto items-start">
      <Form
        action={action}
        className="flex flex-col w-[25rem] justify-between gap-8"
      >
        <div className="flex flex-col gap-4">
          <InputContainer>
            <Label htmlFor="prompt">Image Prompt</Label>
            <Input type="text" id="prompt" name="prompt" isTextarea />
          </InputContainer>
          <div className="flex gap-5">
            <InputContainer>
              <Label htmlFor="quality">Quality</Label>
              <Input
                type="number"
                id="quality"
                name="quality"
                min="1"
                max="100"
                step="1.0"
                defaultValue="80"
                className="w-[4rem]"
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="aspectRatio">Aspect Ratio</Label>
              <select
                id="aspectRatio"
                name="aspectRatio"
                defaultValue="1:1"
                className="p-[0.6rem] rounded-sm w-[6rem]"
              >
                <option value="1:1">1:1</option>
                <option value="16:9">16:9</option>
                <option value="4:3">4:3</option>
              </select>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="format">Format</Label>
              <select
                id="format"
                name="format"
                defaultValue="png"
                className="p-[0.6rem] rounded-sm w-[5rem]"
              >
                <option value="webp">WebP</option>
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
              </select>
            </InputContainer>
          </div>
        </div>
        <p className="flex justify-end">
          <button
            disabled={isPending}
            className="bg-sky-400 text-black py-3 rounded-lg hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-stone-400 disabled:text-stone-600 px-10 text-lg"
          >
            {isPending ? 'Generating...' : 'Generate!'}
          </button>
        </p>
      </Form>
      <div className="h-[25rem] flex-1 flex justify-center items-center">
        {!formState.result && (
          <p className="text-stone-400 p-8 font-mono">
            Press "Generate" to generate an image based on your prompt.
          </p>
        )}
        {formState.result === 'success' && (
          <img
            src={formState.imageUrl}
            alt={formState.prompt}
            className="h-[25rem] shadow-2xl rounded-md"
          />
        )}
        {formState.result === 'error' && (
          <p className="text-red-200">{formState.message}</p>
        )}
      </div>
    </div>
  );
}

export default ImageGeneration;