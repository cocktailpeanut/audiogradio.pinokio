import json
import torchaudio
from audiocraft.models import AudioGen
from audiocraft.data.audio import audio_write

def init():
    model = AudioGen.get_pretrained('facebook/audiogen-medium')
    model.set_generation_params(duration=5)

def run(payload):
with open("prompt.json", 'r') as file:
    data_dict = json.load(file)
print("5")

# Access the "prompt" array from the dictionary
    descriptions = payload["prompt"]
print("6")
descriptions = [item for item in descriptions if len(item) > 0]
print("7")

#descriptions = ['walking through snow', 'rainy day at a streetside cafe', 'bowling alley', 'a guy making a satisfied sound while eating']
wav = model.generate(descriptions, progress=True)  # generates 3 samples.

print("8")
for idx, one_wav in enumerate(wav):
    # Will save under {idx}.wav, with loudness normalization at -14 db LUFS.
    audio_write(f'{idx}', one_wav.cpu(), model.sample_rate, strategy="loudness", loudness_compressor=True)
print("9")
