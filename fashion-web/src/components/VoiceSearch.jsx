// src/components/VoiceSearch.jsx
import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, AlertCircle } from 'lucide-react';
import { OCCASIONS, SEASONS, STYLES } from '../data/catalogue';
import './VoiceSearch.css';

export default function VoiceSearch({ onApplyVoiceFilter, onTriggerSearch }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-IN'; // Indian English / English

    recognition.onstart = () => {
      setIsListening(true);
      setStatusMessage('Listening... Speak occasion, season, or style (e.g. "Traditional winter wedding outfit")');
    };

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const text = event.results[current][0].transcript;
      setTranscript(text);

      if (event.results[current].isFinal) {
        parseAndApply(text);
      }
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        setStatusMessage('Microphone access denied. Please allow microphone permissions in browser.');
      } else if (event.error === 'no-speech') {
        setStatusMessage('No voice detected. Click mic to try again.');
      } else {
        setStatusMessage(`Voice error (${event.error}). Please try again.`);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, []);

  const parseAndApply = (spokenText) => {
    const lower = spokenText.toLowerCase();

    // Occasion Detection
    let matchedOccasion = null;
    if (lower.includes('wedding') || lower.includes('traditional') || lower.includes('ethnic') || lower.includes('diwali') || lower.includes('puja')) {
      matchedOccasion = 'Traditional';
    } else if (lower.includes('party') || lower.includes('club') || lower.includes('night out') || lower.includes('cocktail')) {
      matchedOccasion = 'Party';
    } else if (lower.includes('formal') || lower.includes('office') || lower.includes('interview') || lower.includes('business')) {
      matchedOccasion = 'Formal';
    } else if (lower.includes('sport') || lower.includes('gym') || lower.includes('workout') || lower.includes('running')) {
      matchedOccasion = 'Sports';
    } else if (lower.includes('beach') || lower.includes('vacation') || lower.includes('pool') || lower.includes('resort')) {
      matchedOccasion = 'Beach';
    } else if (lower.includes('casual') || lower.includes('daily') || lower.includes('college') || lower.includes('chill')) {
      matchedOccasion = 'Casual';
    }

    // Season Detection
    let matchedSeason = null;
    if (lower.includes('winter') || lower.includes('cold') || lower.includes('snow') || lower.includes('jacket') || lower.includes('sweater')) {
      matchedSeason = 'Winter';
    } else if (lower.includes('summer') || lower.includes('hot') || lower.includes('sunny')) {
      matchedSeason = 'Summer';
    } else if (lower.includes('monsoon') || lower.includes('rain') || lower.includes('rainy')) {
      matchedSeason = 'Monsoon';
    } else if (lower.includes('spring') || lower.includes('autumn') || lower.includes('fall')) {
      matchedSeason = 'Spring/Autumn';
    }

    // Style Detection
    let matchedStyle = null;
    if (lower.includes('ethnic') || lower.includes('kurta') || lower.includes('sherwani') || lower.includes('desi')) {
      matchedStyle = 'Ethnic';
    } else if (lower.includes('streetwear') || lower.includes('oversized') || lower.includes('hoodie') || lower.includes('baggy')) {
      matchedStyle = 'Streetwear';
    } else if (lower.includes('smart casual') || lower.includes('polo') || lower.includes('chino')) {
      matchedStyle = 'Smart Casual';
    } else if (lower.includes('business') || lower.includes('suit') || lower.includes('blazer')) {
      matchedStyle = 'Business Formal';
    } else if (lower.includes('boho') || lower.includes('bohemian') || lower.includes('floral')) {
      matchedStyle = 'Bohemian';
    } else if (lower.includes('sporty') || lower.includes('athletic')) {
      matchedStyle = 'Sporty';
    }

    // Feedback summary
    const parsedSummary = [];
    if (matchedOccasion) parsedSummary.push(`Occasion: ${matchedOccasion}`);
    if (matchedSeason) parsedSummary.push(`Season: ${matchedSeason}`);
    if (matchedStyle) parsedSummary.push(`Style: ${matchedStyle}`);

    if (parsedSummary.length > 0) {
      setStatusMessage(`✨ Voice Filter Applied: ${parsedSummary.join(' • ')}`);
      if (onApplyVoiceFilter) {
        onApplyVoiceFilter({
          occasion: matchedOccasion || undefined,
          season: matchedSeason || undefined,
          style: matchedStyle || undefined
        });
      }

      // Voice response
      if ('speechSynthesis' in window) {
        try {
          const utter = new SpeechSynthesisUtterance(`Showing ${parsedSummary.join(', ')} looks.`);
          utter.rate = 1.05;
          utter.pitch = 1.0;
          window.speechSynthesis.speak(utter);
        } catch {}
      }

      if (onTriggerSearch) {
        setTimeout(onTriggerSearch, 100);
      }
    } else {
      setStatusMessage(`Heard: "${spokenText}". Say words like "Winter Sherwani", "Casual Summer", or "Party Formal".`);
    }
  };

  const toggleListening = () => {
    if (!speechSupported) {
      alert('Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.');
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch {}
      setIsListening(false);
    } else {
      setTranscript('');
      setStatusMessage('');
      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.warn('Speech start error:', err);
      }
    }
  };

  return (
    <div className="voice-search-wrapper">
      <div className="voice-search-main">
        <button
          type="button"
          className={`voice-mic-btn ${isListening ? 'listening' : ''}`}
          onClick={toggleListening}
          title={isListening ? 'Click to stop listening' : 'Speak your outfit preference (e.g. "Winter Ethnic Kurta")'}
        >
          {isListening ? (
            <>
              <span className="voice-pulse-ring" />
              <MicOff size={16} />
              <span className="voice-btn-text">Listening...</span>
            </>
          ) : (
            <>
              <Mic size={16} />
              <span className="voice-btn-text">Voice Stylist</span>
            </>
          )}
        </button>

        {statusMessage && (
          <div className={`voice-feedback-pill ${isListening ? 'active' : ''}`}>
            {isListening ? (
              <span className="voice-wave-bars">
                <span /><span /><span /><span />
              </span>
            ) : (
              <Sparkles size={13} className="voice-sparkle-icon" />
            )}
            <span className="voice-feedback-text">
              {transcript ? `"${transcript}" — ` : ''}{statusMessage}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
