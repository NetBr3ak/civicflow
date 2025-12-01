import numpy as np
import wave

# === PARAMETERS (science-aligned) ===
duration_seconds = 10        # 10 seconds
sample_rate = 44100          # standard audio rate
amplitude = 12000            # safe headroom for 16-bit PCM

samples = duration_seconds * sample_rate

# 1) Generate white noise
white = np.random.randn(samples)

# 2) Shape spectrum to 1/f (pink) in frequency domain
fft = np.fft.rfft(white)
frequencies = np.fft.rfftfreq(len(white), d=1/sample_rate)

# Avoid division by zero at DC, enforce 1/f roll-off
fft /= np.maximum(frequencies, 1e-6)

pink = np.fft.irfft(fft)

# 3) Normalize to full dynamic range
pink /= np.max(np.abs(pink))

# 4) Convert to 16-bit PCM
audio = (pink * amplitude).astype(np.int16)

# 5) Write to WAV
file_path = "pink_noise_sleep_10s.wav"
with wave.open(file_path, "wb") as f:
    f.setnchannels(1)        # mono
    f.setsampwidth(2)        # 16-bit
    f.setframerate(sample_rate)
    f.writeframes(audio.tobytes())

print("Generated:", file_path)
